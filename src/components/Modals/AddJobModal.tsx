import { useState } from 'react';
import { X } from 'lucide-react';
import { JobFormData, JOB_SOURCES, SALARY_RANGES } from '@/types';

interface AddJobModalProps {
  onClose: () => void;
  onSubmit: (data: JobFormData) => void;
}

export function AddJobModal({ onClose, onSubmit }: AddJobModalProps) {
  const [formData, setFormData] = useState<JobFormData>({
    company: '',
    role: '',
    source: 'LinkedIn',
    jobUrl: '',
    salary: 'Not specified',
    recruiterName: '',
    contactedRecruiter: false,
    applicationDeadline: '',
    followUpDate: '',
    interviewDate: '',
    notes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let url = formData.jobUrl;
    if (url && !url.match(/^https?:\/\//i)) {
      url = 'https://' + url;
    }
    onSubmit({ ...formData, jobUrl: url });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

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
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-200">
            <h2 className="text-lg sm:text-xl font-semibold">Add New Job</h2>
            <button
              onClick={onClose}
              className="p-1 text-gray-900 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <div className="text-sm font-medium mb-1">Company *</div>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-gray-900"
                  />
                </div>
                <div>
                  <div className="text-sm font-medium mb-1">Role *</div>
                  <input
                    type="text"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-gray-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <div className="text-sm font-medium mb-1">Source *</div>
                  <select
                    name="source"
                    value={formData.source}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-gray-900"
                  >
                    {JOB_SOURCES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <div className="text-sm font-medium mb-1">Job URL *</div>
                  <input
                    type="url"
                    name="jobUrl"
                    value={formData.jobUrl}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-gray-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <div className="text-sm font-medium mb-1">Salary Range</div>
                  <select
                    name="salary"
                    value={formData.salary}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-gray-900"
                  >
                    {SALARY_RANGES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <div className="text-sm font-medium mb-1">Recruiter Name</div>
                  <input
                    type="text"
                    name="recruiterName"
                    value={formData.recruiterName}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-gray-900"
                  />
                </div>
              </div>

              <div className="border border-gray-300 p-3 bg-gray-50">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="contactedRecruiter"
                    checked={formData.contactedRecruiter}
                    onChange={handleChange}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">I have contacted the recruiter</span>
                </label>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <div className="text-sm font-medium mb-1">Application Deadline</div>
                  <input
                    type="date"
                    name="applicationDeadline"
                    value={formData.applicationDeadline}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-gray-900"
                  />
                </div>
                <div>
                  <div className="text-sm font-medium mb-1">Follow-up Date</div>
                  <input
                    type="date"
                    name="followUpDate"
                    value={formData.followUpDate}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-gray-900"
                  />
                </div>
                <div>
                  <div className="text-sm font-medium mb-1">Interview Date</div>
                  <input
                    type="date"
                    name="interviewDate"
                    value={formData.interviewDate}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-gray-900"
                  />
                </div>
              </div>

              <div>
                <div className="text-sm font-medium mb-1">Notes</div>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-gray-900"
                />
              </div>

              <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 pt-3 border-t border-gray-200">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full sm:w-auto px-4 py-2 border border-gray-300 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-4 py-2 bg-gray-900 text-white hover:bg-gray-700"
                >
                  Add Job
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
