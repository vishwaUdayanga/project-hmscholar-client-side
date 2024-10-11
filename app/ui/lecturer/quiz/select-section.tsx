import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { getSections } from '@/app/api/lecturer/data';

interface Section {
    section_id: string;
    section_name: string;
}

interface SelectSectionProps {
    onSectionSelect: (selectedSectionId: string) => void,
    currentSectionId: string | null;
    courseId: string;
}

interface SectionFormData {
    section: string;
}

const SelectSection: React.FC<SelectSectionProps> = ({ onSectionSelect, courseId, currentSectionId }) => {
    const [sections, setSections] = useState<Section[]>([]);
    const [selectedSection, setSelectedSection] = useState<string | null>(currentSectionId);
    const { register, handleSubmit, setValue } = useForm<SectionFormData>({
        defaultValues: {
            section: currentSectionId || '',
        },
    });

    useEffect(() => {
        const fetchSections = async () => {
            try {
                const sectionsResponse = await getSections({ courseId });
                if (!sectionsResponse.ok) {
                    throw new Error('Failed to fetch sections');
                }
                const sections: Section[] = await sectionsResponse.json();
                setSections(sections);
            } catch (error) {
                console.error('Error fetching sections:', error);
            }
        };
        fetchSections();
    }, [courseId]);

    useEffect(() => {
        if (currentSectionId) {
            setValue('section', currentSectionId);
        }
    }, [currentSectionId, setValue]);

    const onSubmit: SubmitHandler<SectionFormData> = (data) => {
        setSelectedSection(data.section);
        onSectionSelect(data.section);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full mt-5 flex items-center justify-center flex-col">
            <div className="w-full md:w-8/12">
                <h1 className="text-xl font-semibold">Select a section</h1>
                <p className="text-sm text-slate-500">Select a section where you need to show the quiz.</p>
                <div className="flex items-center p-2 border border-zinc-200 rounded-md mt-4">
                    <select {
                        ...register('section')} 
                        required 
                        className='w-full outline-none'
                        value={selectedSection || ''}
                        onChange={(e) => setSelectedSection(e.target.value)}>
                        <option value="" disabled>
                            {sections.length === 0 ? 'Loading sections...' : 'Select a section'}
                        </option>
                        {sections.map(section => (
                            <option key={section.section_id} value={section.section_id} className='style-none'>
                                {section.section_name}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit" className='bg-blue-600 text-white px-5 py-1 mt-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-opacity-50 text-sm sm:text-base'>Next</button>
            </div>
        </form>
    );
};

export default SelectSection;
