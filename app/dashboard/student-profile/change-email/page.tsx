'use client'

import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation';
import {updateStudentEmail} from '@/app/api/student/update'
import getStudentProfile from '@/app/api/student/data';


interface StudentProfile {
    email: string;
    password: string;
    student_id: string;
  }

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

  const { control, handleSubmit, formState: { errors } } = useForm({
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
        setCurrentEmail(data.email);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching student profile:', error);
      }
    };
    fetchEmail();
  }, [router]);
  

  // Handle form submission
  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    setButtonText('Updating...');
    
    const response = await updateStudentEmail({student_id:currentID , new_email: data.email});

    if (response.ok) {
      setButtonText('Email Updated.Login again');
      alert('Email updated successfully');
      router.push('/');
    } else {
      setIsLoading(false);
      setButtonText('Update Email');
      alert('Error updating email');
    }
  };

  return (
    <form className='w-11/12' onSubmit={handleSubmit(onSubmit)}>
              <h1 className="font-bold text-xl mb-3">Change Email</h1>
      <div className="mb-4 ">
        <label htmlFor="current_email" className="block text-zinc-500 mb-1 text-sm sm:text-base">
          Current Email
        </label>
        <div className="flex items-center p-2 border border-slate-600 rounded-md bg-gray-100">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-envelope" viewBox="0 0 16 16">
            <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4z"/>
            <path d="M.05 4.555L8 9.293l7.95-4.738A1 1 0 0 0 15 4H1a1 1 0 0 0-.95.555zM16 5.697L8 10.732 0 5.697V12a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V5.697z"/>
          </svg>
          <p className="ml-2 text-black text-sm sm:text-base">
            {(isLoading?"Loading...":currentEmail)}
          </p>
        </div>
      </div>
      
      <div className="mb-4">
        <label htmlFor="email" className="block text-zinc-500 mb-1 text-sm sm:text-base">
          New Email
        </label>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <>
              <div className="flex items-center p-2 border border-slate-600 rounded-md">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                  <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                </svg>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your new email"
                  className="ml-2 text-black flex-1 outline-none text-sm sm:text-base"
                  {...field}
                />
              </div>
              {errors.email && (
                <div className="flex gap-2 items-center mt-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#CD3C16" className="bi bi-exclamation-circle" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                    <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z"/>
                  </svg>
                  <p className="text-red-600 text-sm">{errors.email.message}</p>
                </div>
              )}
            </>
          )}
        />
      </div>
      
      <button
        type="submit"
        className="w-full bg-black text-white py-2 rounded-md hover:bg-white hover:text-black border hover:border-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50 flex items-center justify-center text-sm sm:text-base mt-5"
        disabled={isLoading}
      >
        {buttonText}
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M10.293 15.707a1 1 0 010-1.414L13.586 11H3a1 1 0 110-2h10.586l-3.293-3.293a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </form>
  );
}
