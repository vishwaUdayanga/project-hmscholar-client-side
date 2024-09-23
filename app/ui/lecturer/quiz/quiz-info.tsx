import { z } from 'zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AddQuizSchema } from '@/app/lib/zod-schema';

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

interface QuizInfoProps {
    onQuizSubmit: (quizInfo: Omit<QuizData, 'questions'>) => void;
}

type QuizInfoFormData = z.infer<typeof AddQuizSchema>;

const QuizInfo: React.FC<QuizInfoProps> = ({ onQuizSubmit }) => {
    const { register, handleSubmit, formState: { errors } } = useForm<QuizInfoFormData>({
        resolver: zodResolver(AddQuizSchema),
    });

    const onSubmit: SubmitHandler<QuizInfoFormData> = (data) => {
        onQuizSubmit(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='w-full mt-5 flex items-center justify-center flex-col pb-10'>
            <div className="w-full md:w-8/12">
                <h1 className="text-xl font-semibold">Add basic information</h1>
                <p className="text-sm text-slate-500">Enter the basic information about the quiz</p>

                <div className="w-full mt-10">
                    <div className="mb-4">
                        <label className="block mb-1 text-sm sm:text-base">
                            Quiz name
                        </label>
                        <div className="flex items-center p-2 border border-zinc-200 rounded-md">
                            <input {...register('quiz_name')} placeholder="Quiz Name" className='ml-2 text-black flex-1 outline-none text-sm' />
                        </div>
                        {errors.quiz_name &&
                            <div className="flex gap-2 items-center mt-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#CD3C16" className="bi bi-exclamation-circle" viewBox="0 0 16 16">
                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                                    <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z"/>
                                </svg>
                                <p className='text-red-600 text-sm'>{errors.quiz_name.message}</p>
                            </div>
                        }
                    </div>

                    <div className="mb-4">
                        <label className="block mb-1 text-sm sm:text-base">
                            Duration
                        </label>
                        <div className="flex items-center p-2 border border-zinc-200 rounded-md">
                            <input type="number" {...register('quiz_duration')} placeholder="Quiz duration" className='ml-2 text-black flex-1 outline-none text-sm' />
                        </div>
                        {errors.quiz_duration &&
                            <div className="flex gap-2 items-center mt-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#CD3C16" className="bi bi-exclamation-circle" viewBox="0 0 16 16">
                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                                    <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z"/>
                                </svg>
                                <p className='text-red-600 text-sm'>{errors.quiz_duration.message}</p>
                            </div>
                        }
                    </div>
                    
                    <div className="mb-4">
                        <label className="block mb-1 text-sm sm:text-base">
                            Total mark
                        </label>
                        <div className="flex items-center p-2 border border-zinc-200 rounded-md">
                            <input type="number" {...register('quiz_total_marks')} placeholder="Total Mark" className='ml-2 text-black flex-1 outline-none text-sm' />
                        </div>
                        {errors.quiz_total_marks &&
                            <div className="flex gap-2 items-center mt-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#CD3C16" className="bi bi-exclamation-circle" viewBox="0 0 16 16">
                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                                    <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z"/>
                                </svg>
                                <p className='text-red-600 text-sm'>{errors.quiz_total_marks.message}</p>
                            </div>
                        }
                    </div>

                    <div className="mb-4">
                        <label className="block mb-1 text-sm sm:text-base">
                            Description
                        </label>
                        <div className="flex items-center border border-zinc-200 rounded-md flex-col h-48">
                            <div className="flex border-b border-zinc-200 gap-4 w-full p-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="cursor-pointer bi bi-type-bold" viewBox="0 0 16 16">
                                    <path d="M8.21 13c2.106 0 3.412-1.087 3.412-2.823 0-1.306-.984-2.283-2.324-2.386v-.055a2.176 2.176 0 0 0 1.852-2.14c0-1.51-1.162-2.46-3.014-2.46H3.843V13zM5.908 4.674h1.696c.963 0 1.517.451 1.517 1.244 0 .834-.629 1.32-1.73 1.32H5.908V4.673zm0 6.788V8.598h1.73c1.217 0 1.88.492 1.88 1.415 0 .943-.643 1.449-1.832 1.449H5.907z"/>
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="cursor-pointer bi bi-type-italic" viewBox="0 0 16 16">
                                    <path d="M7.991 11.674 9.53 4.455c.123-.595.246-.71 1.347-.807l.11-.52H7.211l-.11.52c1.06.096 1.128.212 1.005.807L6.57 11.674c-.123.595-.246.71-1.346.806l-.11.52h3.774l.11-.52c-1.06-.095-1.129-.211-1.006-.806z"/>
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="cursor-pointer bi bi-type-underline" viewBox="0 0 16 16">
                                    <path d="M5.313 3.136h-1.23V9.54c0 2.105 1.47 3.623 3.917 3.623s3.917-1.518 3.917-3.623V3.136h-1.23v6.323c0 1.49-.978 2.57-2.687 2.57s-2.687-1.08-2.687-2.57zM12.5 15h-9v-1h9z"/>
                                </svg>
                            </div>
                            <textarea {...register('quiz_description')} placeholder="Description" className='text-black outline-none text-sm w-full p-2 rounded-md block h-48 resize-none' />
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block mb-1 text-sm sm:text-base">
                            Quiz password
                        </label>
                        <div className="flex items-center p-2 border border-zinc-200 rounded-md">
                            <input {...register('quiz_password')} type="password" placeholder="Quiz Password" className='ml-2 text-black flex-1 outline-none text-sm' />
                        </div>
                        {errors.quiz_password &&
                            <div className="flex gap-2 items-center mt-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#CD3C16" className="bi bi-exclamation-circle" viewBox="0 0 16 16">
                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                                    <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z"/>
                                </svg>
                                <p className='text-red-600 text-sm'>{errors.quiz_password.message}</p>
                            </div>
                        }
                    </div>
                    
                    <div className="mb-4">
                        <label className="block mb-1 text-sm sm:text-base">
                            Number of questions
                        </label>
                        <div className="flex items-center p-2 border border-zinc-200 rounded-md">
                            <input type="number" {...register('quiz_number_of_questions')} placeholder="Number of Questions" className='ml-2 text-black flex-1 outline-none text-sm' />
                        </div>
                        {errors.quiz_number_of_questions &&
                            <div className="flex gap-2 items-center mt-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#CD3C16" className="bi bi-exclamation-circle" viewBox="0 0 16 16">
                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                                    <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z"/>
                                </svg>
                                <p className='text-red-600 text-sm'>{errors.quiz_number_of_questions.message}</p>
                            </div>
                        }
                    </div>
                </div>

                <button type="submit" className='bg-blue-600 text-white px-5 py-1 mt-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-opacity-50 text-sm sm:text-base'>Next</button>
            </div>
        </form>
    );
};

export default QuizInfo;
