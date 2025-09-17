'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  Code, 
  Heart, 
  Calculator, 
  Palette, 
  Microscope, 
  ArrowRight, 
  Users, 
  TrendingUp 
} from 'lucide-react'

const domains = [
  {
    id: 'engineering',
    title: 'Engineering',
    description: 'Software, Hardware, AI/ML, Robotics, and more',
    icon: Code,
    color: 'from-blue-500 to-cyan-500',
    stats: '500K+ opportunities',
    popular: true
  },
  {
    id: 'medicine',
    title: 'Medicine',
    description: 'Healthcare, Research, Pharmaceuticals',
    icon: Heart,
    color: 'from-red-500 to-pink-500',
    stats: '200K+ opportunities'
  },
  {
    id: 'commerce',
    title: 'Commerce',
    description: 'Finance, Business, Entrepreneurship',
    icon: Calculator,
    color: 'from-green-500 to-emerald-500',
    stats: '300K+ opportunities'
  },
  {
    id: 'arts',
    title: 'Arts',
    description: 'Design, Media, Content Creation',
    icon: Palette,
    color: 'from-purple-500 to-violet-500',
    stats: '150K+ opportunities'
  },
  {
    id: 'science',
    title: 'Science',
    description: 'Research, Analytics, Environmental',
    icon: Microscope,
    color: 'from-orange-500 to-yellow-500',
    stats: '120K+ opportunities'
  }
]

export default function DomainGrid() {
  const [selectedDomain, setSelectedDomain] = useState(null)
  const [hoveredDomain, setHoveredDomain] = useState(null)

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {domains.map((domain, index) => (
          <motion.div
            key={domain.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative group"
            onMouseEnter={() => setHoveredDomain(domain.id)}
            onMouseLeave={() => setHoveredDomain(null)}
          >
            <Link href={`/onboarding?domain=${domain.id}`}>
              <div className={`
                relative overflow-hidden rounded-2xl p-8 h-64 cursor-pointer
                transform transition-all duration-300 
                ${hoveredDomain === domain.id ? 'scale-105 shadow-2xl' : 'shadow-lg'}
                bg-gradient-to-br ${domain.color}
              `}>
                {/* Popular badge */}
                {domain.popular && (
                  <div className="absolute top-4 right-4 bg-yellow-400 text-gray-900 text-xs font-bold px-3 py-1 rounded-full">
                    Most Popular
                  </div>
                )}

                {/* Background pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full transform translate-x-16 -translate-y-16"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full transform -translate-x-12 translate-y-12"></div>
                </div>

                {/* Content */}
                <div className="relative z-10 h-full flex flex-col justify-between text-white">
                  <div>
                    <domain.icon size={48} className="mb-4" />
                    <h3 className="text-2xl font-bold mb-2">{domain.title}</h3>
                    <p className="text-white/90 text-sm leading-relaxed">
                      {domain.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-white/90">
                      <TrendingUp size={16} />
                      <span className="text-sm font-medium">{domain.stats}</span>
                    </div>
                    <ArrowRight 
                      size={20} 
                      className={`
                        transform transition-transform duration-300
                        ${hoveredDomain === domain.id ? 'translate-x-1' : ''}
                      `} 
                    />
                  </div>
                </div>

                {/* Hover overlay */}
                <div className={`
                  absolute inset-0 bg-white/10 opacity-0 transition-opacity duration-300
                  ${hoveredDomain === domain.id ? 'opacity-100' : ''}
                `}></div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Additional Info Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="mt-16 text-center"
      >
        <div className="bg-white rounded-2xl p-8 shadow-lg max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Not Sure Which Domain to Choose?
          </h3>
          <p className="text-gray-600 mb-6 text-lg">
            Take our comprehensive assessment to discover the perfect career path based on your 
            personality, skills, and interests.
          </p>
          <Link 
            href="/assessment" 
            className="btn-outline inline-flex items-center gap-2"
          >
            Take Assessment <ArrowRight size={20} />
          </Link>
        </div>
      </motion.div>
    </div>
  )
}