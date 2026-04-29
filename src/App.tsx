import { TaskProvider } from './context/taskContext';
import Header from './components/layout/header';
import TaskList from './components/features/taskList';
{/*import NewsLetter from './components/layout/newsLetter';*/}
import './index.css';

function AppContent() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Header />
      {/*<div className="max-w-6xl mx-auto px-6 lg:px-8 pt-8">
         EMAIL INPUT #2 - HERO WAITLIST 
        <div className="glass p-8 rounded-3xl mb-12 text-center" id="hero-email">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Join the Waitlist</h2>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto" onSubmit={(e) => {e.preventDefault(); alert('Joined waitlist! 🚀');}}>
            <input
              type="email"
              placeholder="Enter your email..."
              required
              className="flex-1 px-6 py-4 rounded-2xl border-2 border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50"
            />
            <button type="submit" className="px-8 py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 whitespace-nowrap">
              Join Waitlist
            </button>
          </form>
        </div>
  
        <TaskList />
      </div>*/}
      {/*<NewsLetter />*/}
      <TaskList />
      <section className="max-w-6xl mx-auto px-6 lg:px-8 pb-24 lg:pb-32">
      </section>
    </div>
  );
}

function App() {
  return (
    <TaskProvider>
      <AppContent />
    </TaskProvider>
  );
}

export default App;