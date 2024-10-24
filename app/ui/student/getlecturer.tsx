'use client';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { getAllLecturerDetails } from '@/app/api/student/data';
import { useEffect, useState } from 'react';

type Lecturer = {
  lecturer_name: string;
  lecturer_phone: string;
  lecturer_email: string;
};

export default function GetLecturer() {
  const [lecturers, setLecturers] = useState<Lecturer[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getLecturerDetails = async () => {
      try {
        const lecturerResponse = await getAllLecturerDetails();
        console.log("me mchn"+lecturerResponse)
        if (!lecturerResponse.ok) {
          setError("Failed to fetch lecturer details");
          return;
        }
        
        const lecturersData = await lecturerResponse.json();
        setLecturers(lecturersData);
      } catch (error) {
        setError("An error occurred while fetching lecturer details");
      }
    };

    getLecturerDetails();
  }, []);

  const generatePDF = async () => {
    const doc = new jsPDF();

    doc.text("Lecturer Details Report", 14, 16);

    const tableColumn = ["Name", "Email", "Phone"];
    const tableRows: any[] = [];

    lecturers.forEach((lecturer) => {
      const lecturerData = [
        lecturer.lecturer_name,
        lecturer.lecturer_email,
        lecturer.lecturer_phone,
      ];
      tableRows.push(lecturerData);
    });

    (doc as any).autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    doc.save("Lecturer_Details.pdf");
  };

  return (
    <div className='w-full flex mt-5'>
      {error && <p className="text-red-500">{error}</p>}
      <button
        onClick={generatePDF}
        className="bg-black  text-white py-2 px-4 rounded"
      >
        Download lecturer details
      </button>
    </div>
  );
}
