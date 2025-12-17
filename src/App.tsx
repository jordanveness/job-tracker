import { useState } from 'react';
import { Search, Plus, LogOut } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useJobs } from '@/hooks/useJobs';
import { Job, JobStatus, JobFormData } from '@/types';
import { SignIn } from '@/components/Auth/SignIn';
import { StatsBar } from '@/components/Stats/StatsBar';
import { Board } from '@/components/Board/Board';
import { AddJobModal } from '@/components/Modals/AddJobModal';
import { JobDetailModal } from '@/components/Modals/JobDetailModal';

function App() {
  const { user, loading: authLoading, signInWithGoogle, signOut } = useAuth();
  const { jobs, loading: jobsLoading, addJob, updateJob, deleteJob, getStats, getFilteredJobs } = useJobs(user);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <SignIn onSignIn={signInWithGoogle} />;
  }

  if (jobsLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-gray-600">Loading your job tracker...</div>
      </div>
    );
  }

  const stats = getStats();
  const filteredJobs = getFilteredJobs(searchTerm);

  const handleAddJob = async (data: JobFormData) => {
    await addJob(data);
    setShowAddModal(false);
  };

  const handleDeleteJob = async (jobId: string) => {
    await deleteJob(jobId);
    if (selectedJob?.id === jobId) {
      setSelectedJob(null);
    }
  };

  const handleUpdateStatus = async (jobId: string, status: JobStatus) => {
    await updateJob(jobId, { status });
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto p-3 sm:p-6 mb-4 sm:mb-6">
        <div className="bg-white border border-gray-200 p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-4">
              <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">
                Job Search Tracker
              </h1>
              {user.photoURL && (
                <img
                  src={user.photoURL}
                  alt="Profile"
                  className="w-8 h-8 rounded-full"
                />
              )}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowAddModal(true)}
                className="flex items-center justify-center gap-2 bg-gray-900 text-white px-4 py-2 hover:bg-gray-700 transition"
              >
                <Plus className="w-4 h-4" />
                Add Job
              </button>
              <button
                onClick={signOut}
                className="flex items-center gap-2 border border-gray-300 px-4 py-2 hover:bg-gray-100 transition"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Sign Out</span>
              </button>
            </div>
          </div>

          <StatsBar stats={stats} />

          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 focus:outline-none focus:border-gray-900"
            />
          </div>
        </div>
      </div>

      <Board
        jobs={filteredJobs}
        onSelectJob={setSelectedJob}
        onDeleteJob={handleDeleteJob}
        onUpdateJob={updateJob}
      />

      {showAddModal && (
        <AddJobModal
          onClose={() => setShowAddModal(false)}
          onSubmit={handleAddJob}
        />
      )}

      {selectedJob && (
        <JobDetailModal
          job={selectedJob}
          onClose={() => setSelectedJob(null)}
          onDelete={handleDeleteJob}
          onUpdateStatus={handleUpdateStatus}
        />
      )}
    </div>
  );
}

export default App;
