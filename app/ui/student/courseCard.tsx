import Link from 'next/link';
import Image from 'next/image';

type Course = {
    course_id: string;
    course_name: string;
    lecturer_name: string;
    course_image: string | null;
  };

export default function CourseCard({ course }: { course: Course }) {
  return (
    <Link
      href={`/dashboard/course/view-course/${course.course_id}`}
      key={course.course_id}
      className="card border border-slate-300 p-5 shadow-lg transition-transform transform hover:scale-105 w-full md:w-72 h-60 flex flex-col justify-between">
      <div className="card-image relative w-full h-40 rounded overflow-hidden">
        <Image
          src={course.course_image ? `${course.course_image}?sp=r&st=2024-10-11T12:56:23Z&se=2024-10-25T20:56:23Z&spr=https&sv=2022-11-02&sr=c&sig=noC4IBN0mkEtULvu5GIxxYm2ZgrHn6aBZY2Kys%2Fw3Uw%3D` : '/dashboard/courses/1.jpg'}
          alt={course.course_name}
          fill
          style={{ objectFit: 'cover' }}
          className="rounded"
        />
      </div>
      <div className="card-details mt-2">
        <p className="text-md font-semibold text-slate-800 text-left">{course.course_name}</p>
        <p className="text-xs text-slate-500 text-left">{course.lecturer_name}</p>
      </div>
      <div className="card-footer text-left mt-2">
        <p className="text-sm flex justify-start gap-2">
          4 <span className="text-slate-300">credits</span>
        </p>
      </div>
    </Link>
  );
}
