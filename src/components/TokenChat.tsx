import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { MessageSquare, Send } from "lucide-react";
import { useState } from "react";

interface Message {
  id: number;
  user: string;
  content: string;
  timestamp: Date;
}

export const TokenChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      user: "Meme Lord",
      content: "To the moon! 🚀",
      timestamp: new Date(),
    },
    {
      id: 2,
      user: "Diamond Hands",
      content: "HODL! 💎🙌",
      timestamp: new Date(),
    },
  ]);
  const [newMessage, setNewMessage] = useState("");

  const handleSend = () => {
    if (!newMessage.trim()) return;
    
    setMessages([
      ...messages,
      {
        id: messages.length + 1,
        user: "You",
        content: newMessage,
        timestamp: new Date(),
      },
    ]);
    setNewMessage("");
  };

  return (
    <Card className="p-4 h-[400px] flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <MessageSquare className="h-5 w-5 text-primary" />
        <h3 className="font-bold">Live Chat</h3>
      </div>
      
      <div className="flex-1 overflow-y-auto space-y-4 mb-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className="bg-card p-3 rounded-lg animate-fade-in"
          >
            <div className="flex justify-between items-center mb-1">
              <span className="font-bold text-sm">{message.user}</span>
              <span className="text-xs text-muted-foreground">
                {message.timestamp.toLocaleTimeString()}
              </span>
            </div>
            <p className="text-sm">{message.content}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <Input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          onKeyPress={(e) => e.key === "Enter" && handleSend()}
        />
        <Button onClick={handleSend} size="icon">
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
};