import React, { useState } from 'react';
import { Send } from 'lucide-react';

interface ContactFormProps {
  services: string[];
}

export function ContactForm({ services }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const form = e.currentTarget;
    const formData = new FormData(form);
    
    const payload = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      topic: formData.get('topic') as string,
      message: formData.get('message') as string,
    };

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setIsSuccess(true);
      form.reset();
    } catch (err) {
      setError('Failed to send message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }

    // Reset success message after 3 seconds
    if (!error) {
      setTimeout(() => setIsSuccess(false), 3000);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="w-full px-4 py-2 bg-slate-800 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none"
        />
      </div>
      
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="w-full px-4 py-2 bg-slate-800 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none"
        />
      </div>
      
      <div>
        <label htmlFor="topic" className="block text-sm font-medium text-slate-300 mb-2">Topic</label>
        <select
          id="topic"
          name="topic"
          required
          className="w-full px-4 py-2 bg-slate-800 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none"
        >
          {services.map((service, index) => (
            <option key={index} value={service}>{service}</option>
          ))}
          <option value="Other">Other</option>
        </select>
      </div>
      
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">Message</label>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          className="w-full px-4 py-2 bg-slate-800 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none"
        ></textarea>
      </div>

      {error && (
        <div className="text-red-500 text-sm">{error}</div>
      )}
      
      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full px-6 py-3 rounded-lg font-semibold flex items-center justify-center transition-colors ${
          isSuccess
            ? 'bg-green-500'
            : isSubmitting
            ? 'bg-slate-700'
            : 'bg-cyan-500 hover:bg-cyan-600'
        }`}
      >
        {isSuccess ? (
          'Message Sent!'
        ) : isSubmitting ? (
          <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        ) : (
          <>
            Send Message
            <Send className="ml-2 w-5 h-5" />
          </>
        )}
      </button>
    </form>
  );
}