"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GraduationCap } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { GraduationCap } from "lucide-react";
// import Link from "next/link";
// import { useState } from "react";

const GENDER_OPTIONS = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "others", label: "Others" },
];

export default function RegisterPage() {
  const [step, setStep] = useState(0); // Start with role selection
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
    role: "", // Empty by default
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setStep((prev) => prev - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // ✅ Save role to localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("role", formData.role);
    }

    const fd = Object.fromEntries(
      Object.entries(formData).filter(([key]) => key !== 'role' && key !== 'confirmPassword')
    );

    // Here you would call your API to register the user
    const response = await fetch(`https://tutor-nest-backend.onrender.com/${formData.role}-api/signIn`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fd),
    });
    
    if (!response.ok) {
      const errorData = await response.json();  // Parsing error response body
      console.error("Sign-in failed:", errorData);
      alert("Registration failed: " + (errorData?.message || "Unknown error"));
      // window.location.href = "/auth/register";  // Uncomment if you want to redirect on failure
    } else {
      const data = await response.json();  // Assuming response contains user data
      console.log("Sign-in successful:", data);
      // ✅ Redirect based on role
      if (formData.role === "tutor") {
        window.location.href = "/tutor/dashboard";
      } else {
        window.location.href = "/dashboard";
      }
    }
    
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/50 p-4">
      <Link
        href="/"
        className="absolute left-4 top-4 flex items-center gap-2 md:left-8 md:top-8"
      >
        <GraduationCap className="h-6 w-6 text-primary" />
        <span className="text-lg font-bold">EduConnect</span>
      </Link>
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
          <CardDescription>
            {step === 0 ? "Choose your role" : `Step ${step} of 3`}
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {step === 0 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>I want to register as</Label>
                  <RadioGroup
                    value={formData.role}
                    onValueChange={(value) => handleSelectChange("role", value)}
                    className="flex flex-col space-y-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="tutee" id="tutee" />
                      <Label htmlFor="tutee" className="font-normal">
                        Student (Tutee)
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="tutor" id="tutor" />
                      <Label htmlFor="tutor" className="font-normal">
                        Tutor
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            )}

            {step === 1 && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First name</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="John"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last name</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Doe"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="m@example.com"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    Password must be at least 6 characters long.
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="mobileNumber">Mobile Number</Label>
                  <Input
                    id="mobileNumber"
                    type="tel"
                    value={formData.mobileNumber}
                    onChange={handleInputChange}
                    placeholder="1234567890"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Gender</Label>
                  <Select
                    value={formData.gender}
                    onValueChange={(value) => handleSelectChange("gender", value)}
                  >
                    <SelectTrigger>
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
                      <Label htmlFor="studying">Currently Studying</Label>
                      <Input
                        id="studying"
                        value={formData.studying}
                        onChange={handleInputChange}
                        placeholder="e.g., High School"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="course">Course</Label>
                      <Input
                        id="course"
                        value={formData.course}
                        onChange={handleInputChange}
                        placeholder="e.g., Science"
                        required
                      />
                    </div>
                  </>
                )}
                {formData.role === "tutor" && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="studying">Qualification</Label>
                      <Input
                        id="studying"
                        value={formData.studying}
                        onChange={handleInputChange}
                        placeholder="e.g., Masters in Mathematics"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="course">Subjects</Label>
                      <Input
                        id="course"
                        value={formData.course}
                        onChange={handleInputChange}
                        placeholder="e.g., Mathematics, Physics"
                        required
                      />
                    </div>
                  </>
                )}
              </>
            )}

            {step === 3 && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="pincode">Pincode</Label>
                  <Input
                    id="pincode"
                    type="number"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    placeholder="123456"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="locality">Locality</Label>
                  <Input
                    id="locality"
                    value={formData.locality}
                    onChange={handleInputChange}
                    placeholder="Your locality"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="Your city"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    placeholder="Your state"
                    required
                  />
                </div>
              </>
            )}
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="flex w-full gap-4">
              {step > 0 && (
                <Button type="button" variant="outline" onClick={handleBack} className="flex-1">
                  Back
                </Button>
              )}
              {step < 3 ? (
                <Button
                  type="button"
                  onClick={handleNext}
                  className="flex-1"
                  disabled={step === 0 && !formData.role}
                >
                  Next
                </Button>
              ) : (
                <Button type="submit" className="flex-1">
                  Create account
                </Button>
              )}
            </div>
            <div className="text-center text-sm">
              Already have an account?{" "}
              <Link
                href="/auth/login"
                className="text-primary underline-offset-4 hover:underline"
              >
                Log in
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
