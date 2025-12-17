export interface Job {
  id: string;
  company: string;
  role: string;
  status: JobStatus;
  source: string;
  customSource?: string;
  jobUrl: string;
  salary?: string;
  recruiterName?: string;
  contactedRecruiter: boolean;
  applicationDeadline?: string;
  followUpDate?: string;
  interviewDate?: string;
  notes?: string;
  dateApplied: string;
  createdAt?: Date;
}

export type JobStatus =
  | 'applied'
  | 'phone-screen'
  | 'first-interview'
  | 'final-interview'
  | 'offer'
  | 'rejected'
  | 'not-pursuing';

export interface Column {
  id: JobStatus;
  label: string;
  color: string;
}

export interface Stats {
  total: number;
  active: number;
  offers: number;
  rejected: number;
  responseRate: number;
}

export interface JobFormData {
  company: string;
  role: string;
  source: string;
  customSource?: string;
  jobUrl: string;
  salary?: string;
  recruiterName?: string;
  contactedRecruiter: boolean;
  applicationDeadline?: string;
  followUpDate?: string;
  interviewDate?: string;
  notes?: string;
}

export const COLUMNS: Column[] = [
  { id: 'applied', label: 'Applied', color: 'bg-blue-50' },
  { id: 'phone-screen', label: 'Phone Screen', color: 'bg-purple-50' },
  { id: 'first-interview', label: 'First Interview', color: 'bg-yellow-50' },
  { id: 'final-interview', label: 'Final Interview', color: 'bg-orange-50' },
  { id: 'offer', label: 'Offer', color: 'bg-green-50' },
  { id: 'rejected', label: 'Rejected', color: 'bg-red-50' },
  { id: 'not-pursuing', label: 'Not Pursuing', color: 'bg-gray-50' },
];

export const JOB_SOURCES = [
  'LinkedIn',
  'Indeed',
  'Welcome to the Jungle',
  'Total Jobs',
  'Reed',
  'CWJobs',
  'Otta',
  'CV-Library',
  'Glassdoor',
  'Other',
];

export const SALARY_RANGES = [
  'Not specified',
  '£20,000 - £29,999',
  '£30,000 - £39,999',
  '£40,000 - £49,999',
  '£50,000 - £59,999',
  '£60,000 - £69,999',
  '£70,000 - £79,999',
  '£80,000 - £89,999',
  '£90,000 - £99,999',
  '£100,000+',
];
