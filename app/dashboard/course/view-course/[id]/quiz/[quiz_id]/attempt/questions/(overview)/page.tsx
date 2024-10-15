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
    submitStudentQuiz,
    updateStudentMCQAnswer,
    updateStudentWrittenAnswer,
} from "@/app/api/student/update";
import { useEffect, useState,useRef } from "react";

type Quiz = {
    quiz_id: string;
    quiz_name: string;
    quiz_duration: string;
    quiz_total_marks: number;
    quiz_description: string;
    quiz_password: string;
    quiz_no_of_questions: string;
    is_enabled: boolean;
    attempts: number;
};

type studentAttempt = {
    is_enabled: boolean;
};

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

    const [timeLeft, setTimeLeft] = useState<number>(0);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const { id, quiz_id } = params;
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
                const student_id = data.student_id;

                const questionResponse = await getStudentQuestions({ quiz_id });
                if (!questionResponse.ok) {
                    throw new Error('Failed to fetch quiz');
                }

                const attemptResponse = await getStudentAttempt({student_id:student_id,course_id:id,quiz_id:quiz_id});
                if(!attemptResponse.ok)
                {
                    throw new Error('Quiz failed');
                }
                const attempt: studentAttempt = await attemptResponse.json();
                if(attempt.is_enabled === false)
                {
                    window.location.href = `/dashboard/course/view-course/${id}/quiz/${quiz_id}/attempt`;
                    return;
                }
                const questionData: Question[] = await questionResponse.json();
                setQuestions(questionData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching quiz data:', error);
            }
        };
        const fetchQuizData = async () => {
            const quizResponse = await getStudentQuiz({ quiz_id });
            if (quizResponse.ok) {
                const quizData: Quiz = await quizResponse.json();
                const totalDuration = parseInt(quizData.quiz_duration)*60; // Convert minutes to seconds
                initializeTimer(totalDuration);
            }
        };

        
        fetchQuizData();
        fetchQuestions();
    }, [quiz_id,studentID]);

    const initializeTimer = (totalDuration: number) => {
    const savedTime = localStorage.getItem(`quiz_timer_${quiz_id}`);
    
    let startTime: number;
    if (savedTime) {
        const timePassed = Math.floor((Date.now() - parseInt(savedTime)) / 1000);
        const remainingTime = Math.max(totalDuration - timePassed, 0);
        setTimeLeft(remainingTime);
        startTime = Date.now();
    } else {
        startTime = Date.now();
        localStorage.setItem(`quiz_timer_${quiz_id}`, String(startTime));
        setTimeLeft(totalDuration);
    }

    if (intervalRef.current) {
        clearInterval(intervalRef.current);
    }

        intervalRef.current = setInterval(() => {
            setTimeLeft((prevTimeLeft) => {
                if (prevTimeLeft <= 1) {
                    clearInterval(intervalRef.current!);
                    console.log('Timer reached zero, submitting quiz.');
                
                    // Submit the quiz when time reaches zero
                    if (studentID) {
                        submitQuizOnTimeOut();
                    }
                
                    return 0;
                }
                
                return prevTimeLeft - 1;
            });
        }, 1000);

};

const submitQuizOnTimeOut = async () => {
    
    if (studentID) {
        
        console.log('meka atulata yanawai');
        try {
            const response = await submitStudentQuiz({
                student_id: studentID, // Use local variable
                quiz_id: quiz_id,
                course_id: id,
            });
    
            if (response.ok) {
                alert("Time's up! Quiz submitted successfully.");
                // Reset the timer
                localStorage.removeItem(`quiz_timer_${quiz_id}`);
                window.location.href = `/dashboard/course/view-course/${id}`;
            } else {
                alert("Failed to submit the quiz on time out.");
            }
        } catch (error) {
            console.error("Error submitting quiz on time out:", error);
            alert("An error occurred while submitting the quiz.");
        }
    } else {
        console.error("Student ID is not available.");
    }
};


    useEffect(() => {
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                localStorage.setItem(`quiz_timer_${quiz_id}`, String(Date.now()));
            }
        };
    }, []);

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

    const handleNextQuestion = async () => {
        if (currentIndex < questions.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            const isConfirmed = window.confirm('Are you sure you want to submit the quiz?');
            if (isConfirmed && studentID) {
                try {
                    const response = await submitStudentQuiz({
                        student_id: studentID,
                        quiz_id: quiz_id,
                        course_id: id
                    });
                    if (response.ok) {
                        localStorage.removeItem(`quiz_timer_${quiz_id}`);
                        alert('Quiz submitted successfully.');
                        window.location.href = `/dashboard/course/view-course/${id}`;
                    } else {
                        alert('Failed to submit quiz.');
                    }
                } catch (error) {
                    console.error('Error submitting quiz:', error);
                    alert('An error occurred while submitting the quiz.');
                }
            }
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
            const answerId = e.target.value; 
            await updateStudentMCQAnswer({
                student_id: studentID,
                quiz_id: quiz_id,
                course_id: courseId,
                question_id: questionId,
                answer_id: answerId
            });
        }
    };
        const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="quiz-container flex justify-center items-center">
            <div className="w-4/6">
            <h1 className="font-bold mb-6">Quiz</h1>
                         <div className="timer">
                 <p className="mb-6">{formatTime(timeLeft)}</p>
            </div>
            {questions.length > 0 && (
                <div>
                    <p className="font-bold mb-4">{questions[currentIndex].questionText}</p>
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
                            className="py-2 px-4 bg-black text-white rounded-md"
                            disabled={currentIndex === 0}
                        >
                            Previous
                        </button>

                        <button
                            onClick={handleNextQuestion}
                            className="py-2 px-4 bg-black text-white rounded-md"
                        >
                            {currentIndex === questions.length - 1 ? 'Submit and Finish' : 'Next'}
                        </button>
                    </div>
                </div>
            )}
            </div>
        </div>
    );
}
