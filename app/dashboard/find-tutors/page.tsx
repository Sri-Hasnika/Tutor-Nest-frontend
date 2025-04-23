"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Calendar, Filter, Search, Star } from "lucide-react"
import Image from "next/image"
import { DashboardHeader } from "../dashboard-header"
import { DashboardShell } from "../dashboard-shell"

const allTutors = [
  {
    name: "Dr. Sarah Johnson",
    subject: "math",
    specialization: "Calculus, Algebra, Statistics",
    rating: 4.9,
    reviews: 128,
    price: 45,
    image: "/placeholder.svg?height=200&width=200",
    availability: ["weekdays", "evenings"],
    qualification: "PhD",
    age: 35,
    gender: "female",
    location: "New York",
  },
  {
    name: "Prof. Michael Chen",
    subject: "science",
    specialization: "Mechanics, Electromagnetism, Quantum Physics",
    rating: 4.8,
    reviews: 96,
    price: 50,
    image: "/placeholder.svg?height=200&width=200",
    availability: ["weekends", "evenings"],
    qualification: "Professor",
    age: 42,
    gender: "male",
    location: "Boston",
  },
  {
    name: "Ms. Emily Rodriguez",
    subject: "english",
    specialization: "Essay Writing, Literary Analysis, Creative Writing",
    rating: 4.9,
    reviews: 112,
    price: 40,
    image: "/placeholder.svg?height=200&width=200",
    availability: ["weekdays", "mornings"],
    qualification: "Masters",
    age: 29,
    gender: "female",
    location: "Chicago",
  },
  {
    name: "Dr. James Wilson",
    subject: "science",
    specialization: "Organic Chemistry, Biochemistry",
    rating: 4.7,
    reviews: 84,
    price: 48,
    image: "/placeholder.svg?height=200&width=200",
    availability: ["weekends", "evenings"],
    qualification: "PhD",
    age: 40,
    gender: "male",
    location: "Seattle",
  },
  {
    name: "Prof. Maria Gonzalez",
    subject: "languages",
    specialization: "Conversation, Grammar, Literature",
    rating: 5.0,
    reviews: 76,
    price: 38,
    image: "/placeholder.svg?height=200&width=200",
    availability: ["weekdays", "evenings"],
    qualification: "Professor",
    age: 45,
    gender: "female",
    location: "Miami",
  },
  {
    name: "Dr. Robert Lee",
    subject: "computer-science",
    specialization: "Programming, Data Structures, Algorithms",
    rating: 4.8,
    reviews: 92,
    price: 55,
    image: "/placeholder.svg?height=200&width=200",
    availability: ["weekends"],
    qualification: "PhD",
    age: 38,
    gender: "male",
    location: "San Francisco",
  },
]

export default function FindTutorsPage() {
  const [subject, setSubject] = useState("all")
  const [price, setPrice] = useState(100)
  const [rating, setRating] = useState("any")
  const [search, setSearch] = useState("")
  const [availability, setAvailability] = useState<string[]>([])
  const [filteredTutors, setFilteredTutors] = useState(allTutors)

  // useEffect( async()=>{
  //   const fetchTutors= await fetch("http://localhost:8000/")
  // })
  
  // New filter states
  const [qualification, setQualification] = useState("any")
  const [ageRange, setAgeRange] = useState<[number, number]>([20, 60])
  const [gender, setGender] = useState("any")
  const [location, setLocation] = useState("")
  const [currency, setCurrency] = useState("USD")

  const toggleAvailability = (val: string) => {
    setAvailability((prev) =>
      prev.includes(val) ? prev.filter((a) => a !== val) : [...prev, val]
    )
  }

  const applyFilters = () => {
    let result = allTutors.filter((tutor) => {
      const matchesSubject = subject === "all" || tutor.subject === subject
      const matchesPrice = tutor.price <= price
      const matchesRating =
        rating === "any" || (rating === "4plus" && tutor.rating >= 4.0) ||
        (rating === "4.5plus" && tutor.rating >= 4.5) ||
        (rating === "5" && tutor.rating === 5.0)
      const matchesAvailability =
        availability.length === 0 || availability.every((a) => tutor.availability.includes(a))
      const matchesSearch =
        search === "" ||
        tutor.name.toLowerCase().includes(search.toLowerCase()) ||
        tutor.specialization.toLowerCase().includes(search.toLowerCase())
      
      // New filter conditions
      const matchesQualification = 
        qualification === "any" || tutor.qualification === qualification
      const matchesAge = 
        tutor.age >= ageRange[0] && tutor.age <= ageRange[1]
      const matchesGender = 
        gender === "any" || tutor.gender === gender
      const matchesLocation = 
        location === "" || tutor.location.toLowerCase().includes(location.toLowerCase())
      
      return matchesSubject && matchesPrice && matchesRating && matchesAvailability && 
             matchesSearch && matchesQualification && matchesAge && matchesGender && matchesLocation
    })
    setFilteredTutors(result)
  }

  // Currency conversion rates (simplified example)
  const currencyRates = {
    USD: 1,
    EUR: 0.91,
    GBP: 0.77,
    CAD: 1.35,
    AUD: 1.48,
    JPY: 149.50
  }
  
  // Currency symbols
  const currencySymbols = {
    USD: "$",
    EUR: "€",
    GBP: "£",
    CAD: "CA$",
    AUD: "A$",
    JPY: "¥"
  }

  // Function to convert price to selected currency
  const convertPrice = (priceUSD: number, currency: string) => {
    const rate = currencyRates[currency as keyof typeof currencyRates] || 1
    const symbol = currencySymbols[currency as keyof typeof currencySymbols] || "$"
    const convertedPrice = Math.round(priceUSD * rate)
    return `${symbol}${convertedPrice}`
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Find Tutors" text="Discover and connect with expert tutors in your subjects">
        <Button>
          <Filter className="mr-2 h-4 w-4" />
          Filters
        </Button>
      </DashboardHeader>
      <div className="grid gap-6 md:grid-cols-[240px_1fr]">
        <Card className="h-fit">
          <CardHeader>
            <CardTitle>Filters</CardTitle>
            <CardDescription>Refine your tutor search</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="search">Search</Label>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  type="search"
                  placeholder="Search tutors..."
                  className="pl-8"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Subject</Label>
              <Select defaultValue={subject} onValueChange={setSubject}>
                <SelectTrigger>
                  <SelectValue placeholder="Select subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Subjects</SelectItem>
                  <SelectItem value="math">Mathematics</SelectItem>
                  <SelectItem value="science">Science</SelectItem>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="history">History</SelectItem>
                  <SelectItem value="languages">Languages</SelectItem>
                  <SelectItem value="computer-science">Computer Science</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label>Price Range</Label>
                <Select defaultValue={currency} onValueChange={setCurrency}>
                  <SelectTrigger className="w-20 h-8">
                    <SelectValue placeholder="USD" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD</SelectItem>
                    <SelectItem value="EUR">EUR</SelectItem>
                    <SelectItem value="GBP">GBP</SelectItem>
                    <SelectItem value="CAD">CAD</SelectItem>
                    <SelectItem value="AUD">AUD</SelectItem>
                    <SelectItem value="JPY">JPY</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="pt-2">
                <Slider value={[price]} onValueChange={(val) => setPrice(val[0])} max={100} step={1} />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>{convertPrice(10, currency)}</span>
                  <span>{convertPrice(100, currency)}+</span>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Rating</Label>
              <RadioGroup value={rating} onValueChange={setRating}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="any" id="any" />
                  <Label htmlFor="any" className="font-normal">Any rating</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="4plus" id="4plus" />
                  <Label htmlFor="4plus" className="font-normal">4.0 & above</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="4.5plus" id="4.5plus" />
                  <Label htmlFor="4.5plus" className="font-normal">4.5 & above</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="5" id="5" />
                  <Label htmlFor="5" className="font-normal">5.0 only</Label>
                </div>
              </RadioGroup>
            </div>
            <div className="space-y-2">
              <Label>Availability</Label>
              <div className="space-y-2">
                {['weekdays', 'weekends', 'evenings', 'mornings'].map((slot) => (
                  <div className="flex items-center space-x-2" key={slot}>
                    <Checkbox id={slot} checked={availability.includes(slot)} onCheckedChange={() => toggleAvailability(slot)} />
                    <Label htmlFor={slot} className="font-normal capitalize">{slot}</Label>
                  </div>
                ))}
              </div>
            </div>
            
            {/* New Qualification Filter */}
            <div className="space-y-2">
              <Label>Qualification</Label>
              <Select defaultValue={qualification} onValueChange={setQualification}>
                <SelectTrigger>
                  <SelectValue placeholder="Any qualification" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any qualification</SelectItem>
                  <SelectItem value="PhD">PhD</SelectItem>
                  <SelectItem value="Professor">Professor</SelectItem>
                  <SelectItem value="Masters">Master's Degree</SelectItem>
                  <SelectItem value="Bachelors">Bachelor's Degree</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {/* New Age Filter */}
            <div className="space-y-2">
              <Label>Age Range</Label>
              <div className="pt-2">
                <Slider 
                  value={ageRange} 
                  onValueChange={(val) => setAgeRange([val[0], val[1]])} 
                  min={20} 
                  max={60} 
                  step={1} 
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>{ageRange[0]} years</span>
                  <span>{ageRange[1]} years</span>
                </div>
              </div>
            </div>
            
            {/* New Gender Filter */}
            <div className="space-y-2">
              <Label>Gender</Label>
              <RadioGroup value={gender} onValueChange={setGender}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="any" id="gender-any" />
                  <Label htmlFor="gender-any" className="font-normal">Any gender</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="male" id="gender-male" />
                  <Label htmlFor="gender-male" className="font-normal">Male</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="female" id="gender-female" />
                  <Label htmlFor="gender-female" className="font-normal">Female</Label>
                </div>
              </RadioGroup>
            </div>
            
            {/* New Location Filter */}
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                type="text"
                placeholder="Enter city or region"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            
            <Button className="w-full" onClick={applyFilters}>Apply Filters</Button>
          </CardContent>
        </Card>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Showing {filteredTutors.length} tutors</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredTutors.map((tutor, index) => (
              <Card key={index}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between">
                    <div className="flex items-center space-x-1 text-yellow-500">
                      <Star className="h-4 w-4 fill-yellow-500" />
                      <span className="text-sm font-medium">{tutor.rating}</span>
                      <span className="text-xs text-muted-foreground">({tutor.reviews})</span>
                    </div>
                    <div className="text-sm font-medium">{convertPrice(tutor.price, currency)}/hr</div>
                  </div>
                </CardHeader>
                <CardContent className="text-center">
                  <Image
                    src={tutor.image || "/placeholder.svg"}
                    alt={tutor.name}
                    width={100}
                    height={100}
                    className="mx-auto rounded-full aspect-square object-cover mb-4"
                  />
                  <CardTitle className="text-lg">{tutor.name}</CardTitle>
                  <CardDescription className="text-primary font-medium mt-1">
                    {tutor.subject} Specialist
                  </CardDescription>
                  <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{tutor.specialization}</p>
                  <div className="flex items-center justify-center gap-2 mt-3">
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3 mr-1" />
                      {tutor.availability.join(", ")}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex gap-2">
                  <Button variant="outline" size="sm" className="w-full">View Profile</Button>
                  <Button size="sm" className="w-full">Book Session</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </DashboardShell>
  )
}