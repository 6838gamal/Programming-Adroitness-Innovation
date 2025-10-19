
"use client";

import { useState, useRef, useEffect, useTransition } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Bot, Send, User, Loader2, Mic, StopCircle, Copy, Volume2, VolumeX, Speaker } from "lucide-react";
import { aiSmartAssistant } from "@/ai/flows/ai-smart-assistant";
import { speechToText } from "@/ai/flows/speech-to-text";
import { textToSpeech } from "@/ai/flows/text-to-speech";
import { AppLogo } from "@/components/app-logo";
import { useLanguage } from "@/hooks/use-language";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useToast } from "@/hooks/use-toast";


interface Message {
  role: "user" | "assistant";
  content: string;
}

export function ChatUI() {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isPending, startTransition] = useTransition();
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [autoPlayAudio, setAutoPlayAudio] = useState(true);

  async function playAudio(text: string) {
    if (isPlayingAudio && audioRef.current) {
        stopCurrentAudio();
        return;
    }
    try {
        const { audio } = await textToSpeech({ text });
        setAudioUrl(audio);
    } catch (error) {
        console.error("Error converting text to speech:", error);
        toast({
            variant: "destructive",
            title: "Error",
            description: "Could not play audio.",
        });
    }
  }


  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input.trim() === "" || isPending) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    const currentInput = input;
    setInput("");

    startTransition(async () => {
      try {
        const assistantResponse = await aiSmartAssistant({
          query: currentInput,
          studentId: "user-123", // Replace with actual student ID
        });
        const newAssistantMessage = { role: "assistant" as const, content: assistantResponse.response };
        setMessages((prev) => [
          ...prev,
          newAssistantMessage,
        ]);

        if (autoPlayAudio) {
            playAudio(assistantResponse.response);
        }
      } catch (error) {
        console.error("Error with AI assistant:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Something went wrong with the assistant.",
        });
        setMessages(prev => prev.slice(0, prev.length -1)); // remove user message if ai fails
      }
    });
  };

  const handleToggleRecording = async () => {
    if (isRecording) {
      if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
        mediaRecorderRef.current.stop();
      }
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;
        audioChunksRef.current = [];

        mediaRecorder.onstart = () => {
          setIsRecording(true);
        };

        mediaRecorder.ondataavailable = (event) => {
          audioChunksRef.current.push(event.data);
        };

        mediaRecorder.onstop = async () => {
          setIsRecording(false);
          const audioBlob = new Blob(audioChunksRef.current, { type: mediaRecorder.mimeType });
          const reader = new FileReader();
          reader.readAsDataURL(audioBlob);
          reader.onloadend = async () => {
            const base64Audio = reader.result as string;
            if (base64Audio) {
              startTransition(async () => {
                setInput(t('thinking'));
                const { text } = await speechToText({ audio: base64Audio });
                setInput(text);
              });
            }
          };
          stream.getTracks().forEach(track => track.stop());
        };

        mediaRecorder.start();
      } catch (error) {
        console.error("Error accessing microphone:", error);
        toast({
            variant: "destructive",
            title: "Microphone Error",
            description: "Could not access microphone. Please ensure permission is granted.",
        });
      }
    }
  };

  const handleCopy = (content: string) => {
    navigator.clipboard.writeText(content).then(() => {
      toast({
        description: "Copied to clipboard!",
      });
    }).catch(err => {
      console.error('Failed to copy: ', err);
      toast({
        variant: "destructive",
        description: "Failed to copy to clipboard.",
      });
    });
  };

  const handleManualPlayAudio = async (text: string) => {
    if (isPlayingAudio && audioRef.current) {
        stopCurrentAudio();
        return;
    }
    startTransition(async () => {
        await playAudio(text);
    });
  };

  useEffect(() => {
    if (audioUrl && audioRef.current) {
      audioRef.current.src = audioUrl;
      audioRef.current.play().catch(e => console.error("Audio play failed:", e));
      setIsPlayingAudio(true);
    }
  }, [audioUrl]);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  const stopCurrentAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsPlayingAudio(false);
    setAudioUrl(null);
  };
  
  useEffect(() => {
    return () => {
        stopCurrentAudio();
    };
  }, []);

  return (
    <div className={`flex h-full flex-col rounded-lg border bg-card ${language === 'ar' ? 'font-arabic' : 'font-body'}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
       <audio ref={audioRef} onEnded={() => setIsPlayingAudio(false)} />
       <header className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-2">
            <AppLogo className="h-8 w-8 hidden sm:block" />
            <div>
              <h3 className="font-headline text-lg font-semibold">{t('pai_smart_assistant')}</h3>
              <p className="text-sm text-muted-foreground">{t('how_can_i_help_today')}</p>
            </div>
        </div>
        <Button variant={autoPlayAudio ? 'default': 'outline'} size="icon" onClick={() => setAutoPlayAudio(prev => !prev)}>
            <Speaker className="h-5 w-5"/>
            <span className="sr-only">Toggle Auto-Play Audio</span>
        </Button>
       </header>
      <ScrollArea className="flex-1" ref={scrollAreaRef}>
        <div className="p-6 space-y-6">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full pt-10 text-center">
                <div className="p-4 bg-primary/10 rounded-full mb-4">
                  <Bot className="h-10 w-10 text-primary" />
                </div>
              <h3 className="font-headline text-2xl font-semibold mt-4">{t('pai_smart_assistant')}</h3>
              <p className="text-muted-foreground mt-2">{t('how_can_i_help_today')}</p>
            </div>
          )}
          {messages.map((message, index) => (
            <div
              key={index}
              className={cn(
                "group flex items-start gap-4",
                message.role === "user" ? "justify-end" : "justify-start"
              )}
            >
              {message.role === "assistant" && (
                <Avatar className="h-9 w-9 border">
                  <AvatarFallback><Bot className="h-5 w-5"/></AvatarFallback>
                </Avatar>
              )}
              <div
                className={cn(
                  "relative max-w-2xl rounded-lg px-4 py-3 text-sm",
                  message.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                )}
              >
                 {message.role === 'assistant' ? (
                  <>
                    <div className="absolute top-2 right-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                          size="icon"
                          variant="ghost"
                          className="h-7 w-7"
                          onClick={() => handleManualPlayAudio(message.content)}
                      >
                          {isPlayingAudio ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                          <span className="sr-only">Play audio</span>
                      </Button>
                      <Button
                          size="icon"
                          variant="ghost"
                          className="h-7 w-7"
                          onClick={() => handleCopy(message.content)}
                      >
                          <Copy className="h-4 w-4" />
                          <span className="sr-only">Copy</span>
                      </Button>
                    </div>
                    <article className="prose prose-sm dark:prose-invert max-w-full pr-16">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>{message.content}</ReactMarkdown>
                    </article>
                  </>
                ) : (
                  message.content
                )}
              </div>
              {message.role === "user" && (
                <Avatar className="h-9 w-9 border">
                  <AvatarFallback><User className="h-5 w-5"/></AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
          {isPending && (
             <div className="flex items-start gap-4 justify-start">
                <Avatar className="h-9 w-9 border">
                  <AvatarFallback><Bot className="h-5 w-5"/></AvatarFallback>
                </Avatar>
                <div className="max-w-md rounded-lg px-4 py-3 text-sm bg-muted flex items-center">
                    <Loader2 className="h-5 w-5 animate-spin mr-2" />
                    {t('thinking')}
                </div>
             </div>
          )}
        </div>
      </ScrollArea>
      <div className="border-t bg-card p-4">
        <form onSubmit={handleSendMessage} className="flex items-center gap-4">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t('ask_about_course')}
            className="flex-1"
            disabled={isPending || isRecording}
          />
           <Button type="button" size="icon" variant={isRecording ? "destructive" : "outline"} onClick={handleToggleRecording} disabled={isPending}>
            {isRecording ? <StopCircle className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
            <span className="sr-only">{isRecording ? "Stop recording" : "Start recording"}</span>
          </Button>
          <Button type="submit" size="icon" disabled={isPending || !input.trim() || isRecording}>
            {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            <span className="sr-only">{t('send')}</span>
          </Button>
        </form>
      </div>
    </div>
  );
}

    