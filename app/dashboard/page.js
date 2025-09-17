'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Target, 
  TrendingUp, 
  BookOpen, 
  Clock, 
  Award, 
  MessageCircle,
  Calendar,
  CheckCircle,
  Play,
  ArrowRight,
  Brain,
  Star
} from 'lucide-react'
import RoadmapVisualizer from '@/components/RoadmapVisualizer'
import ProgressTracker from '@/components/ProgressTracker'
import AIMentor from '@/components/AIMentor'

export default function Dashboard() {
  const [userData, setUserData] = useState(null)
  const [showMentor, setShowMentor] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Load user data from localStorage (in real app, this would be from API)
    const data = localStorage.getItem('onboardingData')
    if (data) {
      setUserData(JSON.parse(data))
    }
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <Brain className="animate-spin text-primary-600 mx-auto mb-4" size={48} />
          <p className="text-gray-600">Loading your personalized dashboard...</p>
        </div>
      </div>
    )
  }

  if (!userData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Welcome to AI Career Guide!</h2>
          <p className="text-gray-600 mb-6">Complete your onboarding to access your personalized dashboard.</p>
          <a href="/onboarding" className="btn-primary">Start Onboarding</a>
        </div>
      </div>
    )
  }

  const stats = [
    { label: 'Skills Acquired', value: '12', icon: Award, color: 'text-green-600' },
    { label: 'Courses Completed', value: '3', icon: BookOpen, color: 'text-blue-600' },
    { label: 'Learning Streak', value: '7 days', icon: Calendar, color: 'text-orange-600' },
    { label: 'Career Match', value: '85%', icon: Target, color: 'text-purple-600' }
  ]

  const recentActivities = [
    { title: 'Completed Python Basics', time: '2 hours ago', type: 'course' },
    { title: 'Updated portfolio project', time: '1 day ago', type: 'project' },
    { title: 'AI Career Assessment', time: '3 days ago', type: 'assessment' },
    { title: 'Joined Data Science community', time: '5 days ago', type: 'community' }
  ]

  const upcomingTasks = [
    { title: 'Complete Machine Learning Module 3', deadline: 'Today', priority: 'high' },
    { title: 'Submit portfolio review', deadline: 'Tomorrow', priority: 'medium' },
    { title: 'Practice coding interview questions', deadline: 'This week', priority: 'low' },
    { title: 'Update LinkedIn profile', deadline: 'Next week', priority: 'medium' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {userData.fullName}! 👋
          </h1>
          <p className="text-gray-600 text-lg">
            Continue your journey in <span className="capitalize font-semibold text-primary-600">{userData.domain}</span>
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {stats.map((stat, index) => (
            <div key={index} className="card p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-lg bg-gray-50 flex items-center justify-center ${stat.color}`}>
                  <stat.icon size={24} />
                </div>
                <TrendingUp size={16} className="text-green-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
              <p className="text-gray-600 text-sm">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Career Roadmap */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="card p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  <Target className="text-primary-600" size={24} />
                  Your Career Roadmap
                </h2>
                <button className="text-primary-600 hover:text-primary-700 font-medium">
                  View All
                </button>
              </div>
              <RoadmapVisualizer domain={userData.domain} />
            </motion.div>

            {/* Progress Tracker */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="card p-6"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <TrendingUp className="text-primary-600" size={24} />
                Learning Progress
              </h2>
              <ProgressTracker />
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* AI Mentor Chat */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="card p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Brain className="text-primary-600" size={20} />
                  AI Mentor
                </h3>
                <button
                  onClick={() => setShowMentor(!showMentor)}
                  className="text-primary-600 hover:text-primary-700"
                >
                  <MessageCircle size={20} />
                </button>
              </div>
              
              <div className="bg-primary-50 p-4 rounded-lg mb-4">
                <p className="text-sm text-primary-800 mb-2">
                  "Great progress on your Python skills! Ready for the next challenge?"
                </p>
                <p className="text-xs text-primary-600">AI Mentor • 5 min ago</p>
              </div>
              
              <button 
                onClick={() => setShowMentor(true)}
                className="btn-primary w-full flex items-center justify-center gap-2"
              >
                <MessageCircle size={16} />
                Chat with Mentor
              </button>
            </motion.div>

            {/* Recent Activities */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="card p-6"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Clock className="text-primary-600" size={20} />
                Recent Activities
              </h3>
              <div className="space-y-3">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <CheckCircle size={16} className="text-green-500" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Upcoming Tasks */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="card p-6"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Calendar className="text-primary-600" size={20} />
                Upcoming Tasks
              </h3>
              <div className="space-y-3">
                {upcomingTasks.map((task, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className={`w-3 h-3 rounded-full ${
                      task.priority === 'high' ? 'bg-red-500' :
                      task.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                    }`}></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{task.title}</p>
                      <p className="text-xs text-gray-500">{task.deadline}</p>
                    </div>
                    <Play size={16} className="text-gray-400" />
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="card p-6 text-center hover:shadow-xl transition-shadow duration-300">
            <BookOpen className="text-primary-600 mx-auto mb-4" size={32} />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Continue Learning</h3>
            <p className="text-gray-600 text-sm mb-4">Resume your current course</p>
            <button className="btn-primary w-full">Continue</button>
          </div>
          
          <div className="card p-6 text-center hover:shadow-xl transition-shadow duration-300">
            <Award className="text-primary-600 mx-auto mb-4" size={32} />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Skill Assessment</h3>
            <p className="text-gray-600 text-sm mb-4">Test your knowledge</p>
            <button className="btn-primary w-full">Take Test</button>
          </div>
          
          <div className="card p-6 text-center hover:shadow-xl transition-shadow duration-300">
            <Star className="text-primary-600 mx-auto mb-4" size={32} />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Career Opportunities</h3>
            <p className="text-gray-600 text-sm mb-4">Explore job matches</p>
            <button className="btn-primary w-full">Explore</button>
          </div>
        </motion.div>
      </div>

      {/* AI Mentor Modal */}
      {showMentor && (
        <AIMentor onClose={() => setShowMentor(false)} userData={userData} />
      )}
    </div>
  )
}