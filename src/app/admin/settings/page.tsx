"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

export default function AdminSettingsPage() {
    const { toast } = useToast()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        toast({
            title: "Settings Saved",
            description: "Your AI settings have been updated successfully.",
        })
    }

  return (
    <>
      <h2 className="font-headline text-3xl font-bold tracking-tight">AI Settings</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid gap-6">
            <Card>
                <CardHeader>
                    <CardTitle>AI Model Configuration</CardTitle>
                    <CardDescription>Configure the underlying AI models for the assistants.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="smart-assistant-model">Smart Assistant Model</Label>
                        <Select defaultValue="gemini-pro">
                            <SelectTrigger id="smart-assistant-model">
                                <SelectValue placeholder="Select a model" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="gemini-pro">Gemini Pro</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="guidance-assistant-model">Guidance Assistant Model</Label>
                         <Select defaultValue="gemini-pro">
                            <SelectTrigger id="guidance-assistant-model">
                                <SelectValue placeholder="Select a model" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="gemini-pro">Gemini Pro</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>API Keys</CardTitle>
                    <CardDescription>Manage API keys for third-party integrations.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="google-ai-key">Google AI API Key</Label>
                        <Input id="google-ai-key" type="password" defaultValue="************" />
                    </div>
                </CardContent>
            </Card>
             <div className="flex justify-end">
                <Button type="submit">Save Changes</Button>
            </div>
        </div>
      </form>
    </>
  )
}
