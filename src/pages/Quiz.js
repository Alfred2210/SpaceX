import React, { useState } from 'react';
import quizData from '../data/quizData.json';
import QuizList from '../components/QuizList';

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
        <>
          <div className="flex flex-col items-center">
            <QuizList
              question={quizData[currentQuestion].question}
              choices={quizData[currentQuestion].choices}
              answer={quizData[currentQuestion].answer}
              changeNextQuestion={handleNextQuestion}
            />
          </div>
        </>
      )}
      {currentQuestion === quizData.length && (
        <p>Bravo ! Vous avez terminé le quiz !</p>
      )}
    </>
  );
};

export default Quiz;
