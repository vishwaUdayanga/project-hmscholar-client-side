'use client';
import {
    getStudentAttempt,
    getStudentQuiz,
    getSavedAnswersMcq,
    getSavedAnswersWritten,
    getStudentMcqAnswer,
    getStudentProfile,
    getStudentQuestions,
} from "@/app/api/student/data";
import {
    updateStudentMCQAnswer,
    updateStudentWrittenAnswer,
} from "@/app/api/student/update";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

type StudentProfile = {
    student_id: string;
    name: string;
    program: string;
    email: string;
    password: string;
    student_image: string;
};

type Question = {
    questionText: string;
    questionMarks: number;
    questionType: string;
    quiz_id: string;
    question_id: string;
};

type McqAnswer = {
    answer_id: string;
    answer: string;
};

export default function At({ params }: { params: { quiz_id: string; id: string } }) {
    const { id, quiz_id } = params;
    const { control } = useForm();
    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [mcqAnswers, setMcqAnswers] = useState<McqAnswer[]>([]);
    const [answers, setAnswers] = useState<{ [key: string]: string }>({});
    const [studentID, setStudentID] = useState<string | undefined>(undefined); // Allow undefined

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    window.location.href = '';
                    return;
                }
                const decodedToken = JSON.parse(atob(token.split('.')[1]));
                const email = decodedToken.sub;

                const studentResponse = await getStudentProfile({ email });
                if (!studentResponse.ok) {
                    throw new Error('Failed to fetch student');
                }
                const data: StudentProfile = await studentResponse.json();
                setStudentID(data.student_id);

                const questionResponse = await getStudentQuestions({ quiz_id });
                if (!questionResponse.ok) {
                    throw new Error('Failed to fetch quiz');
                }

                const questionData: Question[] = await questionResponse.json();
                setQuestions(questionData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching quiz data:', error);
            }
        };

        fetchQuestions();
    }, [quiz_id]);

    useEffect(() => {
        const fetchMcqAnswers = async () => {
            if (questions[currentIndex]?.questionType === "mcq") {
                try {
                    const mcqAnswerResponse = await getStudentMcqAnswer({ question_id: questions[currentIndex].question_id });
                    if (!mcqAnswerResponse.ok) {
                        throw new Error('Failed to fetch MCQ answers');
                    }

                    const mcqAnswerData: McqAnswer[] = await mcqAnswerResponse.json();
                    setMcqAnswers(mcqAnswerData);
                } catch (error) {
                    console.error('Error fetching MCQ answers:', error);
                }
            }
        };

        const fetchSavedAnswers = async () => {
            const questionId = questions[currentIndex]?.question_id;

            if (!studentID || !questionId) return;

            if (questions[currentIndex]?.questionType === "mcq") {
                const mcqSavedResponse = await getSavedAnswersMcq({ student_id: studentID, course_id: id, quiz_id, question_id: questionId });
                if (mcqSavedResponse.ok) {
                    const savedAnswer = await mcqSavedResponse.json();
                    const answerId = savedAnswer.answer_id;

                    const isValidAnswer = mcqAnswers.some(mcqAnswer => mcqAnswer.answer_id === answerId);
                    
                    setAnswers((prev) => ({
                        ...prev,
                        [questionId]: isValidAnswer ? answerId : ''
                    }));
                }
            } else if (questions[currentIndex]?.questionType === "written") {
                const writtenSavedResponse = await getSavedAnswersWritten({ student_id: studentID, course_id: id, quiz_id, question_id: questionId });
                if (writtenSavedResponse.ok) {
                    const savedAnswer = await writtenSavedResponse.json();
                    const answerText = savedAnswer.answer;

                    setAnswers((prev) => ({
                        ...prev,
                        [questionId]: answerText || 'None'
                    }));
                }
            }
        };

        if (questions.length > 0) {
            fetchMcqAnswers();
            fetchSavedAnswers();
        }
    }, [currentIndex, questions, studentID]);

    const handleNextQuestion = () => {
        if (currentIndex < questions.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            alert('This is the last question.');
        }
    };

    const handlePreviousQuestion = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    const handleAnswerChange = async (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, questionId: string) => {
        const newAnswer = e.target.value;
        setAnswers((prevAnswers) => ({
            ...prevAnswers,
            [questionId]: newAnswer,
        }));

        if (!studentID) {
            console.error('Student ID is not defined');
            return;
        }

        const questionType = questions[currentIndex].questionType;
        const courseId = id;

        if (questionType === "written") {
            await updateStudentWrittenAnswer({
                student_id: studentID,
                quiz_id: quiz_id,
                course_id: courseId,
                question_id: questionId,
                answer: newAnswer
            });
        } else if (questionType === "mcq") {
            const answerId = e.target.value; // Get the answer ID from the selected radio button
            await updateStudentMCQAnswer({
                student_id: studentID,
                quiz_id: quiz_id,
                course_id: courseId,
                question_id: questionId,
                answer_id: answerId
            });
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="quiz-container">
            <h1>Quiz</h1>
            {questions.length > 0 && (
                <div>
                    <p>{questions[currentIndex].questionText}</p>
                    {questions[currentIndex].questionType === "written" && (
                        <form>
                            <textarea
                                value={answers[questions[currentIndex].question_id] || ''}
                                onChange={(e) => handleAnswerChange(e, questions[currentIndex].question_id)}
                                placeholder="Write your answer here..."
                                className="w-full p-2 border border-gray-300 rounded-md"
                            />
                        </form>
                    )}
                    {questions[currentIndex].questionType === "mcq" && (
                        <form>
                            {mcqAnswers.map((mcqAnswer) => (
                                <div key={mcqAnswer.answer_id}>
                                    <input
                                        type="radio"
                                        id={`answer-${mcqAnswer.answer_id}`}
                                        name={questions[currentIndex].question_id}
                                        value={mcqAnswer.answer_id}
                                        checked={answers[questions[currentIndex].question_id] === mcqAnswer.answer_id}
                                        onChange={(e) => handleAnswerChange(e, questions[currentIndex].question_id)}
                                    />
                                    <label htmlFor={`answer-${mcqAnswer.answer_id}`} className="ml-2">
                                        {mcqAnswer.answer}
                                    </label>
                                </div>
                            ))}
                        </form>
                    )}

                    {/* Navigation Squares */}
                    <div className="flex justify-center space-x-2 mt-4">
                        {questions.map((_, index) => (
                            <div
                                key={index}
                                className={`w-10 h-10 flex items-center justify-center rounded-md cursor-pointer ${
                                    currentIndex === index ? 'bg-black text-white' : 'bg-gray-200 text-black'
                                }`}
                                onClick={() => setCurrentIndex(index)}
                            >
                                {index + 1}
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-between mt-4">
                        <button
                            onClick={handlePreviousQuestion}
                            className="py-2 px-4 rounded-md text-white bg-gray-500 hover:bg-gray-700 border"
                        >
                            Back
                        </button>
                        <button
                            onClick={handleNextQuestion}
                            className="py-2 px-4 rounded-md text-white bg-black hover:bg-white hover:text-black border"
                        >
                            {currentIndex === questions.length - 1 ? 'Submit and Finish' : 'Next'}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
