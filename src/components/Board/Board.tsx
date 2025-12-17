import { useState } from "react";
import { Job, JobStatus, COLUMNS } from "@/types";
import { Column } from "./Column";

interface BoardProps {
  jobs: Job[];
  onSelectJob: (job: Job) => void;
  onDeleteJob: (jobId: string) => void;
  onUpdateJob: (jobId: string, updates: Partial<Job>) => void;
}

export function Board({
  jobs,
  onSelectJob,
  onDeleteJob,
  onUpdateJob,
}: BoardProps) {
  const [draggedJob, setDraggedJob] = useState<Job | null>(null);

  const handleDragStart = (e: React.DragEvent, job: Job) => {
    setDraggedJob(job);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e: React.DragEvent, status: JobStatus) => {
    e.preventDefault();
    if (draggedJob && draggedJob.status !== status) {
      onUpdateJob(draggedJob.id, { status });
    }
    setDraggedJob(null);
  };

  return (
    <div className="max-w-7xl mx-auto overflow-x-auto px-3 sm:px-6">
      <div
        className="flex gap-3 sm:gap-4 pb-4"
        style={{ minWidth: "max-content" }}
      >
        {COLUMNS.map((column) => (
          <Column
            key={column.id}
            column={column}
            jobs={jobs}
            onSelectJob={onSelectJob}
            onDeleteJob={onDeleteJob}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          />
        ))}
      </div>
    </div>
  );
}
