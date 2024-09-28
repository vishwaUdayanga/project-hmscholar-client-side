'use client'

import { useState } from 'react';
import QuizInfo from '@/app/ui/lecturer/quiz/quiz-info';
import SelectSection from '@/app/ui/lecturer/quiz/select-section';
import QuizQuestions from '@/app/ui/lecturer/quiz/quiz-questions';
import { createQuiz } from '@/app/api/lecturer/create';
import clsx from 'clsx';


interface QuizData {
    quiz_name: string;
    quiz_duration: number;
    quiz_total_marks: number;
    quiz_description: string;
    quiz_password: string;
    quiz_number_of_questions: number;
    questions: QuestionData[];
}

interface QuestionData {
    questionText: string;
    questionType: 'written' | 'mcq';
    answer1?: string;
    answer2?: string;
    answer3?: string;
    answer4?: string;
    correctAnswer?: string;
}

const CreateQuiz = ({params} : {params: {id: string}}) => {
    const {id} = params;
    const [currentStep, setCurrentStep] = useState<number>(1);
    const [sectionId, setSectionId] = useState<string | null>(null);
    const [quizData, setQuizData] = useState<QuizData>({
        quiz_name: '',
        quiz_duration: 0,
        quiz_total_marks: 0,
        quiz_description: '',
        quiz_password: '',
        quiz_number_of_questions: 0,
        questions: [],
    });

    const handleCurrentStep = (step: number) => {
        setCurrentStep(step);
    }

    const handleSectionSelect = (selectedSectionId: string) => {
        setSectionId(selectedSectionId);
        setCurrentStep(2);
    };

    const handleQuizSubmit = (quizInfo: Omit<QuizData, 'questions'>) => {
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
                sectionId,
                questions,
            };
            const response = await createQuiz(completeQuizData);
            if (response) {
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
            {currentStep === 1 && (
                <SelectSection
                    onSectionSelect={handleSectionSelect}
                    courseId={id}
                />
            )}

            {currentStep === 2 && (
                <QuizInfo onQuizSubmit={handleQuizSubmit} />
            )}

            {currentStep === 3 && (
                <QuizQuestions
                    noOfQuestions={quizData.quiz_number_of_questions}
                    onSubmit={handleQuestionsSubmit}
                    id={id}
                />
            )}
        </div>
    );
};

export default CreateQuiz;
