"use client";

import { ChatUI } from "./chat-ui";

export default function AssistantPage() {
  return (
    <div className="h-[calc(100vh-8rem)] w-full max-w-4xl mx-auto">
      <ChatUI />
    </div>
  );
}
