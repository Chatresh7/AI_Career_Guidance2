'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import MultiStepForm from '@/components/MultiStepForm'
import { CheckCircle, ArrowLeft, ArrowRight } from 'lucide-react'

export default function OnboardingPage() {
  const searchParams = useSearchParams()
  const [selectedDomain, setSelectedDomain] = useState('')
  const [currentStep, setCurrentStep] = useState(1)
  const [isAware, setIsAware] = useState(null)
  const [formData, setFormData] = useState({})

  useEffect(() => {
    const domain = searchParams.get('domain')
    if (domain) {
      setSelectedDomain(domain)
    }
  }, [searchParams])

  const steps = [
    { id: 1, title: 'Domain Selection', completed: selectedDomain !== '' },
    { id: 2, title: 'Awareness Check', completed: isAware !== null },
    { id: 3, title: 'Personal Information', completed: false },
    { id: 4, title: 'Skills & Experience', completed: false },
    { id: 5, title: 'Goals & Preferences', completed: false }
  ]

  const handleDomainSelect = (domain) => {
    setSelectedDomain(domain)
    setCurrentStep(2)
  }

  const handleAwarenessSelect = (aware) => {
    setIsAware(aware)
    setCurrentStep(3)
  }

  const domainOptions = [
    { id: 'engineering', name: 'Engineering', color: 'bg-blue-500' },
    { id: 'medicine', name: 'Medicine', color: 'bg-red-500' },
    { id: 'commerce', name: 'Commerce', color: 'bg-green-500' },
    { id: 'arts', name: 'Arts', color: 'bg-purple-500' },
    { id: 'science', name: 'Science', color: 'bg-orange-500' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-4xl mx-auto px-6">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`
                  w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold
                  ${currentStep >= step.id 
                    ? 'bg-primary-600 text-white' 
                    : 'bg-gray-200 text-gray-600'
                  }
                `}>
                  {step.completed ? <CheckCircle size={20} /> : step.id}
                </div>
                {index < steps.length - 1 && (
                  <div className={`
                    w-16 md:w-24 h-1 mx-2
                    ${currentStep > step.id ? 'bg-primary-600' : 'bg-gray-200'}
                  `}></div>
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-sm text-gray-600">
            {steps.map((step) => (
              <span key={step.id} className="text-center max-w-20">
                {step.title}
              </span>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <AnimatePresence mode="wait">
            {/* Step 1: Domain Selection */}
            {currentStep === 1 && (
              <motion.div
                key="domain-selection"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Choose Your Domain of Interest
                </h2>
                <p className="text-gray-600 mb-8 text-lg">
                  Select the field you want to explore or build your career in.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {domainOptions.map((domain) => (
                    <button
                      key={domain.id}
                      onClick={() => handleDomainSelect(domain.id)}
                      className={`
                        p-6 rounded-xl border-2 transition-all duration-200 text-left
                        ${selectedDomain === domain.id
                          ? 'border-primary-500 bg-primary-50 shadow-lg'
                          : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                        }
                      `}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-lg ${domain.color} flex items-center justify-center`}>
                          <span className="text-white font-bold text-xl">
                            {domain.name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900">
                            {domain.name}
                          </h3>
                          <p className="text-gray-600">
                            Explore careers in {domain.name.toLowerCase()}
                          </p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 2: Awareness Check */}
            {currentStep === 2 && (
              <motion.div
                key="awareness-check"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  How familiar are you with {domainOptions.find(d => d.id === selectedDomain)?.name}?
                </h2>
                <p className="text-gray-600 mb-8 text-lg">
                  This helps us personalize your learning path and recommendations.
                </p>

                <div className="space-y-4">
                  <button
                    onClick={() => handleAwarenessSelect(false)}
                    className={`
                      w-full p-6 rounded-xl border-2 transition-all duration-200 text-left
                      ${isAware === false
                        ? 'border-primary-500 bg-primary-50 shadow-lg'
                        : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                      }
                    `}
                  >
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Not Aware - I'm a beginner
                    </h3>
                    <p className="text-gray-600">
                      I have little to no knowledge about this domain and want to explore it from scratch.
                    </p>
                  </button>

                  <button
                    onClick={() => handleAwarenessSelect(true)}
                    className={`
                      w-full p-6 rounded-xl border-2 transition-all duration-200 text-left
                      ${isAware === true
                        ? 'border-primary-500 bg-primary-50 shadow-lg'
                        : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                      }
                    `}
                  >
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Aware - I have some background
                    </h3>
                    <p className="text-gray-600">
                      I have some knowledge, skills, or experience in this domain and want to advance further.
                    </p>
                  </button>
                </div>

                <div className="mt-8 flex justify-between">
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="btn-secondary inline-flex items-center gap-2"
                  >
                    <ArrowLeft size={20} /> Back
                  </button>
                </div>
              </motion.div>
            )}

            {/* Steps 3-5: Multi-Step Form */}
            {currentStep >= 3 && (
              <motion.div
                key="multi-step-form"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <MultiStepForm
                  selectedDomain={selectedDomain}
                  isAware={isAware}
                  currentStep={currentStep}
                  setCurrentStep={setCurrentStep}
                  formData={formData}
                  setFormData={setFormData}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}