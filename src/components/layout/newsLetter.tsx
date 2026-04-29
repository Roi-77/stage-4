import React, { useState } from 'react';
import Button from '../ui/button';

const NewsLetter = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, submitting, success, error
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // HTML5 Email Validation (MANDATORY!)
    const form = e.currentTarget;
    const emailInput = form.querySelector('input[type="email"]')as HTMLInputElement;
    if (!emailInput.validity.valid) {
      setError('Please enter a valid email address');
      setStatus('error');
      return;
    }

    setStatus('submitting');
    setError('');

    // Simulate API call (replace with real endpoint later)
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate success
      setStatus('success');
      setEmail('');
    } catch (err) {
      setStatus('error');
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <section className="glass py-16 px-8 lg:px-16 rounded-3xl mt-12 mx-6 lg:mx-0 shadow-2xl border border-white/30" id="email-signup">
      <div className="max-w-2xl mx-auto text-center space-y-8">
        {/* Hero */}
        <div>
          <h2 className="text-3xl lg:text-4xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            🚀 Level Up Your Productivity
          </h2>
          <p className="text-xl lg:text-2xl text-slate-700 font-medium max-w-lg mx-auto leading-relaxed">
            Join 25K+ creators getting weekly tips to crush their goals
          </p>
        </div>

        {/* Form - MANDATORY EMAIL INPUT */}
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto w-full">
          <div className="flex-1 relative">
            <input
              id="newsletter-email"
              aria-label="Newsletter email"
              type="email"
              required
              placeholder="your.email@example.com"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setEmail(e.target.value);
                setStatus('idle');
                setError('');
              }}
              className={`
                w-full px-6 py-5 lg:py-6 rounded-3xl border-2 bg-white/80 
                shadow-xl focus:outline-none focus:ring-4 focus:ring-indigo-500/30
                transition-all duration-300 text-lg placeholder-slate-500
                ${status === 'error' ? 'border-red-400 ring-2 ring-red-400/30' : 'border-white/50 hover:border-indigo-300'}
                ${status === 'success' ? 'border-green-400 ring-2 ring-green-400/30 bg-green-50/50' : ''}
              `}
            />
            {status === 'error' && (
              <p className="absolute -bottom-6 left-0 text-red-500 text-sm mt-1">
                {error}
              </p>
            )}
          </div>
          
          <Button 
            type="submit" 
            size="lg" 
            className="whitespace-nowrap px-8 lg:px-12 font-bold tracking-wide min-w-[140px]"
            disabled={status === 'submitting'}
          >
            {status === 'submitting' ? (
              <>
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Subscribing...
              </>
            ) : status === 'success' ? (
              '✅ Joined!'
            ) : (
              'Get Started'
            )}
          </Button>
        </form>

        {/* Success Message */}
        {status === 'success' && (
          <div className="glass p-6 rounded-2xl bg-green-50/50 border border-green-200/50 animate-slide-up">
            <p className="text-lg font-semibold text-green-800">
              🎉 Welcome aboard! Check your inbox for your first tip.
            </p>
          </div>
        )}

        {/* Social Proof */}
        <div className="flex items-center justify-center gap-8 text-sm text-slate-600 flex-wrap">
          <span>🧑‍💻 Used by 25K+ creators</span>
          <span>•</span>
          <span>✨
            4.9/5 average rating on Product Hunt  
          </span>
        </div>
      </div>
    </section>
  );
}

export default NewsLetter;