'use client'

import { Card, CardContent } from '@/components/ui/card'
import { formatDistanceToNow } from 'date-fns'
import Link from 'next/link'

const notificationData = {
  "message": "Booked demo classes",
  "payload": [
    {
      "_id": "6807b2af31ec81996bfe6b78",
      "tuteeId": "67ffa25cc8b64b2e2f733729",
      "tutorId": {
        "_id": "6807b173c4b37b67886c9d24",
        "firstName": "Alice",
        "lastName": "Johnson",
        "mobileNo": 9876543210,
        "email": "hasnika@gmail.com",
        "age": 30,
        "gender": "female",
        "courseToTeach": [
          "Mathematics",
          "Physics"
        ],
        "subjectsToTeach": [
          "Algebra",
          "Calculus"
        ],
        "qualification": "M.Sc in Mathematics",
        "experience": 5,
        "preferredTime": "morning",
        "hourlyPrice": 30,
        "tutorLocation": "Online",
        "AboutMe": "Passionate math tutor with 5 years of experience.",
        "resume": "alice_resume.pdf",
        "pincode": 123456,
        "locality": "Downtown",
        "city": "Los Angeles",
        "state": "CA",
        "password": "$2b$10$N2UqQNDW5VzvOv91eDYeIOyrSsOvWUtnc1BwjvZsi2oUgYp0Crski",
        "profileImage": "alice_profile.jpg",
        "__v": 0
      },
      "subject": "Mathematics",
      "message": "I would like to schedule a demo class for Mathematics.",
      "status": "pending",
      "meetLink": "https://meet.example.com/abc123",
      "createdAt": "2025-04-22T15:15:59.834Z",
      "__v": 0
    },
    {
      "_id": "6807b62d4ee35db15e4580ae",
      "tuteeId": "67ffa25cc8b64b2e2f733729",
      "tutorId": {
        "_id": "6807b173c4b37b67886c9d24",
        "firstName": "Alice",
        "lastName": "Johnson",
        "mobileNo": 9876543210,
        "email": "hasnika@gmail.com",
        "age": 30,
        "gender": "female",
        "courseToTeach": [
          "Mathematics",
          "Physics"
        ],
        "subjectsToTeach": [
          "Algebra",
          "Calculus"
        ],
        "qualification": "M.Sc in Mathematics",
        "experience": 5,
        "preferredTime": "morning",
        "hourlyPrice": 30,
        "tutorLocation": "Online",
        "AboutMe": "Passionate math tutor with 5 years of experience.",
        "resume": "alice_resume.pdf",
        "pincode": 123456,
        "locality": "Downtown",
        "city": "Los Angeles",
        "state": "CA",
        "password": "$2b$10$N2UqQNDW5VzvOv91eDYeIOyrSsOvWUtnc1BwjvZsi2oUgYp0Crski",
        "profileImage": "alice_profile.jpg",
        "__v": 0
      },
      "subject": "Mathematics",
      "message": "I would like to schedule a demo class for Mathematics.",
      "status": "pending",
      "meetLink": "https://meet.example.com/abc123",
      "createdAt": "2025-04-22T15:30:53.956Z",
      "__v": 0
    }
  ]
}

export default function TutorNotificationsPage() {
  const { message, payload } = notificationData

  const filteredNotifications = payload.filter((item) => item.meetLink)

  return (
    <div className="max-w-3xl mx-auto mt-10 px-4">
      <h1 className="text-2xl font-bold mb-6">Notifications</h1>

      {filteredNotifications.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">No notifications available.</p>
      ) : (
        filteredNotifications.map((item) => {
          const tutorName = `${item.tutorId.firstName} ${item.tutorId.lastName}`
          const timeAgo = formatDistanceToNow(new Date(item.createdAt), { addSuffix: true })

          return (
            <Card key={item._id} className="mb-4 border border-gray-200 dark:border-gray-700 shadow-sm">
              <CardContent className="p-5 space-y-2">
                <p className="text-sm text-gray-400">{timeAgo}</p>

                <h2 className="text-md font-medium text-gray-800 dark:text-gray-200">
                  📣 {message}
                </h2>

                <p className="text-gray-700 dark:text-gray-300">
                  👩‍🏫 <span className="font-medium">Tutor:</span> {tutorName}
                </p>

                <p className="text-gray-700 dark:text-gray-300">
                  📘 <span className="font-medium">Subject:</span> {item.subject}
                </p>

                {item.meetLink && (
                  <p className="text-blue-600 dark:text-blue-400">
                    🔗 <Link href={item.meetLink} target="_blank" className="underline">Join Meet</Link>
                  </p>
                )}
              </CardContent>
            </Card>
          )
        })
      )}
    </div>
  )
}
