/**
 * v0 by Vercel.
 * @see https://v0.dev/t/aL467ZzWWd7
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Avatar, AvatarImage, AvatarFallback } from "../lib/ui/avatar"
import { Button } from "../lib/ui/button.tsx";
import { Link } from 'react-router-dom'
import { Textarea } from "../lib/ui/textarea"
import { useEffect, useState } from 'react';
import { socket } from '../socket';

export default function Chat({ chatContactUser: chatContactUser }: { chatContactUser: string }) {

  const [messages, setMessages] = useState<unknown[]>([]);
  const [input, setInput] = useState<string>("");
  socket.auth = { userId: localStorage.getItem('userId') };
  useEffect(() => {
    // Listen for incoming messages
    socket.on("chat-message", (message: unknown) => {
      console.log(message, 'react message');
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Clean up on component unmount
    return () => {
      socket.off("chat-message");
    };
  }, [messages]);

  const sendMessage = () => {
    if (input.trim() !== "") {
      socket.emit("chat-message", {
        message: input,
        senderId: localStorage.getItem('userId'),
        recieverId: chatContactUser,
      });  // Send message to server
      setInput("");  // Clear input after sending
    }
  };
  return (

      <div className="flex flex-1 flex-col">
        <div className="sticky top-0 z-10 flex h-14 items-center border-b bg-background px-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8 border">
              <AvatarImage src="/placeholder-user.jpg" alt="Avatar" />
              <AvatarFallback>AC</AvatarFallback>
            </Avatar>
            <div className="font-medium">John Doe</div>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <PhoneIcon className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <VideoIcon className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <MoveHorizontalIcon className="h-5 w-5" />
            </Button>
          </div>
        </div>
        <div className="flex-1 overflow-auto p-4">
          <div className="grid gap-4">
            {messages.map((message) => {
              return (
                <>
                <div className="flex items-start gap-3">
                  <Avatar className="h-8 w-8 border">
                    <AvatarImage src="/placeholder-user.jpg" alt="Avatar" />
                    <AvatarFallback>AC</AvatarFallback>
                  </Avatar>
                  <div className="rounded-md bg-muted p-3 text-sm">
                    <p>{message}</p>
                    <div className="mt-2 text-xs text-muted-foreground">2h</div>
                  </div>
                </div>
                <div className="flex items-start gap-3 justify-end">
                    <div className="rounded-md bg-primary p-3 text-sm text-primary-foreground">
                      <p>{message}</p>
                      <div className="mt-2 text-xs text-muted-foreground">2h</div>
                    </div>
                    <Avatar className="h-8 w-8 border">
                      <AvatarImage src="/placeholder-user.jpg" alt="Avatar" />
                      <AvatarFallback>AC</AvatarFallback>
                    </Avatar>
                </div>
                </>
              )
            })}
          </div>
        </div>
        <div className="sticky bottom-0 z-10 flex h-14 items-center border-t bg-background px-4">
          <div className="relative flex-1">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' ? sendMessage() : null}
              placeholder="Type your message..."
              className="min-h-[44px] w-full rounded-xl border border-neutral-400 pr-14 focus:border-primary focus:ring-primary"
            />
            <Button type="submit" variant="ghost" size="icon" className="absolute right-2 top-2" onClick={sendMessage}>
              <SendIcon className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
  )
}

function MoveHorizontalIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="18 8 22 12 18 16" />
      <polyline points="6 8 2 12 6 16" />
      <line x1="2" x2="22" y1="12" y2="12" />
    </svg>
  )
}


function PhoneIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  )
}


function SendIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </svg>
  )
}


function VideoIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5" />
      <rect x="2" y="6" width="14" height="12" rx="2" />
    </svg>
  )
}