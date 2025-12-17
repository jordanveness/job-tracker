import { X, Trash2, ExternalLink } from 'lucide-react';
import { Job, JobStatus, COLUMNS } from '@/types';

interface JobDetailModalProps {
  job: Job;
  onClose: () => void;
  onDelete: (jobId: string) => void;
  onUpdateStatus: (jobId: string, status: JobStatus) => void;
}

export function JobDetailModal({
  job,
  onClose,
  onDelete,
  onUpdateStatus,
}: JobDetailModalProps) {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-3 sm:p-4 z-50 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-white border border-gray-300 max-w-2xl w-full my-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4 border-b pb-4">
            <h2 className="text-xl font-semibold">{job.company}</h2>
            <div className="flex gap-3">
              <button
                onClick={() => onDelete(job.id)}
                className="p-1 text-gray-900 hover:text-red-600"
              >
                <Trash2 className="w-5 h-5" />
              </button>
              <button
                onClick={onClose}
                className="p-1 text-gray-900 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-gray-600">{job.role}</p>

            <div>
              <div className="text-sm font-medium mb-2">Status</div>
              <select
                value={job.status}
                onChange={(e) => onUpdateStatus(job.id, e.target.value as JobStatus)}
                className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-gray-900"
              >
                {COLUMNS.map((col) => (
                  <option key={col.id} value={col.id}>
                    {col.label}
                  </option>
                ))}
              </select>
            </div>

            {job.jobUrl && (
              <a
                href={job.jobUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline flex items-center gap-2"
              >
                <ExternalLink className="w-4 h-4" />
                View Posting
              </a>
            )}

            {job.salary && job.salary !== 'Not specified' && (
              <div>
                <strong>Salary:</strong> {job.salary}
              </div>
            )}

            {job.recruiterName && (
              <div>
                <strong>Recruiter:</strong> {job.recruiterName}
              </div>
            )}

            {job.interviewDate && (
              <div>
                <strong>Interview Date:</strong> {job.interviewDate}
              </div>
            )}

            {job.notes && (
              <div>
                <strong>Notes:</strong>
                <p className="mt-1 text-gray-600">{job.notes}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
