"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Mic, Video, ScreenShare, Settings } from "lucide-react"

type JoinSessionModalProps = {
  isOpen: boolean
  onClose: () => void
  session: {
    id: number
    subject: string
    tutee: string
    time: string
  }
}

export function JoinSessionModal({ isOpen, onClose, session }: JoinSessionModalProps) {
  const [audioEnabled, setAudioEnabled] = useState(true)
  const [videoEnabled, setVideoEnabled] = useState(true)
  const [screenShareEnabled, setScreenShareEnabled] = useState(false)

  const handleJoin = () => {
    // In a real app, this would connect to the video conference
    console.log({
      sessionId: session.id,
      audioEnabled,
      videoEnabled,
      screenShareEnabled,
    })

    // Simulate joining the session
    window.open(`https://example.com/video-session/${session.id}`, "_blank")
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Join Session</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <Label className="text-muted-foreground">Subject</Label>
              <p className="font-medium">{session.subject}</p>
            </div>

            <div>
              <Label className="text-muted-foreground">Tutee</Label>
              <p className="font-medium">{session.tutee}</p>
            </div>

            <div>
              <Label className="text-muted-foreground">Time</Label>
              <p className="font-medium">{session.time}</p>
            </div>
          </div>

          <div className="space-y-4 pt-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Mic className="h-5 w-5" />
                <Label htmlFor="audio">Microphone</Label>
              </div>
              <Switch id="audio" checked={audioEnabled} onCheckedChange={setAudioEnabled} />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Video className="h-5 w-5" />
                <Label htmlFor="video">Camera</Label>
              </div>
              <Switch id="video" checked={videoEnabled} onCheckedChange={setVideoEnabled} />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <ScreenShare className="h-5 w-5" />
                <Label htmlFor="screen">Screen Sharing</Label>
              </div>
              <Switch id="screen" checked={screenShareEnabled} onCheckedChange={setScreenShareEnabled} />
            </div>
          </div>

          <div className="pt-2">
            <Button variant="outline" size="sm" className="w-full flex items-center justify-center">
              <Settings className="h-4 w-4 mr-2" />
              Test Audio and Video
            </Button>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleJoin}>Join Session</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
