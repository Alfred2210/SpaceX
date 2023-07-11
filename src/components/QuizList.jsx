import React, { useState } from "react";

const QuizList = ({ question, choices }) => {
    const [selectedChoice, setSelectedChoice] = useState("");
    const [answered, setAnswered] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);

    const handleChoiceClick = (choice) => {
        if (!answered) {
            setSelectedChoice(choice);
            const currentAnswer = choices[question.answer];
            if (choice === currentAnswer) {
                setIsCorrect(true);
            } else {
                setIsCorrect(false);
            }
            setAnswered(true);
        }
    };

    const resetQuiz = () => {
        setSelectedChoice("");
        setAnswered(false);
        setIsCorrect(false);
    };

    return (
        <div className="quiz-block">
            <h1 className="font-bold text-2xl mb-4">{question}</h1>
            {Object.entries(choices).map(([key, choice]) => (
                <button
                    key={key}
                    className={`bg-white text-gray-800 py-2 px-4 border border-gray-400 rounded shadow ${
                        answered && selectedChoice === key && key === question.answer ? "bg-green-200" : "bg-rose-500"
                    }`}
                    onClick={() => handleChoiceClick(key)}
                >
                    {choice}
                </button>
            ))}
            {answered && (
                <div className="mt-4">
                    <button
                        className={`bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 ${isCorrect ? "bg-green-200" : "bg-red-200"}`}
                        onClick={resetQuiz}>Next Question
                    </button>
                </div>
            )}
        </div>
    );

};

export default QuizList;
