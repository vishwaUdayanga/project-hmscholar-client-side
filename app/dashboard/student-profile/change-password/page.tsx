'use client'

import Link from 'next/link'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation';
import { updateStudentPassword } from '@/app/api/student/update'
import {getStudentProfile} from '@/app/api/student/data';

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
        router.push('');
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
  }, []);

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
<form className='max-w-lg mx-auto bg-white  border border-slate-300 rounded-lg p-6' onSubmit={handleSubmit(onSubmit)}>
  <div className="mb-6">
    <h1 className="font-semibold text-2xl text-gray-700 mb-4">Change Password</h1>

    {/* Current Password */}
    <label htmlFor="currentPassword" className="block text-gray-600 mb-2 text-sm">
      Current Password
    </label>
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="text-gray-400" viewBox="0 0 16 16">
          <path d="M8 1a3 3 0 0 0-3 3v3H2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3V4a3 3 0 0 0-3-3zM5 4a3 3 0 0 1 6 0v3H5V4zm8 5v8H3V9h10z"/>
        </svg>
      </div>
      <Controller
        name="currentPassword"
        control={control}
        render={({ field }) => (
          <input
            type="password"
            id="currentPassword"
            placeholder="Enter your current password"
            className="block w-full pl-10 pr-4 py-2 text-gray-700 border"
            {...field}
          />
        )}
      />
    </div>
    {errors.currentPassword && (
      <div className="mt-2 text-red-500 text-sm flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#CD3C16" className="mr-1" viewBox="0 0 16 16">
          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
          <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z"/>
        </svg>
        <p>{errors.currentPassword.message}</p>
      </div>
    )}
  </div>

  {/* New Password */}
  <div className="mb-6">
    <label htmlFor="newPassword" className="block text-gray-600 mb-2 text-sm">
      New Password
    </label>
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="text-gray-400" viewBox="0 0 16 16">
          <path d="M11.5 6a3.5 3.5 0 1 0-7 0 3.5 3.5 0 0 0 7 0zm-4 0a.5.5 0 1 1 1 0 .5.5 0 0 1-1 0zM8 5.5a.5.5 0 0 1 1 0v1a.5.5 0 0 1-1 0v-1zM14 8a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h1v-1h6v1h1a2 2 0 0 0 2-2V8z"/>
        </svg>
      </div>
      <Controller
        name="newPassword"
        control={control}
        render={({ field }) => (
          <input
            type="password"
            id="newPassword"
            placeholder="Enter your new password"
            className="block w-full pl-10 pr-4 py-2 text-gray-700 border"
            {...field}
          />
        )}
      />
    </div>
    {errors.newPassword && (
      <div className="mt-2 text-red-500 text-sm flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#CD3C16" className="mr-1" viewBox="0 0 16 16">
          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
          <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z"/>
        </svg>
        <p>{errors.newPassword.message}</p>
      </div>
    )}
  </div>

  {/* Confirm Password */}
  <div className="mb-6">
    <label htmlFor="confirmPassword" className="block text-gray-600 mb-2 text-sm">
      Confirm New Password
    </label>
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="text-gray-400" viewBox="0 0 16 16">
          <path d="M11.5 6a3.5 3.5 0 1 0-7 0 3.5 3.5 0 0 0 7 0zm-4 0a.5.5 0 1 1 1 0 .5.5 0 0 1-1 0zM8 5.5a.5.5 0 0 1 1 0v1a.5.5 0 0 1-1 0v-1zM14 8a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h1v-1h6v1h1a2 2 0 0 0 2-2V8z"/>
        </svg>
      </div>
      <Controller
        name="confirmPassword"
        control={control}
        render={({ field }) => (
          <input
            type="password"
            id="confirmPassword"
            placeholder="Confirm new password"
            className="block w-full pl-10 pr-4 py-2 text-gray-700 border"
            {...field}
          />
        )}
      />
    </div>
    {errors.confirmPassword && (
      <div className="mt-2 text-red-500 text-sm flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#CD3C16" className="mr-1" viewBox="0 0 16 16">
          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
          <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z"/>
        </svg>
        <p>{errors.confirmPassword.message}</p>
      </div>
    )}
  </div>
  <div className="w-full flex items-center justify-center gap-7 mt-10 p-4 flex-row">
  <Link href="/dashboard/student-profile" className="h-fit px-2 py-1 flex items-center hover:bg-black hover:text-white  justify-center gap-1 border rounded-md border-slate-300 cursor-pointer top-4 right-4 w-60 text-sm text-slate-600">
  go back
  </Link>
  <button
    type="submit"
    className="h-fit px-2 py-1 flex items-center hover:bg-black hover:text-white  justify-center gap-1 border rounded-md border-slate-300 cursor-pointer top-4 right-4 w-60 text-sm text-slate-600"
  >
    update password
  </button>
  </div>
</form>

  );
}
