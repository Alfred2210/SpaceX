import React, { useState } from 'react';
import quizData from '../data/quizData.json';
import QuizList from '../components/QuizList';

const Quiz = () => {
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [finalScore, setFinalScore] = useState(0);

  const handleQuizClick = (quizIndex) => {
    setCurrentQuiz(quizIndex);
    setCurrentQuestion(0);
    setShowQuiz(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quizData[currentQuiz].questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setFinalScore(finalScore + 1)
    } else {
      setShowQuiz(false);
    }
  };



  return (
      <div className="flex flex-row justify-center items-center h-full">
        {showQuiz ? (
            <div className="flex-grow-1 p-4">
              <QuizList
                  question={quizData[currentQuiz].questions[currentQuestion].question}
                  choices={quizData[currentQuiz].questions[currentQuestion].choices}
                  answer={quizData[currentQuiz].questions[currentQuestion].answer}
                  changeNextQuestion={handleNextQuestion}

              />
            </div>
        ) : (
            <div className="flex flex-row justify-center mt-40">
              {quizData.map((quiz, index) => (
                  <div
                      key={index}
                      className="block rounded-lg bg-amber-200 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] bg-rose-100 p-6 m-4 cursor-pointer"
                      onClick={() => handleQuizClick(index)}
                  >
                    <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                      Quiz {index + 1}
                    </h5>
                    <button
                        className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-black shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                        data-te-ripple-init
                        data-te-ripple-color="light"
                    >
                      Commencer
                    </button>
                  </div>
              ))}
            </div>
        )}
      </div>
  );

};

export default Quiz;
