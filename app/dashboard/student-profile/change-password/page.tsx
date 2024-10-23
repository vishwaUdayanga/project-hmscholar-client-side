'use client'

import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation';
import { updateStudentPassword } from '@/app/api/student/update'
import getStudentProfile from '@/app/api/student/data';

interface StudentProfile {
  email: string;
  password: string;
  student_id: string;
}

const UpdatePasswordSchema = z.object({
  currentPassword: z.string().min(10, "Current password is required"),
  newPassword: z.string().min(10, "New password is required"),
  confirmPassword: z.string().min(10, "Confirm password is required"),
}).refine(data => data.newPassword === data.confirmPassword, {
  message: "New password and confirm password must match",
  path: ["confirmPassword"], 
});

type FormValues = z.infer<typeof UpdatePasswordSchema>;

export default function UpdatePasswordForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [buttonText, setButtonText] = useState("Update Password");
  const [currentID, setCurrentID] = useState<string>("null");

  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(UpdatePasswordSchema),
    mode: 'onTouched',
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    }
  });

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/lecturer/login');
        return;
      }
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      const email = decodedToken.sub;

      try {
        const response = await getStudentProfile({ email });
        if (!response.ok) {
          throw new Error('Failed to fetch student profile');
        }
        const data: StudentProfile = await response.json();
        setCurrentID(data.student_id);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching student profile:', error);
      }
    };
    fetchProfile();
  }, [router]);

  // Handle form submission
  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    setButtonText('Updating...');

    const response = await updateStudentPassword({
      student_id: currentID,
      old_password: data.currentPassword,
      new_password: data.newPassword
    });

    if (response.ok) {
      setButtonText('Password Updated. Login Again');
      alert('Password updated successfully');
      router.push('/');
    } else {
      setIsLoading(false);
      setButtonText('Update Password');
      alert('Error updating password');
    }
  };

  return (
    <form className='w-11/12' onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4">
        <h1 className="font-bold text-xl mb-3">Change Password</h1>
        <label htmlFor="currentPassword" className="block text-zinc-500 mb-1 text-sm sm:text-base">
          Current Password
        </label>
        <div className="flex items-center p-2 border border-slate-600 rounded-md">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-lock" viewBox="0 0 16 16">
            <path d="M8 1a3 3 0 0 0-3 3v3H2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3V4a3 3 0 0 0-3-3zM5 4a3 3 0 0 1 6 0v3H5V4zm8 5v8H3V9h10z"/>
          </svg>
          <Controller
            name="currentPassword"
            control={control}
            render={({ field }) => (
              <input
                type="password"
                id="currentPassword"
                placeholder="Enter your current password"
                className="ml-2 text-black flex-1 outline-none text-sm sm:text-base"
                {...field}
              />
            )}
          />
        </div>
        {errors.currentPassword && (
          <div className="flex gap-2 items-center mt-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#CD3C16" className="bi bi-exclamation-circle" viewBox="0 0 16 16">
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
              <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z"/>
            </svg>
            <p className="text-red-600 text-sm">{errors.currentPassword.message}</p>
          </div>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="newPassword" className="block text-zinc-500 mb-1 text-sm sm:text-base">
          New Password
        </label>
        <div className="flex items-center p-2 border border-slate-600 rounded-md">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-key" viewBox="0 0 16 16">
            <path d="M11.5 6a3.5 3.5 0 1 0-7 0 3.5 3.5 0 0 0 7 0zm-4 0a.5.5 0 1 1 1 0 .5.5 0 0 1-1 0zM8 5.5a.5.5 0 0 1 1 0v1a.5.5 0 0 1-1 0v-1zM14 8a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h1v-1h6v1h1a2 2 0 0 0 2-2V8z"/>
          </svg>
          <Controller
            name="newPassword"
            control={control}
            render={({ field }) => (
              <input
                type="password"
                id="newPassword"
                placeholder="Enter new password"
                className="ml-2 text-black flex-1 outline-none text-sm sm:text-base"
                {...field}
              />
            )}
          />
        </div>
        {errors.newPassword && (
          <div className="flex gap-2 items-center mt-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#CD3C16" className="bi bi-exclamation-circle" viewBox="0 0 16 16">
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
              <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z"/>
            </svg>
            <p className="text-red-600 text-sm">{errors.newPassword.message}</p>
          </div>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="confirmPassword" className="block text-zinc-500 mb-1 text-sm sm:text-base">
          Confirm New Password
        </label>
        <div className="flex items-center p-2 border border-slate-600 rounded-md">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-key" viewBox="0 0 16 16">
            <path d="M11.5 6a3.5 3.5 0 1 0-7 0 3.5 3.5 0 0 0 7 0zm-4 0a.5.5 0 1 1 1 0 .5.5 0 0 1-1 0zM8 5.5a.5.5 0 0 1 1 0v1a.5.5 0 0 1-1 0v-1zM14 8a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h1v-1h6v1h1a2 2 0 0 0 2-2V8z"/>
          </svg>
          <Controller
            name="confirmPassword"
            control={control}
            render={({ field }) => (
              <input
                type="password"
                id="confirmPassword"
                placeholder="Confirm new password"
                className="ml-2 text-black flex-1 outline-none text-sm sm:text-base"
                {...field}
              />
            )}
          />
        </div>
        {errors.confirmPassword && (
          <div className="flex gap-2 items-center mt-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#CD3C16" className="bi bi-exclamation-circle" viewBox="0 0 16 16">
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
              <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z"/>
            </svg>
            <p className="text-red-600 text-sm">{errors.confirmPassword.message}</p>
          </div>
        )}
      </div>

      <button 
        type="submit" 
        className={`w-full py-2 px-4 rounded-md text-white border hover:border-black hover:text-black ${isLoading ? 'bg-gray-400' : 'bg-black hover:bg-white'}`} 
        disabled={isLoading}
      >
        {buttonText}
      </button>
    </form>
  );
}
