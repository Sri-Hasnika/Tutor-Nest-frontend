"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardHeader } from "../dashboard-header"
import { DashboardShell } from "../dashboard-shell"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useEffect, useState } from "react"

export default function ProfilePage() {
  const [curUser, setCurUser] = useState<any>();

  const getCurUser=()=>{
    const user = JSON.parse(localStorage.getItem("user") || "null");
  if (!user) return;
  setCurUser(user);
  }

  useEffect(() => {
    getCurUser();
  }, []);

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
      const response = await fetch(`http://localhost:8000/tutee-api/update/${curUser?._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
      });
  
      if (response.ok) {
        const data = await response.json();
        alert("Profile updated successfully!");
  
        // Update localStorage and state
        localStorage.setItem("user", JSON.stringify(data.payload));
        setCurUser(data);
      } else {
        alert("Failed to update profile.");
      }
    } catch (error) {
      console.error("Update error:", error);
      alert("Something went wrong while updating.");
    }finally{
      getCurUser();
    }
  };
  

  return (
    <DashboardShell>
      <DashboardHeader heading="Profile" text="Manage your personal information and preferences" />

      <div className="grid gap-6 md:grid-cols-2 mt-4">
        {/* User Overview */}
        <Card>
          <CardHeader className="flex items-center space-x-4">
            <Image
              src="/placeholder.svg?height=80&width=80"
              alt="User"
              width={60}
              height={60}
              className="rounded-full"
            />
            <div>
              <CardTitle>{curUser?.firstName} {curUser?.lastName}</CardTitle>
              <CardDescription>{curUser?.course}</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              <strong>Email:</strong> {curUser?.email} <br />
              <strong>Gender:</strong> {curUser?.gender} <br />
              <strong>Mobile:</strong> {curUser?.mobileNumber} <br />
              <strong>Location:</strong> {curUser?.locality}, {curUser?.city}, {curUser?.state} - {curUser?.pincode} <br />
              <strong>Studying:</strong> {curUser?.studying}
            </p>
          </CardContent>
        </Card>

        {/* Editable Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Edit Profile</CardTitle>
            <CardDescription>Update your account details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="name">First Name</Label>
              <Input id="firstName" defaultValue={curUser?.firstName} />
            </div>
            <div>
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" defaultValue={curUser?.lastName} />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue={curUser?.email} />
            </div>
            <div>
              <Label htmlFor="mobile">Mobile Number</Label>
              <Input id="mobile" defaultValue={curUser?.mobileNumber} />
            </div>
            <div>
              <Label htmlFor="gender">Gender</Label>
              <Input id="gender" defaultValue={curUser?.gender} />
            </div>
            <div>
              <Label htmlFor="course">Course</Label>
              <Input id="course" defaultValue={curUser?.course} />
            </div>
            <div>
              <Label htmlFor="studying">Studying</Label>
              <Input id="studying" defaultValue={curUser?.studying} />
            </div>
            <div>
              <Label htmlFor="locality">Locality</Label>
              <Input id="locality" defaultValue={curUser?.locality} />
            </div>
            <div>
              <Label htmlFor="city">City</Label>
              <Input id="city" defaultValue={curUser?.city} />
            </div>
            <div>
              <Label htmlFor="state">State</Label>
              <Input id="state" defaultValue={curUser?.state} />
            </div>
            <div>
              <Label htmlFor="pincode">Pincode</Label>
              <Input id="pincode" defaultValue={curUser?.pincode} />
            </div>
            <Button className="mt-2" onClick={handleUpdate}>Save Changes</Button>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  )
}
