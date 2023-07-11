import React, { useState } from "react";
import quizData from "../data/quizData.json";
import QuizList from "../components/QuizList";

const Quiz = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);

    const handleNextQuestion = () => {
        if (currentQuestion < quizData.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        }
    };

    return (
        <>
            {currentQuestion < quizData.length && (
                <QuizList
                    question={quizData[currentQuestion].question}
                    choices={quizData[currentQuestion].choices}
                />
            )}
            {currentQuestion === quizData.length && (
                <p>Congratulations! You have completed the quiz.</p>
            )}
            <button
                className={`bg-red-50 text-black py-2 px-4 rounded hover:bg-red-50`}
                onClick={handleNextQuestion}>Next Question
            </button>
        </>
    );
};

export default Quiz;
