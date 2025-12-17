import { useState, useEffect } from 'react';
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from 'firebase/firestore';
import { User } from 'firebase/auth';
import { db } from '@/services/firebase';
import { Job, JobFormData, JobStatus, Stats } from '@/types';

export function useJobs(user: User | null) {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setJobs([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const jobsRef = collection(db, 'users', user.uid, 'jobs');
    const q = query(jobsRef, orderBy('dateApplied', 'desc'));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const jobsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Job[];
        setJobs(jobsData);
        setLoading(false);
      },
      (error) => {
        console.error('Error loading jobs:', error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [user]);

  const addJob = async (jobData: JobFormData) => {
    if (!user) return;

    const newJob = {
      ...jobData,
      status: 'applied' as JobStatus,
      dateApplied: new Date().toISOString().split('T')[0],
      createdAt: serverTimestamp(),
    };

    try {
      await addDoc(collection(db, 'users', user.uid, 'jobs'), newJob);
    } catch (error) {
      console.error('Error adding job:', error);
      throw error;
    }
  };

  const updateJob = async (jobId: string, updates: Partial<Job>) => {
    if (!user) return;

    try {
      await updateDoc(doc(db, 'users', user.uid, 'jobs', jobId), updates);
    } catch (error) {
      console.error('Error updating job:', error);
      throw error;
    }
  };

  const deleteJob = async (jobId: string) => {
    if (!user) return;

    try {
      await deleteDoc(doc(db, 'users', user.uid, 'jobs', jobId));
    } catch (error) {
      console.error('Error deleting job:', error);
      throw error;
    }
  };

  const getStats = (): Stats => {
    const total = jobs.length;
    const active = jobs.filter((j) =>
      ['phone-screen', 'first-interview', 'final-interview'].includes(j.status)
    ).length;
    const offers = jobs.filter((j) => j.status === 'offer').length;
    const rejected = jobs.filter((j) => j.status === 'rejected').length;
    const responseRate =
      total > 0
        ? Math.round((jobs.filter((j) => j.status !== 'applied').length / total) * 100)
        : 0;

    return { total, active, offers, rejected, responseRate };
  };

  const getFilteredJobs = (searchTerm: string): Job[] => {
    const term = searchTerm.toLowerCase();
    return jobs.filter(
      (job) =>
        job.company.toLowerCase().includes(term) ||
        job.role.toLowerCase().includes(term) ||
        job.source?.toLowerCase().includes(term) ||
        job.customSource?.toLowerCase().includes(term)
    );
  };

  return {
    jobs,
    loading,
    addJob,
    updateJob,
    deleteJob,
    getStats,
    getFilteredJobs,
  };
}
