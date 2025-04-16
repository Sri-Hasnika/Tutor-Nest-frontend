// components/tutor/booking-card.tsx

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar, Clock, FileText, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";

type BookingCardProps = {
  session: {
    id: number;
    tuteeName: string;
    subject: string;
    date: string; // Ensure this is a string or Date object
    time: string;
    status: string;
  };
  type: "upcoming" | "past" | "pending";
  onAddReport?: () => void; // Optional function for adding report
};

export function BookingCard({ session, type, onAddReport }: BookingCardProps) {
  const handleAccept = () => {
    console.log("Accepted booking", session.id);
  };

  const handleReject = () => {
    console.log("Rejected booking", session.id);
  };

  return (
    <Card className="p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-lg">{session.subject}</h3>
            <Badge
              variant={
                session.status === "Confirmed"
                  ? "default"
                  : session.status === "Completed"
                  ? "secondary"
                  : "outline"
              }
            >
              {session.status}
            </Badge>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <User className="h-4 w-4" />
              <span>{session.tuteeName}</span>
            </div>

            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(session.date)}</span>
            </div>

            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{session.time}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 justify-end">
          {type === "pending" && (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={handleReject}
                className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
              >
                Reject
              </Button>
              <Button size="sm" onClick={handleAccept}>
                Accept
              </Button>
            </>
          )}

          {type === "past" && onAddReport && ( // Ensure onAddReport is defined
            <Button variant="outline" size="sm" onClick={onAddReport} className="flex items-center gap-1">
              <FileText className="h-4 w-4" />
              Add Report
            </Button>
          )}

          {type === "upcoming" && (
            <Button
              variant="outline"
              size="sm"
              className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
            >
              Cancel
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}
