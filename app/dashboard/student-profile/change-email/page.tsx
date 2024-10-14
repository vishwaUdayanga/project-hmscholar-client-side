'use client'

import Link from 'next/link'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation';
import { updateStudentEmail } from '@/app/api/student/update'
import { getStudentProfile } from '@/app/api/student/data';
import React from 'react'
import { useForm } from "react-hook-form"

// Schema for new email validation
type StudentProfile = {
  student_id: string;
  name: string;
  program: string;
  email: string;
  password: string; // Consider not exposing this
  student_image: string;
};

const UpdateEmailSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type FormValues = z.infer<typeof UpdateEmailSchema>;

export default function UpdateEmailForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [buttonText, setButtonText] = useState("Update Email");
  const [currentID, setCurrentID] = useState<string>("null");
  const [currentEmail, setCurrentEmail] = useState<string>("null");

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(UpdateEmailSchema),
    mode: 'onTouched',
    defaultValues: {
      email: '', 
    }
  });

  useEffect(() => {
    const fetchEmail = async () => {
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
        setCurrentEmail(data.email);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching student profile:', error);
      }
    };
    fetchEmail();
  }, []);
  

  // Handle form submission
  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    setButtonText('Updating...');
    
    const response = await updateStudentEmail({ student_id: currentID, new_email: data.email });

    if (response.ok) {
      setButtonText('Email Updated. Login again');
      alert('Email updated successfully');
      router.push('/');
    } else {
      setIsLoading(false);
      setButtonText('Update Email');
      alert('Error updating email');
    }
  };

  return (
    <form className='max-w-lg mx-auto bg-white border border-slate-300 rounded-lg p-6' onSubmit={handleSubmit(onSubmit)}>
      <h1 className="font-bold text-xl mb-3">Change Email</h1>

      {/* Current Email Display */}
      <div className="mb-4">
        <label htmlFor="current_email" className="block text-zinc-500 mb-1 text-sm sm:text-base">
          Current Email
        </label>
        <div className="flex items-center p-2 border border-slate-600 rounded-md bg-gray-100">
          <p className="ml-2 text-black text-sm sm:text-base">
            {isLoading ? "Loading..." : currentEmail}
          </p>
        </div>
      </div>

      {/* New Email Input Field */}
      <div className="mb-4">
        <label htmlFor="email" className="block text-zinc-500 mb-1 text-sm sm:text-base">
          New Email
        </label>
        <input 
          type="email"
          id="email"
          {...register('email')}
          className={`w-full p-2 border ${errors.email ? 'border-red-500' : 'border-slate-300'} rounded-md`}
          placeholder="Enter your new email"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <div className="w-full flex items-center justify-center gap-7 mt-10 p-4 flex-row">
        <Link href="/dashboard/student-profile" className="h-fit px-2 py-1 flex items-center hover:bg-black hover:text-white justify-center gap-1 border rounded-md border-slate-300 cursor-pointer w-60 text-sm text-slate-600">
          Go Back
        </Link>
        <button
          type="submit"
          className="h-fit px-2 py-1 flex items-center hover:bg-black hover:text-white justify-center gap-1 border rounded-md border-slate-300 cursor-pointer w-60 text-sm text-slate-600"
        >
          {buttonText}
        </button>
      </div>
    </form>
  );
}
