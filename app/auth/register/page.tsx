"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GraduationCap, User, Mail, Key, Phone, MapPin, Book, School } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

const GENDER_OPTIONS = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "others", label: "Others" },
];

export default function RegisterPage() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    mobileNumber: "",
    gender: "",
    studying: "",
    course: "",
    pincode: "",
    locality: "",
    city: "",
    state: "",
    role: "",
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setStep((prev) => prev - 1);
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();

    if (typeof window !== "undefined") {
      localStorage.setItem("role", formData.role);
    }

    const fd = Object.fromEntries(
      Object.entries(formData).filter(([key]) => key !== 'role' && key !== 'confirmPassword')
    );

    const response = await fetch(`https://tutor-nest-backend.onrender.com/${formData.role}-api/signIn`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fd),
    });

    const router = useRouter();
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Sign-in failed:", errorData);
      alert("Registration failed: " + (errorData?.message || "Unknown error"));
    } else {
      const data = await response.json();
      console.log("Sign-in successful:", data);
      if (formData.role === "tutor") {
        router.push("/tutor/dashboard");
      } else {
        router.push("/dashboard");
      }
    }
  };

  // Progress calculation
  const progressPercentage = (step / 3) * 100;

  const renderStepIndicator = () => {
    return (
      <div className="mb-6">
        <div className="relative h-2 w-full bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="absolute top-0 left-0 h-full bg-primary transition-all duration-300 ease-in-out" 
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        <div className="flex justify-between mt-2">
          <div className={`text-xs font-medium ${step >= 0 ? 'text-primary' : 'text-gray-400'}`}>Role</div>
          <div className={`text-xs font-medium ${step >= 1 ? 'text-primary' : 'text-gray-400'}`}>Personal</div>
          <div className={`text-xs font-medium ${step >= 2 ? 'text-primary' : 'text-gray-400'}`}>Details</div>
          <div className={`text-xs font-medium ${step >= 3 ? 'text-primary' : 'text-gray-400'}`}>Location</div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-purple-50 md:flex-row">
      {/* Link to home page */}
      <Link 
        href="/" 
        className="absolute left-4 top-4 flex items-center gap-2 md:left-8 md:top-8 transition-transform hover:scale-105 z-10"
      >
        <div className="bg-primary rounded-full p-2 text-white">
          <GraduationCap className="h-6 w-6" />
        </div>
        <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">Tutor Nest</span>
      </Link>

      {/* Left side - Image section */}
      <div className="relative w-full md:w-1/2 min-h-[30vh] md:min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-sm z-0"></div>
        <div className="w-full h-full relative">
          <Image
            src="https://images.pexels.com/photos/4778611/pexels-photo-4778611.jpeg"
            alt="Students studying together"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/30 to-purple-900/30 flex flex-col items-center justify-center text-white p-8">
            <div className="max-w-md text-center space-y-4 backdrop-blur-sm bg-black/20 p-8 rounded-2xl">
              <h1 className="text-3xl md:text-4xl font-bold">Join Tutor Nest Today</h1>
              <p className="text-lg md:text-xl">Start your journey as a student or tutor and unlock endless learning possibilities.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Registration form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-4 md:p-8">
        <Card className="w-full max-w-md shadow-lg border-0 overflow-hidden">
          <div className="h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
          <CardHeader className="space-y-1 pb-2">
            <CardTitle className="text-2xl font-bold text-center">
              {step === 0 ? "Welcome to Tutor Nest!" : "Create Your Account"}
            </CardTitle>
            <CardDescription className="text-center">
              {step === 0 ? "Begin your learning journey" : `Step ${step + 1} of 4: ${['Choose Role', 'Personal Info', 'Profile Details', 'Location'][step]}`}
            </CardDescription>
            {step > 0 && renderStepIndicator()}
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4 pt-0">
              {step === 0 && (
                <div className="space-y-6 py-4">
                  <div className="space-y-4">
                    <Label className="text-lg font-medium">I want to register as</Label>
                    <div className="grid grid-cols-2 gap-4">
                      <div 
                        className={`border rounded-xl p-4 flex flex-col items-center gap-2 cursor-pointer transition-all hover:bg-blue-50 ${formData.role === 'tutee' ? 'border-primary bg-blue-50 shadow-md' : 'border-gray-200'}`}
                        onClick={() => handleSelectChange("role", "tutee")}
                      >
                        <div className={`rounded-full p-3 ${formData.role === 'tutee' ? 'bg-primary text-white' : 'bg-gray-100'}`}>
                          <User className="h-6 w-6" />
                        </div>
                        <span className="font-medium">Student</span>
                        <span className="text-xs text-gray-500">I want to learn</span>
                      </div>
                      <div 
                        className={`border rounded-xl p-4 flex flex-col items-center gap-2 cursor-pointer transition-all hover:bg-blue-50 ${formData.role === 'tutor' ? 'border-primary bg-blue-50 shadow-md' : 'border-gray-200'}`}
                        onClick={() => handleSelectChange("role", "tutor")}
                      >
                        <div className={`rounded-full p-3 ${formData.role === 'tutor' ? 'bg-primary text-white' : 'bg-gray-100'}`}>
                          <School className="h-6 w-6" />
                        </div>
                        <span className="font-medium">Tutor</span>
                        <span className="text-xs text-gray-500">I want to teach</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {step === 1 && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="flex items-center gap-2">
                        <User className="h-4 w-4 text-primary" />
                        First name
                      </Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="John"
                        required
                        className="rounded-lg"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="flex items-center gap-2">
                        <User className="h-4 w-4 text-primary" />
                        Last name
                      </Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder="Doe"
                        required
                        className="rounded-lg"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-primary" />
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your.email@example.com"
                      required
                      className="rounded-lg"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password" className="flex items-center gap-2">
                      <Key className="h-4 w-4 text-primary" />
                      Password
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                      className="rounded-lg"
                    />
                    <p className="text-xs text-muted-foreground pl-6">
                      Password must be at least 6 characters long.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="flex items-center gap-2">
                      <Key className="h-4 w-4 text-primary" />
                      Confirm password
                    </Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      required
                      className="rounded-lg"
                    />
                  </div>
                </>
              )}

              {step === 2 && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="mobileNumber" className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-primary" />
                      Mobile Number
                    </Label>
                    <Input
                      id="mobileNumber"
                      type="tel"
                      value={formData.mobileNumber}
                      onChange={handleInputChange}
                      placeholder="1234567890"
                      required
                      className="rounded-lg"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <User className="h-4 w-4 text-primary" />
                      Gender
                    </Label>
                    <Select
                      value={formData.gender}
                      onValueChange={(value) => handleSelectChange("gender", value)}
                    >
                      <SelectTrigger className="rounded-lg">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        {GENDER_OPTIONS.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  {formData.role === "tutee" && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="studying" className="flex items-center gap-2">
                          <Book className="h-4 w-4 text-primary" />
                          Currently Studying
                        </Label>
                        <Input
                          id="studying"
                          value={formData.studying}
                          onChange={handleInputChange}
                          placeholder="e.g., High School"
                          required
                          className="rounded-lg"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="course" className="flex items-center gap-2">
                          <School className="h-4 w-4 text-primary" />
                          Course
                        </Label>
                        <Input
                          id="course"
                          value={formData.course}
                          onChange={handleInputChange}
                          placeholder="e.g., Science"
                          required
                          className="rounded-lg"
                        />
                      </div>
                    </>
                  )}
                  {formData.role === "tutor" && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="studying" className="flex items-center gap-2">
                          <GraduationCap className="h-4 w-4 text-primary" />
                          Qualification
                        </Label>
                        <Input
                          id="studying"
                          value={formData.studying}
                          onChange={handleInputChange}
                          placeholder="e.g., Masters in Mathematics"
                          required
                          className="rounded-lg"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="course" className="flex items-center gap-2">
                          <Book className="h-4 w-4 text-primary" />
                          Subjects
                        </Label>
                        <Input
                          id="course"
                          value={formData.course}
                          onChange={handleInputChange}
                          placeholder="e.g., Mathematics, Physics"
                          required
                          className="rounded-lg"
                        />
                      </div>
                    </>
                  )}
                </>
              )}

              {step === 3 && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="pincode" className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-primary" />
                      Pincode
                    </Label>
                    <Input
                      id="pincode"
                      type="number"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      placeholder="123456"
                      required
                      className="rounded-lg"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="locality" className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-primary" />
                      Locality
                    </Label>
                    <Input
                      id="locality"
                      value={formData.locality}
                      onChange={handleInputChange}
                      placeholder="Your locality"
                      required
                      className="rounded-lg"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city" className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-primary" />
                        City
                      </Label>
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="Your city"
                        required
                        className="rounded-lg"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state" className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-primary" />
                        State
                      </Label>
                      <Input
                        id="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        placeholder="Your state"
                        required
                        className="rounded-lg"
                      />
                    </div>
                  </div>
                </>
              )}
            </CardContent>
            <CardFooter className="flex flex-col space-y-4 pb-6 border-t pt-6">
              <div className="flex w-full gap-4">
                {step > 0 && (
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={handleBack} 
                    className="flex-1 rounded-lg border-gray-300"
                  >
                    Back
                  </Button>
                )}
                {step < 3 ? (
                  <Button
                    type="button"
                    onClick={handleNext}
                    className={`flex-1 rounded-lg bg-primary hover:bg-primary/90 transition-all ${step === 0 && !formData.role ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={(step === 0 || step === 1) && !formData.role}
                  >
                    Continue
                  </Button>
                ) : (
                  <Button type="submit" className="flex-1 rounded-lg bg-primary hover:bg-primary/90 transition-all">
                    Create Account
                  </Button>
                )}
              </div>
              <div className="text-center text-sm pt-2">
                Already have an account?{" "}
                <Link
                  href="/auth/login"
                  className="text-primary font-medium hover:underline transition-all"
                >
                  Log in
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
      
      {/* Decorative elements */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden -z-10 md:hidden">
        <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-blue-200 opacity-20 blur-3xl"></div>
        <div className="absolute bottom-20 -left-20 w-80 h-80 rounded-full bg-purple-200 opacity-20 blur-3xl"></div>
      </div>
    </div>
  );
}