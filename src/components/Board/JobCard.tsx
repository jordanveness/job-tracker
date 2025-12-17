import { Trash2, CheckCircle2 } from 'lucide-react';
import { Job } from '@/types';

interface JobCardProps {
  job: Job;
  onSelect: (job: Job) => void;
  onDelete: (jobId: string) => void;
  onDragStart: (e: React.DragEvent, job: Job) => void;
}

export function JobCard({ job, onSelect, onDelete, onDragStart }: JobCardProps) {
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(job.id);
  };

  return (
    <div
      className="bg-white border border-gray-300 p-2.5 sm:p-3 hover:border-gray-900 hover:shadow-md transition-all duration-200 cursor-move relative"
      draggable
      onDragStart={(e) => onDragStart(e, job)}
      onClick={() => onSelect(job)}
    >
      <button
        type="button"
        onClick={handleDelete}
        className="absolute top-1 right-1 p-1 text-gray-900 hover:text-red-600 transition z-10"
        title="Delete job"
      >
        <Trash2 className="w-4 h-4" />
      </button>

      <h3 className="font-medium text-sm sm:text-base text-gray-900 mb-1 pr-10">
        {job.company}
      </h3>
      <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3">{job.role}</p>

      <div className="space-y-1 text-xs text-gray-500">
        <div className="flex items-center justify-between">
          <span className="bg-gray-100 px-2 py-0.5 text-xs">
            {job.source === 'Other' && job.customSource ? job.customSource : job.source}
          </span>
        </div>
        <div>Applied: {job.dateApplied}</div>
        {job.followUpDate && <div>Follow-up: {job.followUpDate}</div>}
      </div>

      {job.contactedRecruiter && (
        <div className="flex items-center gap-1 text-xs text-green-600 mt-2">
          <CheckCircle2 className="w-3 h-3" />
          Contacted recruiter
        </div>
      )}
    </div>
  );
}
