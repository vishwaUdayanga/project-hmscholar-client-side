import { useForm, SubmitHandler } from 'react-hook-form';
import { useState, useEffect } from 'react';

interface QuestionData {
    questionText: string;
    questionMarks: number;
    questionType: 'written' | 'mcq';
    answer1?: string;
    answer2?: string;
    answer3?: string;
    answer4?: string;
    correctAnswer?: string;
}


interface QuizQuestionsProps {
    noOfQuestions: number;
    onSubmit: (questions: QuestionData[]) => Promise<boolean>;
    id: string;
    currentQuestions?: QuestionData[];
}

interface QuestionFormData {
    questions: {
        questionText: string;
        questionMarks: number;
        questionType: 'written' | 'mcq';
        answer1?: string;
        answer2?: string;
        answer3?: string;
        answer4?: string;
        correctAnswer?: string;
    }[];
}

const QuizQuestions: React.FC<QuizQuestionsProps> = ({ noOfQuestions, onSubmit, id, currentQuestions = [] }) => {
    const { register, handleSubmit, watch, setValue } = useForm<QuestionFormData>();
    const [isSubmittingForm, setIsSubmittingForm] = useState<boolean>(false);

    useEffect(() => {
        currentQuestions.slice(0, noOfQuestions).forEach((question, index) => {
            setValue(`questions.${index}.questionText`, question.questionText);
            setValue(`questions.${index}.questionMarks`, question.questionMarks);
            setValue(`questions.${index}.questionType`, question.questionType);
            setValue(`questions.${index}.answer1`, question.answer1 || '');
            setValue(`questions.${index}.answer2`, question.answer2 || '');
            setValue(`questions.${index}.answer3`, question.answer3 || '');
            setValue(`questions.${index}.answer4`, question.answer4 || '');
            setValue(`questions.${index}.correctAnswer`, question.correctAnswer || '');
        });
    }, [currentQuestions, setValue, noOfQuestions]);

    const totalQuestions = Math.max(noOfQuestions, currentQuestions.length);

    const onSubmitForm: SubmitHandler<QuestionFormData> = async (data) => {
        setIsSubmittingForm(true)
        const isSuccessful = await onSubmit(data.questions);
        if (isSuccessful) {
            setIsSubmittingForm(false);
        } else {
            setIsSubmittingForm(false);
            alert('An error occurred. Please try again');
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmitForm)} className="w-full mt-5 flex items-center justify-center flex-col pb-10">
            <div className="w-full md:w-8/12">
                <h1 className="text-xl font-semibold">Create the questions</h1>
                <p className="text-sm text-slate-500">Enter the questions and their answers.</p>
                <div className="w-full mt-10">
                    {Array.from({ length: noOfQuestions }).map((_, index) => (
                        <div key={index} className="mb-4">
                            <label className="block mb-1 text-sm sm:text-base mt-3 font-bold">
                                Question {index+1}
                            </label>

                            <div className="flex items-center p-2 border border-zinc-200 rounded-md">
                                <input
                                    className="ml-2 text-black flex-1 outline-none text-sm"
                                    {...register(`questions.${index}.questionText`)}
                                    placeholder={`Question ${index + 1}`}
                                    defaultValue={currentQuestions[index]?.questionText || ''}
                                />
                            </div>

                            <div className="flex items-center p-2 border border-zinc-200 rounded-md mt-2">
                                <input
                                    className="ml-2 text-black flex-1 outline-none text-sm"
                                    type="number"
                                    {...register(`questions.${index}.questionMarks`, {
                                        valueAsNumber: true,
                                        validate: (value) => Number.isInteger(value) || 'Marks must be an integer',
                                    })}
                                    placeholder="Marks"
                                    defaultValue={currentQuestions[index]?.questionMarks || 0}
                                />
                            </div>

                            <div className="flex items-center p-2 border border-zinc-200 rounded-md mt-2">
                                <select
                                    {...register(`questions.${index}.questionType`)}
                                    className="w-full outline-none text-sm"
                                    defaultValue={currentQuestions[index]?.questionType || 'written'}
                                >
                                    <option value="written">Written</option>
                                    <option value="mcq">Multiple Choice</option>
                                </select>
                            </div>

                            {watch(`questions.${index}.questionType`) === 'mcq' && (
                                <div className="border rounded-sm p-3 mt-2">
                                    <label className="block mb-1 text-sm">
                                        Answer pool
                                    </label>

                                    <div className="flex items-center gap-2">
                                        <input
                                            className="px-2 py-1 text-sm border border-zinc-200 rounded-sm mt-2 outline-none"
                                            {...register(`questions.${index}.answer2`)}
                                            placeholder="Answer 2"
                                            defaultValue={currentQuestions[index]?.answer2 || ''}
                                        />
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <input
                                            className="px-2 py-1 text-sm border border-zinc-200 rounded-sm mt-2 outline-none"
                                            {...register(`questions.${index}.answer3`)}
                                            placeholder="Answer 3"
                                            defaultValue={currentQuestions[index]?.answer3 || ''}
                                        />
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <input
                                            className="px-2 py-1 text-sm border border-zinc-200 rounded-sm mt-2 outline-none"
                                            {...register(`questions.${index}.answer4`)}
                                            placeholder="Answer 4"
                                            defaultValue={currentQuestions[index]?.answer4 || ''}
                                        />
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <input
                                            className="px-2 py-1 text-sm border border-zinc-200 rounded-sm mt-2 outline-none"
                                            {...register(`questions.${index}.correctAnswer`)}
                                            placeholder="Correct answer"
                                            defaultValue={currentQuestions[index]?.correctAnswer || ''}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                <button disabled={isSubmittingForm} className='bg-blue-600 text-white px-5 py-1 mt-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-opacity-50 text-sm sm:text-base' type="submit">{ isSubmittingForm ? `Submitting...` : `Submit` }</button>
            </div>
        </form>
    );
};

export default QuizQuestions;
