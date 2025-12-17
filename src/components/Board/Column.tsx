import { Job, Column as ColumnType, JobStatus } from '@/types';
import { JobCard } from './JobCard';

interface ColumnProps {
  column: ColumnType;
  jobs: Job[];
  onSelectJob: (job: Job) => void;
  onDeleteJob: (jobId: string) => void;
  onDragStart: (e: React.DragEvent, job: Job) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent, status: JobStatus) => void;
}

export function Column({
  column,
  jobs,
  onSelectJob,
  onDeleteJob,
  onDragStart,
  onDragOver,
  onDrop,
}: ColumnProps) {
  const columnJobs = jobs.filter((job) => job.status === column.id);

  return (
    <div
      className="bg-white border border-gray-200 w-64 sm:w-72 flex-shrink-0"
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(e, column.id)}
    >
      <div className={`${column.color} px-3 sm:px-4 py-3 border-b border-gray-200`}>
        <h2 className="font-medium text-sm sm:text-base text-gray-800">
          {column.label}
        </h2>
        <div className="text-xs text-gray-600 mt-1">{columnJobs.length} jobs</div>
      </div>

      <div className="p-2 sm:p-3 space-y-2 sm:space-y-3 max-h-96 overflow-y-auto">
        {columnJobs.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            onSelect={onSelectJob}
            onDelete={onDeleteJob}
            onDragStart={onDragStart}
          />
        ))}
      </div>
    </div>
  );
}
