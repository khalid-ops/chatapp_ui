
import { useState } from 'react'
import { Button } from "../lib/ui/button.tsx"
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

export default function SearchModal() {
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

  const handleSubmit = () => {
    console.log('Selected items:', selectedItems)
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Open Search</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Search and Select Items</DialogTitle>
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
          <Button onClick={handleSubmit}>
            Submit Selection
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}