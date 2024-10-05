'use client'

import { useEffect, useState } from "react";
import { getQuiz } from "@/app/api/lecturer/data";
import { updateQuiz } from "@/app/api/lecturer/update";
import clsx from "clsx";
import QuizInfo from "@/app/ui/lecturer/quiz/quiz-info";
import SelectSection from "@/app/ui/lecturer/quiz/select-section";
import QuizQuestions from "@/app/ui/lecturer/quiz/quiz-questions";


interface QuizData {
    quiz_id: string;
    course_id: string;
    quiz_name: string;
    quiz_duration: number;
    quiz_total_marks: number;
    quiz_description: string;
    quiz_password: string;
    quiz_number_of_questions: number;
    section_id: string;
    questions: QuestionData[];
}

interface QuestionData {
    questionText: string;
    questionMarks: number;
    questionType: 'written' | 'mcq';
    answer2?: string;
    answer3?: string;
    answer4?: string;
    correctAnswer?: string;
}

export default function EditQuiz({params} : {params : {id: string}}) {
    const { id } = params;
    const [currentStep, setCurrentStep] = useState<number>(1);
    const [section_id, setSectionId] = useState<string>();
    const [quizData, setQuizData] = useState<QuizData>({
        quiz_id: '',
        course_id: '',
        quiz_name: '',
        quiz_duration: 0,
        quiz_total_marks: 0,
        quiz_description: '',
        quiz_password: '',
        quiz_number_of_questions: 0,
        section_id: '',
        questions: [],
    });

    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                const response = await getQuiz({ quiz_id: id });
                if (!response.ok) {
                    throw new Error('Failed to fetch quiz');
                }
                const quiz: QuizData = await response.json();
                setQuizData(quiz);
                setSectionId(quiz.section_id);
            } catch (error) {
                console.error('Error fetching quiz:', error);
            } finally {
                setLoading(false)
            }
        };
        fetchQuiz();
    }, [id]);

    useEffect(() => {
        console.log(quizData);
    }
    , [quizData]);

    const handleCurrentStep = (step: number) => {
        setCurrentStep(step);
    }

    const handleSectionSelect = (selectedSectionId: string) => {
        setSectionId(selectedSectionId);
        setCurrentStep(2);
    };

    const handleQuizSubmit = (quizInfo: Partial<QuizData>) => {
        setQuizData({
            ...quizData,
            ...quizInfo,
        });
        setCurrentStep(3);
    };

    const handleQuestionsSubmit = async (questions: QuestionData[]) => {
        try {
            const completeQuizData = {
                ...quizData,
                section_id,
                questions,
            };
            const response = await updateQuiz(completeQuizData);
            if (response) {
                alert("Quiz was edited successfully!")
                window.location.href = `/lecturer/dashboard/view-course/${quizData.course_id}`;
                return true
            } else {
                return false
            }
        } catch (error) {
            return false
        }
        
    };

    return (
        <div>
            <p className="mt-2 p-4 font-semibold text-lg">Edit Quiz</p>
            <div className='flex gap-3 items-center flex-wrap pb-4'>
                <div className='flex gap-2 items-center cursor-pointer' onClick={() => handleCurrentStep(1)} >
                    <div className={clsx(
                        'w-6 h-6 rounded-full flex items-center justify-center border border-gray-400',
                        currentStep >= 1 ? 'bg-blue-600' : 'bg-white'
                    )}>
                        <p className={clsx(
                            'text-sm',
                            currentStep >= 1 ? 'text-white' : 'text-gray-400'
                        )}>1</p>
                    </div>
                    <p className='text-sm'>Section</p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#7A7A7B" className="bi bi-arrow-right-short" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8"/>
                    </svg>
                </div>
                <div className='flex gap-2 items-center cursor-pointer' onClick={() => handleCurrentStep(2)} >
                    <div className={clsx(
                        'w-6 h-6 rounded-full flex items-center justify-center border border-gray-400',
                        currentStep >= 2 ? 'bg-blue-600' : 'bg-white'
                    )}>
                        <p className={clsx(
                            'text-sm',
                            currentStep >= 2 ? 'text-white' : 'text-gray-400'
                        )}>2</p>
                    </div>
                    <p className='text-sm'>Information</p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#7A7A7B" className="bi bi-arrow-right-short" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8"/>
                    </svg>
                </div>
                <div className='flex gap-2 items-center cursor-pointer' onClick={() => handleCurrentStep(3)} >
                    <div className={clsx(
                        'w-6 h-6 rounded-full flex items-center justify-center border border-gray-400',
                        currentStep >= 3 ? 'bg-blue-600' : 'bg-white'
                    )}>
                        <p className={clsx(
                            'text-sm',
                            currentStep >= 3 ? 'text-white' : 'text-gray-400'
                        )}>3</p>
                    </div>
                    <p className='text-sm'>Questions</p>
                </div>
            </div>
            {loading ? (
                <p>Loading quiz data...</p>
            ) : (
                <>
                    {currentStep === 1 && (
                        <SelectSection
                            onSectionSelect={handleSectionSelect}
                            currentSectionId={quizData.section_id}
                            courseId={quizData.course_id}
                        />
                    )}
                    {currentStep === 2 && (
                        <QuizInfo
                            onQuizSubmit={handleQuizSubmit}
                            currentQuizData={quizData}
                        />
                    )}
                    {currentStep === 3 && (
                        <QuizQuestions
                            noOfQuestions={quizData.quiz_number_of_questions}
                            onSubmit={handleQuestionsSubmit}
                            id={id}
                            currentQuestions={quizData.questions}
                        />
                    )}
                </>
            )}
        </div>
    )
}