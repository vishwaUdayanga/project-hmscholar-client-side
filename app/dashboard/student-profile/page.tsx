'use client';
import { useEffect, useState } from 'react';
import {getStudentProfile} from '@/app/api/student/data';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface StudentProfile {
  email: string;
  password: string;
  student_id: string;
}

export default function StudentProfile() {
  const [studentData, setStudentData] = useState<StudentProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const getEmail = async () => {
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
        setStudentData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching student profile:', error);
        // Optionally set an error state here
      }
    };

    getEmail();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-4">
      {studentData ? (
        <div >
            <h1 className="font-bold text-xl">Student profile</h1>
        <div className="flex flex-col md:flex-row items-center bg-white p-6 rounded-lg">
          <div className="relative w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden flex items-center justify-center mb-6 md:mb-0 md:order-last">
            <Image
              src='/dashboard/user.jpg'
              alt='Student Profile Image'
              fill
              style={{ objectFit: 'cover' }}
              className="rounded-full"
            />
          </div>

          <div className="flex flex-col md:w-1/2 md:pl-6">
            <div className="space-y-4 text-center md:text-left mb-4">
              <div>
                <h2 className="text-xl font-semibold">Student number</h2>
                <p className="text-gray-600">{studentData.student_id}</p>
              </div>
              <div>
                <h2 className="text-xl font-semibold">Email</h2>
                <p className="text-gray-600">{studentData.email}</p>
              </div>
              <div>
                <h2 className="text-xl font-semibold">Enrolled courses</h2>
                <p className="text-gray-600">Management</p>
                <p className="text-gray-600">Management</p>
                <p className="text-gray-600">Management</p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-4">
              <Link href="/dashboard/student-profile/change-email" className="flex items-center justify-center bg-black text-white px-4 py-2 rounded-md hover:bg-white hover:text-black text-center border hover:border-black">Change Email</Link>
              <Link href="/dashboard/student-profile/change-password" className="flex items-center justify-center bg-black text-white px-4 py-2 rounded-md hover:bg-white  hover:text-black text-center border hover:border-black">Change Password</Link>
            </div>
          </div>
        </div>
        </div>
      ) : (
        <p>No student data found.</p>
      )}
    </div>
  );
}
