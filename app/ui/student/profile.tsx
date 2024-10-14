import Link from "next/link"
import Image from "next/image"
import { getStudentProfile } from "@/app/api/student/data"
import { useState,useEffect } from "react"
import { useRouter } from 'next/navigation';
import LogoutButton from "./logout";
import { LayoutProfileSkeleton } from "../skeletons";

type StudentProfile = {
    student_id:string
    name: string;
    student_image: string;
  };

export default function Profile(){
    const [studentData, setStudentData] = useState<StudentProfile | null>(null);
    const [error,setError] = useState<string>();
    const [loading,setLoading] = useState<boolean>(true)
    const router = useRouter();

    useEffect(() => {
        const fetchStudent = async () => {
          const token = localStorage.getItem('token');
          if (!token) {
            setError('No token found');
            window.location.href = '';
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
            console.log('Fetched student data:', data); // Debugging line
            setStudentData(data);
          } catch (error) {
            console.error('Error fetching student profile:', error);
            setError('Error fetching profile');
          } finally {
            setLoading(false);
          }
        };
    
        fetchStudent();
      }, [router]);
    

    if (loading) return(
      <div className="flex gap-6 items-center">
      <LogoutButton/>
      <Image src="/dashboard/notification.png" alt="IHMA Notification" width={15} height={15} />
      <LayoutProfileSkeleton/>
  </div>
    ) ;
    if (error) return <p>{error}</p>;
    return(
    <div className="flex gap-6 items-center">
        <LogoutButton/>
        <Image src="/dashboard/notification.png" alt="IHMA Notification" width={15} height={15} />
        <Link
        href="/dashboard/student-profile" 
        className="flex gap-2 items-center"
        >
        <div
            className='relative w-8 h-8 rounded-full overflow-hidden'
        >
            <Image
            src={studentData?.student_image || '/dashboard/announcements/user.jpg'}
            alt={'Amanda Peris'}
            fill
            style={{ objectFit: 'cover' }}
            className="rounded-full"
            />
        </div>
        <p className="text-sm font-bold">{studentData?.name} </p>
        </Link>
    </div>
    )
}