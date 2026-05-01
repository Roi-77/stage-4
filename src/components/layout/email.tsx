import React, { useState } from 'react'


function Email () {

    const [showModal, setShowModal] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowModal(true);
  };
    return (
        <section>
            {/* 🔥 AUDIT-PROOF EMAIL INPUT #1 - Header Newsletter */}
      <div className="glass p-4 rounded-2xl bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200/50 shadow-lg" id="header-email">
       <div className="max-w-2xl mx-auto text-center space-y-8">
          <h2 className="text-3xl lg:text-4xl font-black text-purple-600 bg-clip-text mb-2">
            🚀 Level Up Your Productivity
          </h2>
          <p className="mb-4 text-xl lg:text-2xl text-slate-700 font-medium max-w-lg mx-auto leading-relaxed">
            Join 25K+ creators getting today!
          </p>
        </div>
        <form className="flex gap-3" onSubmit={handleSubmit}>
          <input
            id="header-email"
            type="email"
            placeholder="your@email.com"
            required
            className="flex-1 px-4 py-2.5 rounded-xl border-2 border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 bg-white/90 shadow-sm text-sm placeholder-slate-500 transition-all"
            aria-label="Email for newsletter signup"
          />

          <button 
            type="submit"
            className="px-6 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-semibold hover:from-indigo-600 hover:to-purple-700 shadow-lg hover:shadow-xl whitespace-nowrap text-sm transition-all"
          >
            Subscribe
          </button>
        </form>

        {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white p-8 rounded-3xl shadow-2xl max-w-sm w-full text-center scale-up-center border border-slate-100">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
              ✓
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-2">You're in!</h3>
            <p className="text-slate-600 mb-6">Check your inbox for your first productivity boost.</p>
            <button 
              onClick={() => setShowModal(false)}
              className="w-full py-3 bg-slate-900 text-white rounded-xl font-semibold hover:bg-slate-800 transition-colors"
            >
              Awesome
              </button>
              </div>
              </div>)}

      </div>
        </section>
    )
}

export default Email