"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { GraduationCap, User, Mail, Lock, School } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Image from "next/image"

export default function LoginPage() {
  // State to manage form inputs
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [userRole, setUserRole] = useState("tutee") // Default to tutee

  const router = useRouter();

  // Handle form submission
  const handleSubmit = async (event:any) => {
    event.preventDefault()

    const formData = {
      email,
      password,
    }

    try {
      // Use dynamic endpoint based on selected role
      localStorage.setItem("role", userRole)
      
      const endpoint = userRole === "tutee" ? "tutee-api/login" : "tutor-api/login"
      
      const response = await fetch(`https://tutor-nest-backend.onrender.com/${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        alert("Login failed, please try again.")
        return
      }

      const data = await response.json()
      console.log("Login successful:", data);
      localStorage.setItem("token", data.token);
      
      if (userRole === "tutee") {
        localStorage.setItem("user", JSON.stringify(data.tuteeLogin));
        // Redirect to tutee dashboard
        router.push("/dashboard");
      } else {
        // For tutor role
        localStorage.setItem("user", JSON.stringify(data.tutorLogin || data.user));
        // Redirect to tutor dashboard
        router.push("/tutor/dashboard");
      }
      
    } catch (error) {
      console.error("Error during login:", error)
      alert("An error occurred. Please try again.")
    }
  }

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
        <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">EduConnect</span>
      </Link>
      
      {/* Left side - Image section */}
      <div className="relative w-full md:w-1/2 min-h-[30vh] md:min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-sm z-0"></div>
        <div className="w-full h-full relative">
          <Image
            src="https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg"
            alt="Tutor and student learning together"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/30 to-purple-900/30 flex flex-col items-center justify-center text-white p-8">
            <div className="max-w-md text-center space-y-4 backdrop-blur-sm bg-black/20 p-8 rounded-2xl">
              <h1 className="text-3xl md:text-4xl font-bold">Welcome to EduConnect</h1>
              <p className="text-lg md:text-xl">Connect with expert tutors or find eager students. Your educational journey starts here.</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Right side - Login form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-4 md:p-8">
        <Card className="w-full max-w-md shadow-lg border-0 overflow-hidden">
          <div className="h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Welcome Back!</CardTitle>
            <CardDescription className="text-center">Log in to continue your learning journey</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Role selection */}
              <div className="space-y-3">
                <Label className="text-base font-medium">Login as</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div 
                    className={`border rounded-xl p-3 flex items-center gap-3 cursor-pointer transition-all hover:bg-blue-50 ${userRole === 'tutee' ? 'border-primary bg-blue-50 shadow-md' : 'border-gray-200'}`}
                    onClick={() => setUserRole("tutee")}
                  >
                    <div className={`rounded-full p-2 ${userRole === 'tutee' ? 'bg-primary text-white' : 'bg-gray-100'}`}>
                      <User className="h-4 w-4" />
                    </div>
                    <div>
                      <span className="font-medium">Student</span>
                      <p className="text-xs text-gray-500">I want to learn</p>
                    </div>
                  </div>
                  <div 
                    className={`border rounded-xl p-3 flex items-center gap-3 cursor-pointer transition-all hover:bg-blue-50 ${userRole === 'tutor' ? 'border-primary bg-blue-50 shadow-md' : 'border-gray-200'}`}
                    onClick={() => setUserRole("tutor")}
                  >
                    <div className={`rounded-full p-2 ${userRole === 'tutor' ? 'bg-primary text-white' : 'bg-gray-100'}`}>
                      <School className="h-4 w-4" />
                    </div>
                    <div>
                      <span className="font-medium">Tutor</span>
                      <p className="text-xs text-gray-500">I want to teach</p>
                    </div>
                  </div>
                </div>
                
                {/* Hidden radio group for form submission */}
                <RadioGroup
                  value={userRole}
                  onValueChange={setUserRole}
                  className="hidden"
                >
                  <RadioGroupItem value="tutee" id="tutee" />
                  <RadioGroupItem value="tutor" id="tutor" />
                </RadioGroup>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-primary" />
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="rounded-lg"
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="flex items-center gap-2">
                    <Lock className="h-4 w-4 text-primary" />
                    Password
                  </Label>
                  <Link 
                    href="/auth/reset-password" 
                    className="text-sm text-primary font-medium hover:underline transition-all"
                  >
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="rounded-lg"
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked === true)}
                  className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                />
                <Label
                  htmlFor="remember"
                  className="text-sm font-medium leading-none cursor-pointer select-none"
                >
                  Remember me for 30 days
                </Label>
              </div>
              
              <Button 
                type="submit" 
                className="w-full py-6 rounded-lg bg-primary hover:bg-primary/90 transition-all"
              >
                Sign In
              </Button>
            </form>
          </CardContent>
          
          <CardFooter className="flex justify-center pb-6 pt-0">
            <div className="text-center text-sm">
              Don&apos;t have an account yet?{" "}
              <Link 
                href="/auth/register" 
                className="text-primary font-medium hover:underline transition-all"
              >
                Create an account
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
      
      {/* Decorative elements */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden -z-10 md:hidden">
        <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-blue-200 opacity-20 blur-3xl"></div>
        <div className="absolute bottom-20 -left-20 w-80 h-80 rounded-full bg-purple-200 opacity-20 blur-3xl"></div>
      </div>
    </div>
  )
}