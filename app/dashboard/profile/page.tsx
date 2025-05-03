"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardHeader } from "../dashboard-header"
import { DashboardShell } from "../dashboard-shell"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useEffect, useState } from "react"
import { User, Mail, Phone, MapPin, GraduationCap, Book } from "lucide-react"

export default function ProfilePage() {
  const [curUser, setCurUser] = useState<any>();

  const getCurUser = () => {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    if (!user) return;
    setCurUser(user);
  }

  useEffect(() => {
    getCurUser();
  }, []);

  const getInitials = (firstName?: string, lastName?: string) => {
    if (!firstName && !lastName) return "U";
    return `${firstName?.[0] || ""}${lastName?.[0] || ""}`.toUpperCase();
  };

  const handleUpdate = async () => {
    const updatedUser = {
      firstName: (document.getElementById("firstName") as HTMLInputElement).value,
      lastName: (document.getElementById("lastName") as HTMLInputElement).value,
      mobileNumber: Number((document.getElementById("mobile") as HTMLInputElement).value),
      email: (document.getElementById("email") as HTMLInputElement).value,
      gender: (document.getElementById("gender") as HTMLInputElement).value,
      studying: (document.getElementById("studying") as HTMLInputElement).value,
      course: (document.getElementById("course") as HTMLInputElement).value,
      pincode: Number((document.getElementById("pincode") as HTMLInputElement).value),
      locality: (document.getElementById("locality") as HTMLInputElement).value,
      city: (document.getElementById("city") as HTMLInputElement).value,
      state: (document.getElementById("state") as HTMLInputElement).value,
    };
  
    try {
      const response = await fetch(`https://tutor-nest-backend.onrender.com/tutee-api/update/${curUser?._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
      });
  
      if (response.ok) {
        const data = await response.json();
        alert("Profile updated successfully!");
        localStorage.setItem("user", JSON.stringify(data.payload));
        setCurUser(data);
      } else {
        alert("Failed to update profile.");
      }
    } catch (error) {
      console.error("Update error:", error);
      alert("Something went wrong while updating.");
    } finally {
      getCurUser();
    }
  };

  return (
    <DashboardShell>
      <DashboardHeader heading="Profile" text="Manage your personal information and preferences" />

      <div className="grid gap-8 md:grid-cols-12 mt-6">
        {/* User Overview */}
        <Card className="md:col-span-4 bg-gradient-to-b from-blue-50/50 to-purple-50/50">
          <CardHeader className="relative pb-32">
            <div className="absolute inset-0 h-24 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-t-lg" />
            <div className="absolute left-1/2 top-14 -translate-x-1/2">
              <div className="w-28 h-28 rounded-full border-4 border-white bg-gradient-to-br from-blue-500 to-purple-500 shadow-lg flex items-center justify-center text-2xl font-bold text-white">
                {getInitials(curUser?.firstName, curUser?.lastName)}
              </div>
            </div>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <div>
              <CardTitle className="text-2xl mt-10">{curUser?.firstName} {curUser?.lastName}</CardTitle>
              <CardDescription className="text-lg mt-1">{curUser?.course}</CardDescription>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2 justify-center">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{curUser?.email}</span>
              </div>
              <div className="flex items-center gap-2 justify-center">
                <User className="h-4 w-4 text-muted-foreground" />
                <span>{curUser?.gender}</span>
              </div>
              <div className="flex items-center gap-2 justify-center">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{curUser?.mobileNumber}</span>
              </div>
              <div className="flex items-center gap-2 justify-center">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>{curUser?.locality}, {curUser?.city}, {curUser?.state} - {curUser?.pincode}</span>
              </div>
              <div className="flex items-center gap-2 justify-center">
                <GraduationCap className="h-4 w-4 text-muted-foreground" />
                <span>{curUser?.studying}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Editable Settings */}
        <Card className="md:col-span-8">
          <CardHeader>
            <CardTitle>Edit Profile</CardTitle>
            <CardDescription>Update your account information and preferences</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  First Name
                </Label>
                <Input id="firstName" defaultValue={curUser?.firstName} className="bg-white" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Last Name
                </Label>
                <Input id="lastName" defaultValue={curUser?.lastName} className="bg-white" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email
                </Label>
                <Input id="email" type="email" defaultValue={curUser?.email} className="bg-white" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="mobile" className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Mobile Number
                </Label>
                <Input id="mobile" defaultValue={curUser?.mobileNumber} className="bg-white" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gender" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Gender
                </Label>
                <Input id="gender" defaultValue={curUser?.gender} className="bg-white" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="course" className="flex items-center gap-2">
                  <Book className="h-4 w-4" />
                  Course
                </Label>
                <Input id="course" defaultValue={curUser?.course} className="bg-white" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="studying" className="flex items-center gap-2">
                  <GraduationCap className="h-4 w-4" />
                  Studying
                </Label>
                <Input id="studying" defaultValue={curUser?.studying} className="bg-white" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pincode" className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Pincode
                </Label>
                <Input id="pincode" defaultValue={curUser?.pincode} className="bg-white" />
              </div>
              <div className="md:col-span-2 space-y-2">
                <Label htmlFor="locality" className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Locality
                </Label>
                <Input id="locality" defaultValue={curUser?.locality} className="bg-white" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="city" className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  City
                </Label>
                <Input id="city" defaultValue={curUser?.city} className="bg-white" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state" className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  State
                </Label>
                <Input id="state" defaultValue={curUser?.state} className="bg-white" />
              </div>
            </div>
            <Button className="mt-8 w-full md:w-auto" onClick={handleUpdate}>
              Save Changes
            </Button>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  )
}