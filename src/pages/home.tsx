import Chat from "@/components/chat";
import { Avatar, AvatarImage, AvatarFallback } from "../lib/ui/avatar"
import { Button } from "../lib/ui/button.tsx";
import { Link } from 'react-router-dom'
import { useQuery } from "@tanstack/react-query";
import { AddContact, fetchUserFriends, fetchUsers } from "@/api/users/users.ts";
import { SVGProps } from "react";
import { JSX } from "react/jsx-runtime";
import { useState } from 'react'
import { Input } from "../lib/ui/input.tsx"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "../lib/ui/dialog"
import { BellIcon, Check, Search } from 'lucide-react'
import { User } from "@/lib/types/user.ts";

export default function HomePage(){
    const contactUsers = useQuery({
        queryKey: ['users'],
        queryFn: fetchUsers,
    })

    contactUsers.refetch();
    const currentUserFriends = useQuery({
        queryKey: ['friends'],
        queryFn: () => {
            return fetchUserFriends(localStorage.getItem('userId') as string)
        }
    })

    const [isOpen, setIsOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedItems, setSelectedItems] = useState<User[]>([]);
    const [chatContactUser, setChatContactUser] = useState('');

  
    const filteredItems = contactUsers?.data?.filter((item) => {
      if (item.username?.toLowerCase().includes(searchQuery.toLowerCase())){
        return item
      }
    })
  
    const toggleItem = (item: User) => {
      setSelectedItems(prev => 
        prev.includes(item) 
          ? prev.filter(i => i.username !== item.username)
          : [item]
      )
    }
  
    const handleSubmit = async () => {
      console.log('Selected items:', selectedItems)
      await AddContact(localStorage.getItem('userId') as string, selectedItems[0].id)
      setChatContactUser(selectedItems[0].id)
      setIsOpen(false)
    }

    return (
        <div className="flex min-h-screen w-full">
            <div className="hidden w-64 flex-col border-r bg-background md:flex">
            <div className="sticky top-0 z-10 flex h-14 items-center border-b px-4">
                <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8 border">
                    <AvatarImage src="/placeholder-user.jpg" alt="Avatar" />
                    <AvatarFallback>AC</AvatarFallback>
                </Avatar>
                <div className="font-medium">Acme Chat</div>
                </div>
                <div className="ml-auto flex items-center gap-2">
                <Dialog open={isOpen} onOpenChange={() => {
                    setIsOpen(!isOpen)
                    setSelectedItems([])
                }}>
                    <DialogTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <PlusIcon className="h-5 w-5" />
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                        <DialogTitle>Search Friends On this Platform</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                        <div className="flex items-center gap-2">
                            <Search className="w-4 h-4 opacity-50" />
                            <Input
                            placeholder="Search items..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="col-span-3"
                            />
                        </div>
                        <div className="max-h-[200px] overflow-y-auto">
                            {filteredItems?.map((item) => (
                            <div
                                key={item.id}
                                className={`flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-100 rounded ${
                                selectedItems.includes(item) ? 'bg-blue-100' : ''
                                }`}
                                onClick={() => toggleItem(item)}
                            >
                                {selectedItems.includes(item) && (
                                <Check className="w-4 h-4 text-blue-500" />
                                )}
                                <span>{item.username}</span>
                            </div>
                            ))}
                        </div>
                        <Button onClick={handleSubmit}>
                            Message
                        </Button>
                        </div>
                    </DialogContent>
                    </Dialog>
                </div>           
            </div>
            <div className="flex-1 overflow-auto">
                {currentUserFriends.data?.map((contact) => (
                    <div className="grid gap-2 p-4" key={contact.id}>
                    <Link
                        to="#"
                        className="flex items-center gap-3 rounded-md p-2 transition-colors hover:bg-muted"
                        onClick={() => setChatContactUser(contact.id)}
                    >
                        <Avatar className="h-10 w-10 border">
                        <AvatarImage src="/placeholder-user.jpg" alt="Avatar" />
                        <AvatarFallback>AC</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                        <div className="font-medium">{contact.firstName + ' ' + contact.lastName}</div>
                        <div className="text-sm text-muted-foreground">Hey, how's it going?</div>
                        </div>
                        <div className="text-xs text-muted-foreground">2h</div>
                    </Link>
                    </div>
                ))}

            </div>
            </div>
            <div className="flex flex-1 flex-col">
              <div className="sticky top-0 z-10 flex h-14 items-center border-b bg-background px-4">
                <div className="ml-auto flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <BellIcon className="h-5 w-5" />
                  </Button>
                </div>
              </div>
              <Chat chatContactUser={chatContactUser}/>
            </div>
        </div>

    )
}

function PlusIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
        <path d="M5 12h14" />
        <path d="M12 5v14" />
      </svg>
    )
  }
  
  
  function SearchIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
      </svg>
    )
  }