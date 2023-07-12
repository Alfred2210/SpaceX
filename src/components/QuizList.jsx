import React, { useState, useEffect } from 'react';

const QuizList = ({ question, choices, answer, changeNextQuestion }) => {
  const [selectedChoice, setSelectedChoice] = useState('');
  const [answered, setAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [Retry, setRetry] = useState(false);
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

    // Passe à la question suivante en utilisant la fonction de rappel
    changeNextQuestion();
    setTimeLeft(30);
  };
  const handleRetry = () => {

    resetQuiz();
    setScore(0);
    setTimeLeft(30);
    setRetry(true);
  }

  const resetQuiz = () => {
    setSelectedChoice('');
    setAnswered(false);
    setIsCorrect(false);
    setRetry(false)
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((timeLeft) => timeLeft - 1);
    }, 1000);

    return () => clearInterval(timer); // Nettoyer l'intervalle lorsque le composant est démonté
  }, []);

  useEffect(() => {
    if (timeLeft === 0) {
      handleNextQuestion();
      setTimeLeft(30);
    }
  }, [timeLeft]);

  return (
      <div className="flex justify-center items-center h-50 my-8">
        <div className="shadow-lg p-4 rounded" >

        <progress value={timeLeft} max={30}></progress>
        <h1 className="font-bold text-2xl mb-4">{question}</h1>
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
        <button
            className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow mt-4"
            onClick={handleRetry}
        >Recommencer</button>
      </div>
    </div>
  );
};

export default QuizList;
