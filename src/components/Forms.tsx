import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, RotateCcw } from 'lucide-react';

interface Option {
  id: string;
  label: string;
}

interface Question {
  id: string;
  title: string;
  subtitle: string;
  options?: Option[];
  type?: 'text' | 'email' | 'textarea';
  placeholder?: string;
}

interface Answers {
  [key: string]: string;
}

const questions: Question[] = [
  {
    id: 'occasion',
    title: "WHAT'S THE OCCASION?",
    subtitle: "Contact us!",
    options: [
      { id: 'branding', label: 'Branding' },
      { id: 'webdesign', label: 'Web Design' }, 
      { id: 'webdevelopment', label: 'Web Development' }, 
      { id: 'googlemapsprofile', label: 'Google Maps Profile' }, 
      { id: 'other', label: 'Other' }
    ]
  },
  {
    id: 'name',
    title: "WHAT'S YOUR NAME?", 
    subtitle: "Nice to meet you!",
    type: 'text',
    placeholder: 'Type your name'
  },
  {
    id: 'email',
    title: 'YOUR EMAIL ADDRESS?',
    subtitle: "We'll keep in touch",
    type: 'email',
    placeholder: 'Enter your email'
  },
  {
    id: 'message',
    title: 'YOUR MESSAGE',
    subtitle: "Tell us everything",
    type: 'textarea',
    placeholder: 'Type your message here'
  }
];

export function Forms() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleNext = async (answer: string) => {
    const newAnswers = { ...answers, [questions[currentStep].id]: answer };
    setAnswers(newAnswers);

    if (currentStep < questions.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Submit the form
      setIsSubmitting(true);
      setError(null);

      try {
        const response = await fetch('/api/send-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: newAnswers.name,
            email: newAnswers.email,
            topic: newAnswers.occasion,
            message: newAnswers.message,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to send message');
        }

        setIsSuccess(true);
        // Reset form after 3 seconds
        setTimeout(() => {
          setCurrentStep(0);
          setAnswers({});
          setIsSuccess(false);
        }, 3000);
      } catch (err) {
        setError('Failed to send message. Please try again later.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleStartOver = () => {
    setCurrentStep(0);
    setAnswers({});
    setError(null);
    setIsSuccess(false);
    setIsSubmitting(false);
  };

  const currentQuestion = questions[currentStep];

  const highlightText = (text: string, highlight: string) => {
    const parts = text.split(highlight);
    return parts.map((part, index) => (
      <React.Fragment key={index}>
        {index > 0 && (
          <span
            className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500"
            style={{ backgroundClip: 'text' }}
          >
            {highlight}
          </span>
        )}
        {part}
      </React.Fragment>
    ));
  };

  return (
    <div className="container mx-auto relative">

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
        >
          <div className="space-y-4">
            <h1 className="lg:text-6xl text-4xl font-bold text-center lg:text-left text-white">
              {highlightText(currentQuestion.title, 'OCCASION')}
            </h1>
            <p className="text-white text-xl opacity-80 text-center lg:text-left">{currentQuestion.subtitle}</p>
          </div>

          <div className="space-y-8">
            {error && (
              <div className="bg-red-500 bg-opacity-20 text-red-200 p-4 rounded-lg">
                {error}
              </div>
            )}

            <div className="space-y-4 mx-2 lg:mx-0">
              {currentQuestion.options ? (
                currentQuestion.options.map(option => (
                  <button
                    key={option.id}
                    onClick={() => handleNext(option.id)}
                    disabled={isSubmitting}
                    className="w-full text-left p-4 bg-white bg-opacity-10 hover:bg-opacity-20 
                             text-white rounded-lg flex items-center space-x-3 transition-all
                             disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <div className="w-4 h-4 lg:w-6 lg:h-6 rounded-full border-2 border-white flex-shrink-0" />
                    <span className="lg:text-xl text-base">{option.label}</span>
                  </button>
                ))
              ) : (
                <div className="space-y-4">
                  {currentQuestion.type === 'textarea' ? (
                    <textarea
                      className="w-full bg-white bg-opacity-10 text-white placeholder-white 
                               placeholder-opacity-50 border-none rounded-lg p-4 focus:ring-2 
                               focus:ring-white focus:ring-opacity-50"
                      placeholder={currentQuestion.placeholder}
                      rows={4}
                      disabled={isSubmitting}
                      value={answers[currentQuestion.id] || ''}
                      onChange={(e) => setAnswers(prev => ({ ...prev, [currentQuestion.id]: e.target.value }))}
                    />
                  ) : (
                    <input
                      type={currentQuestion.type}
                      className="w-full bg-white bg-opacity-10 text-white placeholder-white 
                               placeholder-opacity-50 border-none rounded-lg p-4 focus:ring-2 
                               focus:ring-white focus:ring-opacity-50"
                      placeholder={currentQuestion.placeholder}
                      disabled={isSubmitting}
                      value={answers[currentQuestion.id] || ''}
                      onChange={(e) => setAnswers(prev => ({ ...prev, [currentQuestion.id]: e.target.value }))}
                    />
                  )}
                </div>
              )}
            </div>

            <div className="flex justify-between items-center">
<div>
            {currentStep > 0 && (
        <motion.button
          onClick={handleStartOver}
          className=" text-white opacity-60 hover:opacity-100 
                   transition-opacity flex items-center space-x-2 p-2 rounded-lg
                   hover:bg-white hover:bg-opacity-10"
        >
          <RotateCcw className="w-4 h-4" />
        </motion.button>
      )}
</div>
              <div className="mx-2 lg:mx-0 h-1 bg-white bg-opacity-20 flex-1 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-300"
                  style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
                />
              </div>
              {!currentQuestion.options && (
                <button
                  onClick={() => handleNext(answers[currentQuestion.id] || '')}
                  disabled={isSubmitting || !answers[currentQuestion.id]}
                  className="ml-4 text-white flex items-center space-x-2 hover:opacity-80 
                           transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : isSuccess ? (
                    <span className="text-green-400">Sent!</span>
                  ) : (
                    <>
                      <span>next</span>
                      <Send className="w-6 h-6" />
                    </>
                  )}
                </button>
              )}
 
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}