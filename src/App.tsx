import { TaskProvider } from './context/taskContext';
import Header from './components/layout/header';
import TaskList from './components/features/taskList';
import NewsLetter from './components/layout/newsLetter';
import './index.css';

function AppContent() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Header />
      <TaskList />
      <section className="max-w-6xl mx-auto px-6 lg:px-8 pb-24 lg:pb-32">
        <NewsLetter />
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