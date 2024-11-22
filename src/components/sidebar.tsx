'use client'

import { Home, Book, Bookmark, User } from 'lucide-react'

export function Sidebar() {
  return (
    <aside className="w-20 bg-gray-100 p-4 flex flex-col items-center space-y-4">
      <button className="p-2 rounded-full hover:bg-gray-200">
        <Home className="w-6 h-6" />
      </button>
      <button className="p-2 rounded-full hover:bg-gray-200">
        <Book className="w-6 h-6" />
      </button>
      <button className="p-2 rounded-full hover:bg-gray-200">
        <Bookmark className="w-6 h-6" />
      </button>
      <button className="p-2 rounded-full hover:bg-gray-200">
        <User className="w-6 h-6" />
      </button>
    </aside>
  )
}

