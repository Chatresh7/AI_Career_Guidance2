'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  Brain, 
  Menu, 
  X, 
  Home, 
  User, 
  BarChart3, 
  MessageCircle, 
  LogIn,
  UserPlus 
} from 'lucide-react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const navItems = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/assessment', label: 'Assessment', icon: BarChart3 },
    { href: '/dashboard', label: 'Dashboard', icon: User },
    { href: '/mentor', label: 'AI Mentor', icon: MessageCircle },
  ]

  const toggleMenu = () => setIsOpen(!isOpen)

  return (
    <nav className="bg-white/95 backdrop-blur-sm shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
              <Brain className="text-white" size={24} />
            </div>
            <span className="text-xl font-bold text-gray-900">
              AI Career Guide
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  flex items-center space-x-1 px-3 py-2 rounded-lg transition-all duration-200
                  ${pathname === item.href 
                    ? 'text-primary-600 bg-primary-50' 
                    : 'text-gray-600 hover:text-primary-600 hover:bg-gray-50'
                  }
                `}
              >
                <item.icon size={18} />
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
          </div>

          {/* Auth Buttons - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <Link 
              href="/auth/login" 
              className="flex items-center space-x-1 text-gray-600 hover:text-primary-600 px-3 py-2 rounded-lg hover:bg-gray-50 transition-all duration-200"
            >
              <LogIn size={18} />
              <span>Login</span>
            </Link>
            <Link 
              href="/auth/register" 
              className="btn-primary flex items-center space-x-1"
            >
              <UserPlus size={18} />
              <span>Sign Up</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors duration-200"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          initial={false}
          animate={{ height: isOpen ? 'auto' : 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden overflow-hidden"
        >
          <div className="py-4 space-y-2 border-t border-gray-100">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`
                  flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200
                  ${pathname === item.href 
                    ? 'text-primary-600 bg-primary-50' 
                    : 'text-gray-600 hover:text-primary-600 hover:bg-gray-50'
                  }
                `}
              >
                <item.icon size={20} />
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
            
            {/* Mobile Auth Buttons */}
            <div className="pt-4 space-y-2 border-t border-gray-100">
              <Link 
                href="/auth/login" 
                onClick={() => setIsOpen(false)}
                className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:text-primary-600 hover:bg-gray-50 rounded-lg transition-all duration-200"
              >
                <LogIn size={20} />
                <span>Login</span>
              </Link>
              <Link 
                href="/auth/register" 
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center space-x-2 mx-4 btn-primary"
              >
                <UserPlus size={20} />
                <span>Sign Up</span>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </nav>
  )
}