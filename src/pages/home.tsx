import Chat from "@/components/chat";
import { Avatar, AvatarImage, AvatarFallback } from "../lib/ui/avatar"
import { Button } from "../lib/ui/button.tsx";
import { Link } from 'react-router-dom'
import { useQuery } from "@tanstack/react-query";
import { fetchUsers } from "@/api/users/users.ts";
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
import { Check, Search } from 'lucide-react'

  // Mock data for search results
const mockItems = [
    "Apple", "Banana", "Cherry", "Date", "Elderberry",
    "Fig", "Grape", "Honeydew", "Kiwi", "Lemon"
]

export default function HomePage(){
    const contactUsers = useQuery({
        queryKey: ['users'],
        queryFn: fetchUsers,
    })

    const [isOpen, setIsOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedItems, setSelectedItems] = useState<string[]>([])
  
    const filteredItems = mockItems.filter(item => 
      item.toLowerCase().includes(searchQuery.toLowerCase())
    )
  
    const toggleItem = (item: string) => {
      setSelectedItems(prev => 
        prev.includes(item) 
          ? prev.filter(i => i !== item)
          : [...prev, item]
      )
    }
  
    // const handleSubmit = () => {
    //   console.log('Selected items:', selectedItems)
    //   setIsOpen(false)
    // }

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
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <PlusIcon className="h-5 w-5" />
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                        <DialogTitle>Search Contacts</DialogTitle>
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
                            {filteredItems.map((item) => (
                            <div
                                key={item}
                                className={`flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-100 rounded ${
                                selectedItems.includes(item) ? 'bg-blue-100' : ''
                                }`}
                                onClick={() => toggleItem(item)}
                            >
                                {selectedItems.includes(item) && (
                                <Check className="w-4 h-4 text-blue-500" />
                                )}
                                <span>{item}</span>
                            </div>
                            ))}
                        </div>
                        {/* <Button onClick={handleSubmit}>
                            Add
                        </Button> */}
                        </div>
                    </DialogContent>
                    </Dialog>
                </div>
            </div>
            <div className="flex-1 overflow-auto">
                {contactUsers.data?.map((contact) => (
                    <div className="grid gap-2 p-4" key={contact.id}>
                    <Link
                        to="#"
                        className="flex items-center gap-3 rounded-md p-2 transition-colors hover:bg-muted"
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
            <Chat />
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