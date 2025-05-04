"use client"

import { useState, useEffect } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileIcon, Upload, X, FileText } from "lucide-react"
import { DashboardHeader } from "@/app/dashboard/dashboard-header"
import { LineChart, BookOpen } from "lucide-react"

interface Tutee {
  _id: string;
  firstName: string;
  lastName: string;
}

interface Topic {
  topicName: string;
  completedDate?: string;
}

interface Report {
  fileName: string;
  fileUrl: string;
  uploadDate: string;
}

interface Progress {
  tuteeId: string;
  completedTopics: Topic[];
  pendingTopics: string[];
  feedback: string;
  assessmentReports?: Report[];
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export function ProgressTracker() {
  // State variables
  const [tutees, setTutees] = useState<Tutee[]>([]);
  const [selectedTuteeId, setSelectedTuteeId] = useState('');
  const [progress, setProgress] = useState<Progress | null>(null);
  const [feedback, setFeedback] = useState('');
  const [newTopic, setNewTopic] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [fileToUpload, setFileToUpload] = useState<File | null>(null);

  // Load tutees when component mounts
  useEffect(() => {
    fetchTutees();
  }, []);

  // Load tutee progress when tutee is selected
  useEffect(() => {
    if (selectedTuteeId) {
      fetchTuteeProgress();
    } else {
      setProgress(null);
      setFeedback('');
    }
  }, [selectedTuteeId]);

  // Get auth token from localStorage (assuming it's stored there after login)
  const getAuthHeaders = () => {
    const token = localStorage.getItem('token') || '';
    return {
      Authorization: `Bearer ${token}`
    };
  };

  // Fetch tutees for dropdown
  const fetchTutees = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API_BASE_URL}/progress-api/tutees`, {
        headers: getAuthHeaders()
      });

      console.log(response);
      
      if (!response.ok) {
        throw new Error('Failed to fetch tutees');
      }
      
      const data = await response.json();
      setTutees(data.tutees);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching tutees:', error);
      toast.error('Failed to fetch tutees');
      setIsLoading(false);
    }
  };

  // Fetch progress for selected tutee
  const fetchTuteeProgress = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API_BASE_URL}/progress-api/${selectedTuteeId}`, {
        headers: getAuthHeaders()
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch tutee progress');
      }
      
      const data = await response.json();
      setProgress(data.progress);
      setFeedback(data.progress.feedback || '');
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching tutee progress:', error);
      toast.error('Failed to fetch tutee progress');
      setIsLoading(false);
    }
  };

  // Toggle topic completion status
  const toggleTopic = async (topicName: string, isCompleted: boolean) => {
    try {
      setIsLoading(true);
      
      if (isCompleted) {
        // Remove topic from completed list
        const response = await fetch(
          `${API_BASE_URL}/progress-api/topic/${selectedTuteeId}/${encodeURIComponent(topicName)}`,
          {
            method: 'DELETE',
            headers: getAuthHeaders()
          }
        );
        
        if (!response.ok) {
          throw new Error('Failed to update topic status');
        }
      } else {
        // Add topic to completed list
        const response = await fetch(
          `${API_BASE_URL}/progress-api/topic/add`,
          {
            method: 'POST',
            headers: {
              ...getAuthHeaders(),
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ tuteeId: selectedTuteeId, topicName })
          }
        );
        
        if (!response.ok) {
          throw new Error('Failed to update topic status');
        }
      }
      
      // Refresh progress data
      await fetchTuteeProgress();
      setIsLoading(false);
    } catch (error) {
      console.error('Error updating topic status:', error);
      toast.error('Failed to update topic status');
      setIsLoading(false);
    }
  };

  // Handle adding a new topic
  const handleAddTopic = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTopic.trim()) return;
    
    try {
      setIsLoading(true);
      const response = await fetch(
        `${API_BASE_URL}/progress-api/topic/add`,
        {
          method: 'POST',
          headers: {
            ...getAuthHeaders(),
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ tuteeId: selectedTuteeId, topicName: newTopic })
        }
      );
      
      if (!response.ok) {
        throw new Error('Failed to add new topic');
      }
      
      setNewTopic('');
      await fetchTuteeProgress();
      setIsLoading(false);
    } catch (error) {
      console.error('Error adding new topic:', error);
      toast.error('Failed to add new topic');
      setIsLoading(false);
    }
  };

  // Save feedback
  const saveFeedback = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${API_BASE_URL}/progress-api/feedback/${selectedTuteeId}`,
        {
          method: 'PUT',
          headers: {
            ...getAuthHeaders(),
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ feedback })
        }
      );
      
      if (!response.ok) {
        throw new Error('Failed to save feedback');
      }
      
      toast.success('Feedback saved successfully');
      setIsLoading(false);
    } catch (error) {
      console.error('Error saving feedback:', error);
      toast.error('Failed to save feedback');
      setIsLoading(false);
    }
  };

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileToUpload(e.target.files[0]);
    }
  };

  // Upload report file
  const uploadReport = async () => {
    if (!fileToUpload) {
      toast.warning('Please select a file to upload');
      return;
    }

    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append('reportFile', fileToUpload);
      
      const response = await fetch(
        `${API_BASE_URL}/progress-api/upload/${selectedTuteeId}`,
        {
          method: 'POST',
          headers: getAuthHeaders(),
          body: formData
        }
      );
      
      if (!response.ok) {
        throw new Error('Failed to upload report');
      }
      
      setFileToUpload(null);
      toast.success('Report uploaded successfully');
      await fetchTuteeProgress();
      setIsLoading(false);
    } catch (error) {
      console.error('Error uploading report:', error);
      toast.error('Failed to upload report');
      setIsLoading(false);
    }
  };

  // Generate report
  const generateReport = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${API_BASE_URL}/progress-api/report/${selectedTuteeId}`,
        {
          headers: getAuthHeaders()
        }
      );
      
      if (!response.ok) {
        throw new Error('Failed to generate report');
      }
      
      const data = await response.json();
      
      // Open the generated report in a new tab
      window.open(`${API_BASE_URL}${data.reportUrl}`, '_blank');
      setIsLoading(false);
    } catch (error) {
      console.error('Error generating report:', error);
      toast.error('Failed to generate report');
      setIsLoading(false);
    }
  };

  // Save all progress data
  const saveProgress = async () => {
    if (!progress) return;
    
    try {
      setIsLoading(true);
      
      const completedTopics = progress.completedTopics?.map(topic => topic.topicName);
      
      const response = await fetch(
        `${API_BASE_URL}/progress-api/save`,
        {
          method: 'POST',
          headers: {
            ...getAuthHeaders(),
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            tuteeId: selectedTuteeId,
            completedTopics,
            feedback
          })
        }
      );
      
      if (!response.ok) {
        throw new Error('Failed to save progress');
      }
      
      toast.success('Progress saved successfully');
      setIsLoading(false);
    } catch (error) {
      console.error('Error saving progress:', error);
      toast.error('Failed to save progress');
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <DashboardHeader heading="Tutee Progress Tracker" text="Monitor and analyze your students' learning journey">
        <Button onClick={generateReport} disabled={!selectedTuteeId || isLoading}>
          <LineChart className="mr-2 h-4 w-4" />
          Generate Report
        </Button>
      </DashboardHeader>

      <Card className="p-6">
        <div className="space-y-4">
          <Label htmlFor="tutee">Select Tutee</Label>
          <Select value={selectedTuteeId} onValueChange={setSelectedTuteeId}>
            <SelectTrigger id="tutee" className="w-full">
              <SelectValue placeholder="Select a tutee" />
            </SelectTrigger>
            <SelectContent>
              {tutees?.map((tutee) => (
                <SelectItem key={tutee._id} value={tutee._id}>
                  {tutee.firstName} {tutee.lastName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {progress && (
          <>
            <div className="mt-8">
              <h2 className="text-lg font-semibold mb-4">Completed Topics</h2>
              
              <div className="space-y-2 mb-4">
                {/* Already completed topics */}
                {progress.completedTopics?.map((topic) => (
                  <div key={topic.topicName} className="flex items-center justify-between border-b pb-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={`completed-${topic.topicName}`}
                        checked={true}
                        onCheckedChange={() => toggleTopic(topic.topicName, true)}
                      />
                      <Label
                        htmlFor={`completed-${topic.topicName}`}
                        className="font-normal line-through text-muted-foreground"
                      >
                        {topic.topicName}
                      </Label>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => toggleTopic(topic.topicName, true)}
                      className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                
                {/* Pending topics */}
                {progress.pendingTopics?.map((topic) => (
                  <div key={topic} className="flex items-center justify-between border-b pb-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={`pending-${topic}`}
                        checked={false}
                        onCheckedChange={() => toggleTopic(topic, false)}
                      />
                      <Label htmlFor={`pending-${topic}`} className="font-normal">
                        {topic}
                      </Label>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Add new topic */}
              <form onSubmit={handleAddTopic} className="flex mt-4 gap-2">
                <Input
                  type="text"
                  value={newTopic}
                  onChange={(e) => setNewTopic(e.target.value)}
                  placeholder="Add new topic"
                  className="flex-1"
                />
                <Button
                  type="submit"
                  disabled={!newTopic.trim() || isLoading}
                >
                  Add
                </Button>
              </form>
            </div>

            <div className="mt-8">
              <h2 className="text-lg font-semibold mb-2">Feedback</h2>
              <Textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                onBlur={saveFeedback}
                placeholder="Provide feedback on the tutee's progress, strengths, and areas for improvement..."
                className="w-full h-32"
              ></Textarea>
            </div>

            <div className="mt-8">
              <h2 className="text-lg font-semibold mb-4">Upload Assessment/Report</h2>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <div className="flex justify-center">
                  <Upload className="w-12 h-12 text-gray-400" />
                </div>
                <p className="mt-2 text-sm text-gray-500">Upload assessment or report file</p>
                <Input
                  type="file"
                  onChange={handleFileChange}
                  className="hidden"
                  id="file-upload"
                />
                <div className="mt-4">
                  <Label
                    htmlFor="file-upload"
                    className="inline-block px-4 py-2 bg-white border border-gray-300 rounded cursor-pointer hover:bg-gray-100"
                  >
                    Choose File
                  </Label>
                  {fileToUpload && (
                    <span className="ml-2 text-sm">{fileToUpload.name}</span>
                  )}
                </div>
                {fileToUpload && (
                  <Button
                    onClick={uploadReport}
                    disabled={isLoading}
                    className="mt-2"
                  >
                    Upload File
                  </Button>
                )}
              </div>
              
              {/* Display uploaded reports */}
              {progress.assessmentReports && progress.assessmentReports?.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-md font-medium mb-2">Uploaded Reports</h3>
                  <ul className="space-y-1">
                    {progress.assessmentReports?.map((report, index) => (
                      <li key={index} className="text-blue-500 hover:underline">
                        <a href={`${API_BASE_URL}${report.fileUrl}`} target="_blank" rel="noopener noreferrer">
                          {report.fileName} ({new Date(report.uploadDate).toLocaleDateString()})
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="mt-8 text-right">
              <Button
                onClick={saveProgress}
                disabled={isLoading}
                className="px-8"
              >
                {isLoading ? 'Saving...' : 'Save Progress'}
              </Button>
            </div>
          </>
        )}
      </Card>
    </div>
  );
}