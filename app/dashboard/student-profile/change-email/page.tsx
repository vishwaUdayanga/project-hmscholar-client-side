'use client'

import Link from 'next/link'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation';
import {updateStudentEmail} from '@/app/api/student/update'
import {getStudentProfile} from '@/app/api/student/data';


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
    <form className='max-w-lg mx-auto bg-white  border border-slate-300 rounded-lg p-6' onSubmit={handleSubmit(onSubmit)}>
              <h1 className="font-bold text-xl mb-3">Change Email</h1>
      <div className="mb-4 ">
        <label htmlFor="current_email" className="block text-zinc-500 mb-1 text-sm sm:text-base">
          Current Email
        </label>
        <div className="flex items-center p-2 border border-slate-600 rounded-md bg-gray-100">
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
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your new email"
                  className="ml-2 text-slate-600 flex-1 outline-none text-sm sm:text-base"
                  {...field}
                />
              </div>
              {errors.email && (
                <div className="flex gap-2 items-center mt-2">
                  <svg xmlns="http://www.w3.org/2       000/svg" width="16" height="16" fill="#CD3C16" className="bi bi-exclamation-circle" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                    <path d ="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 4.995a.905.9   05 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z"/>
                  </svg>                               
                  <p className="text-red-600 text-sm">{errors.email.message}</p>
                </div>
              )}
            </>
          )}
        />
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
