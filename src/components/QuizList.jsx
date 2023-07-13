import React, { useState, useEffect } from 'react';

const QuizList = ({ question, choices, answer, changeNextQuestion}) => {
  const [selectedChoice, setSelectedChoice] = useState('');
  const [answered, setAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [finalScore, setFinalScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isLastQuestion, setLastQuestion] = useState(false);
  const handleChoiceClick = (choice) => {
    if (!answered) {
      setSelectedChoice(choice);
      const currentAnswer = choices[answer];
      if (choice === currentAnswer) {
        setIsCorrect(true);
      } else {
        setIsCorrect(false);
      }
      setAnswered(true);

    }
  };

  const handleNextQuestion = () => {
    if (isCorrect) {
      setScore(score + 1);
    }
    resetQuiz();

    changeNextQuestion();
    setTimeLeft(30);
  };


  const resetQuiz = () => {
    setSelectedChoice('');
    setAnswered(false);
    setIsCorrect(false);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((timeLeft) => timeLeft - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (timeLeft === 0) {
      handleNextQuestion();
      setTimeLeft(30);
    }
  }, [timeLeft]);

  return (
    <div className="flex justify-center items-center h-50 my-8">
      <div className="shadow-lg p-4 rounded">
        <div className="flex w-full flex-col rounded overflow-hidden shadow-lg ">
          <progress value={timeLeft} color="blue" max="30" />
        </div>
        <h1 className="font-bold text-2xl mb-4 gap-4">{question}</h1>
        <div className="flex flex-col items-center">
          {Object.entries(choices).map(([key, choice]) => (
            <button
              key={key}
              className={`bg-white shadow-md text-gray-800 font-bold p-4 m-2 rounded w-64 ${
                answered && isCorrect && selectedChoice === choice
                  ? 'bg-green-500'
                  : ''
              }`}
              onClick={() => handleChoiceClick(choice)}
            >
              {choice}
            </button>
          ))}
        </div>
        {answered && (
          <div className="mt-4">
            <p>{isCorrect ? 'Reponse correcte' : 'Reponse incorrecte'}</p>
          </div>
        )}
        <p>Score: {score}</p>
        <button
            className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow mt-4"
            onClick={handleNextQuestion}
        >
          Suivant
        </button>
        {isLastQuestion && (

          <div className="mt-4">
            <p>Score final: {finalScore}</p>
            <p> {finalScore >= 5 ? 'Bravo' : 'Dommage'}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizList;
