'use client';
import { useEffect, useState } from 'react';
import { getStudentProfile ,getEnrolledProgramCourse} from '@/app/api/student/data';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useForm, Controller, FieldError, useFieldArray } from "react-hook-form"
import { EditProfilePictureSchema } from "@/app/lib/zod-schema";
import { set,z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from 'next/link';
import React from "react";

type FormValues = z.infer<typeof EditProfilePictureSchema>;

type StudentProfile = {
  student_id: string;
  name: string;
  program: string;
  email: string;
  password: string; // Consider not exposing this
  student_image: string;
};

type GroupedCourses = {
  [key: string]: Course[];
};

type Course = {
  course_name: string;
  year: number;
  semester: number;
};

const groupCoursesBySemester = (courses: Course[]) => {
  return courses.reduce((acc: GroupedCourses, course: Course) => {
      const key = `Year ${course.year} - Semester ${course.semester}`;
      if (!acc[key]) {
          acc[key] = [];
      }
      acc[key].push(course);
      return acc;
  }, {});
};

export default function StudentProfile() {
  const [error, setError] = useState<string | null>(null);
  const [studentData, setStudentData] = useState<StudentProfile | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [groupedProgramCoursesPrev, setGroupedProgramCoursesPrev] = useState<GroupedCourses>({});
  const router = useRouter();

  const { control, handleSubmit, formState: { errors }, reset } = useForm<FormValues>({
    resolver: zodResolver(EditProfilePictureSchema),
    mode: 'onTouched',
    defaultValues: {
      image: null,
    }
  });


  const onSubmit = async (data: FormValues) => {
    setIsUploadingImage(true);
    if (!data.image) return; 

    try {
      const formData = new FormData();
      formData.append('image', data.image[0]);
      // Implement your image upload logic here
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setIsUploadingImage(false);
      setShowModal(false);
    }
  };

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
        const studentID = data.student_id;
        //getting courses
        const previousCoursePesponse = await getEnrolledProgramCourse({student_id:studentID})
        if (!previousCoursePesponse.ok) {
          throw new Error('Failed to fetch courses');
        }
        const enrlledCourses : Course[] = await previousCoursePesponse.json();
        setGroupedProgramCoursesPrev(groupCoursesBySemester(enrlledCourses) );
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>No details to show...</p>;
  return (
    <div className="w-full h-[80vh] mt-14 flex items-center justify-center gap-3 p-4 flex-col">
      


      <div className="w-full p-4 border rounded-lg border-zinc-200 md:w-1/2 flex items-center gap-5 relative">
        <div className='relative w-20 h-20 rounded-full overflow-hidden'>
          <Image
            src={studentData?.student_image || '/dashboard/announcements/user.jpg'}
            alt={studentData?.name || 'User'}
            fill
            style={{ objectFit: 'cover' }}
            className="rounded-full"
          />
        </div>



        <div>
          <p className="font-bold">{studentData?.name || 'No Name Available'}</p>
        </div>
        <div className="h-fit px-2 py-1 flex items-center justify-center gap-1 border rounded-md border-slate-300 cursor-pointer absolute top-4 right-4" onClick={() => setShowModal(true)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="currentColor" className="bi bi-pen" viewBox="0 0 16 16">
            <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z" />
          </svg>
          <p className="text-sm text-slate-600">Edit</p>
        </div>
      </div>
      <div className="w-full p-4 border rounded-lg border-zinc-200 md:w-1/2">
        <div className="w-full flex justify-between">
          <p className="font-bold mb-6">Personal details</p>
        </div>
        <ul>
          <li className="w-full flex gap-3 flex-wrap">
            <p className="text-sm w-72 mb-3 text-slate-600">Name</p>
            <p className="text-sm ml-3 text-slate-600">{studentData?.name || 'N/A'}</p>
          </li>
          <li className="w-full flex gap-3 flex-wrap">
            <p className="text-sm w-72 mb-3 text-slate-600">ID</p>
            <p className="text-sm ml-3 text-slate-600">MA23125834</p>
          </li>
          <li className="w-full flex gap-3 flex-wrap">
            <p className="text-sm w-72 mb-3 text-slate-600">Email</p>
            <p className="text-sm ml-3 text-slate-600">{studentData?.email || 'N/A'}</p>
          </li>
          <li className="w-full flex gap-3 flex-wrap">
            <p className="text-sm w-72 mb-3 text-slate-600">Program</p>
            <p className="text-sm ml-3 text-slate-600">{studentData?.program || 'N/A'}</p>
          </li>
          <li className="w-full flex flex-col gap-3">
            <p className="text-sm w-72 mb-1  font-bold mt-3">Completed courses</p>
            {Object.keys(groupedProgramCoursesPrev).length === 0 ? (
              <p className="text-sm ml-3 text-gray-500">No courses available.</p>
            ) : (
              <div className="flex flex-col gap-2">
                {Object.keys(groupedProgramCoursesPrev).map((semesterKey) => (
                  <div key={semesterKey} className="w-full mb-3">
                    <p className="text-sm  text-slate-600">
                      {semesterKey}
                    </p>
                    <ul className="ml-5 list-disc">
                      {groupedProgramCoursesPrev[semesterKey].map((course, index) => (
                        <li key={index} className="text-sm text-slate-600">
                          {course.course_name}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </li>
        </ul>
        <div className="w-full flex items-center justify-center gap-7 mt-10 p-4 flex-row">
        <Link href={`/dashboard/student-profile/change-email`} className="h-fit px-2 py-1 flex items-center hover:bg-black hover:text-white justify-center gap-1 border rounded-md border-slate-300 cursor-pointer top-4 right-4 w-60 text-sm text-slate-600">
            change email
         </Link>
         <Link href={`/dashboard/student-profile/change-password`} className="h-fit px-2 py-1 flex items-center hover:bg-black hover:text-white  justify-center gap-1 border rounded-md border-slate-300 cursor-pointer top-4 right-4 w-60 text-sm text-slate-600">
              change passsword
         </Link>
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md w-96">
            <h2 className="text-lg font-bold mb-4">Edit Profile Picture</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Controller
                name="image"
                control={control}
                render={({ field }) => (
                    <>
                      <div className="flex items-center p-2 border border-zinc-200 rounded-md">
                        <input
                            type="file"
                            id="file"
                            className="ml-2 text-black flex-1 outline-none text-sm"
                            onChange={(e) => field.onChange(e.target.files)}
                            onBlur={field.onBlur}
                            ref={field.ref}
                            />
                            </div>
                            {errors.image &&
                              <div className="flex gap-2 items-center mt-2">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#CD3C16" className="bi bi-exclamation-circle" viewBox="0 0 16 16">
                                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                                      <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z"/>
                                  </svg>
                                  <p className="text-red-600 text-sm">{(errors.image as FieldError)?.message || 'An error occurred'}</p>
                              </div>
                            }
                      </>
                    
                )}
              />
              <div className="flex justify-end">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-300 rounded-md mr-2"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md"
                  disabled={isUploadingImage}
                >
                  {isUploadingImage ? 'Uploading...' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}



//         <div className="w-full h-[80vh] flex items-center justify-center gap-3 p-4 flex-col">
//                     <p className="font-bold">{lecturer?.lecturer_name}</p>
//                     <p className="mt-1 text-sm text-slate-600">{lecturer?.lecturer_email}</p>
//                     <p className="mt-1 text-sm text-slate-600">{lecturer?.lecturer_phone}</p>
//                 </div>
//                 <div className="h-fit px-2 py-1 flex items-center justify-center gap-1 border rounded-md border-slate-300 cursor-pointer absolute top-4 right-4" onClick={() => setShowModal(true)}>
//                     <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="currentColor" className="bi bi-pen" viewBox="0 0 16 16">
//                         <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z"/>
//                     </svg>
//                     <p className="text-sm text-slate-600">Edit</p>
//                 </div>
//             </div>
//             <div className="w-full p-4 border rounded-lg border-zinc-200 md:w-1/2">
//                 <div className="w-full flex justify-between">
//                     <p className="font-bold mb-6">Personal details</p>
//                     <div className="h-fit px-2 py-1 flex items-center justify-center gap-1 border rounded-md border-slate-300 cursor-pointer">
//                         <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="currentColor" className="bi bi-pen" viewBox="0 0 16 16">
//                             <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z"/>
//                         </svg>
//                         <p className="text-sm text-slate-600">Edit</p>
//                     </div>
//                 </div>
//                 <ul>
//                     <li className="w-full flex gap-3 flex-wrap">
//                         <p className="text-sm w-72 mb-3 text-slate-600">Name</p>
//                         <p className="text-sm ml-3 text-slate-600">{lecturer?.lecturer_name}</p>
//                     </li>
//                     <li className="w-full flex gap-3 flex-wrap">
//                         <p className="text-sm w-72 mb-3 text-slate-600">NIC</p>
//                         <p className="text-sm ml-3 text-slate-600">{lecturer?.lecturer_nic}</p>
//                     </li>
//                     <li className="w-full flex gap-3 flex-wrap">
//                         <p className="text-sm w-72 mb-3 text-slate-600">Phone</p>
//                         <p className="text-sm ml-3 text-slate-600">{lecturer?.lecturer_phone}</p>
//                     </li>
//                     <li className="w-full flex gap-3 flex-wrap">
//                         <p className="text-sm w-72 text-slate-600">Email</p>
//                         <p className="text-sm ml-3 text-slate-600">{lecturer?.lecturer_email}</p>
//                     </li>
//                 </ul>
//             </div>
//             {showModal && (
//                 <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//                     <div className="bg-white p-6 rounded-md w-96">
//                         <h2 className="text-lg font-bold mb-4">Edit Profile Picture</h2>
//                     </div>
//                 </div>
//             )}
//         </div>