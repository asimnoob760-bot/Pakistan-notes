"use client";

import { useState } from "react";
import type { MCQ } from "@/lib/data";

type MCQQuizProps = {
  mcqs: MCQ[];
  chapterName: string;
};

export function MCQQuiz({ mcqs, chapterName }: MCQQuizProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState<boolean[]>(new Array(mcqs.length).fill(false));
  const [userAnswers, setUserAnswers] = useState<(number | null)[]>(new Array(mcqs.length).fill(null));
  const [quizComplete, setQuizComplete] = useState(false);

  const currentMCQ = mcqs[currentIndex];

  const handleSelectAnswer = (optionIndex: number) => {
    if (answered[currentIndex]) return;
    setSelectedAnswer(optionIndex);
  };

  const handleSubmit = () => {
    if (selectedAnswer === null) return;

    const newAnswered = [...answered];
    newAnswered[currentIndex] = true;
    setAnswered(newAnswered);

    const newUserAnswers = [...userAnswers];
    newUserAnswers[currentIndex] = selectedAnswer;
    setUserAnswers(newUserAnswers);

    if (selectedAnswer === currentMCQ.correctAnswer) {
      setScore(score + 1);
    }
    setShowResult(true);
  };

  const handleNext = () => {
    if (currentIndex < mcqs.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer(userAnswers[currentIndex + 1]);
      setShowResult(answered[currentIndex + 1]);
    } else {
      setQuizComplete(true);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setSelectedAnswer(userAnswers[currentIndex - 1]);
      setShowResult(answered[currentIndex - 1]);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnswered(new Array(mcqs.length).fill(false));
    setUserAnswers(new Array(mcqs.length).fill(null));
    setQuizComplete(false);
  };

  if (mcqs.length === 0) {
    return (
      <div className="bg-[#FFFBF7] border border-[#e8e0d5] rounded-xl p-8 text-center">
        <p className="text-[#6b6b6b]">No MCQs available for this chapter yet.</p>
      </div>
    );
  }

  if (quizComplete) {
    const percentage = Math.round((score / mcqs.length) * 100);
    return (
      <div className="bg-[#FFFBF7] border border-[#e8e0d5] rounded-xl p-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#8B9A6B]/10 mb-4">
            <span className="text-3xl font-serif text-[#8B9A6B]">{percentage}%</span>
          </div>
          <h3 className="text-xl font-serif text-[#2c2c2c] mb-2">Quiz Complete!</h3>
          <p className="text-[#6b6b6b]">
            You scored <strong className="text-[#8B9A6B]">{score}</strong> out of <strong>{mcqs.length}</strong>
          </p>
        </div>

        <div className="space-y-4 mb-6">
          {mcqs.map((mcq, index) => (
            <div
              key={mcq.id}
              className={`p-4 rounded-lg border ${
                userAnswers[index] === mcq.correctAnswer
                  ? "bg-[#8B9A6B]/10 border-[#8B9A6B]/30"
                  : "bg-red-50 border-red-200"
              }`}
            >
              <p className="text-sm font-medium text-[#2c2c2c] mb-2">
                {index + 1}. {mcq.question}
              </p>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-[#6b6b6b]">Your answer:</span>
                <span
                  className={
                    userAnswers[index] === mcq.correctAnswer
                      ? "text-[#8B9A6B] font-medium"
                      : "text-red-600"
                  }
                >
                  {userAnswers[index] !== null ? mcq.options[userAnswers[index]!] : "Not answered"}
                </span>
              </div>
              {userAnswers[index] !== mcq.correctAnswer && (
                <div className="flex items-center gap-2 text-sm mt-1">
                  <span className="text-[#6b6b6b]">Correct answer:</span>
                  <span className="text-[#8B9A6B] font-medium">{mcq.options[mcq.correctAnswer]}</span>
                </div>
              )}
            </div>
          ))}
        </div>

        <button
          onClick={handleRestart}
          className="w-full py-3 bg-[#8B9A6B] text-white rounded-lg hover:bg-[#7a8a5a] transition-colors font-medium"
        >
          Restart Quiz
        </button>
      </div>
    );
  }

  return (
    <div className="bg-[#FFFBF7] border border-[#e8e0d5] rounded-xl p-6">
      {/* Progress */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-[#6b6b6b]">
            Question {currentIndex + 1} of {mcqs.length}
          </span>
          <span className="text-sm text-[#8B9A6B] font-medium">
            Score: {score}/{answered.filter(Boolean).length}
          </span>
        </div>
        <div className="h-2 bg-[#e8e0d5] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#8B9A6B] transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / mcqs.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="mb-6">
        <h3 className="text-lg font-serif text-[#2c2c2c] mb-4">
          {currentMCQ.question}
        </h3>

        <div className="space-y-3">
          {currentMCQ.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleSelectAnswer(index)}
              disabled={answered[currentIndex]}
              className={`w-full p-4 text-left rounded-lg border transition-all ${
                selectedAnswer === index
                  ? answered[currentIndex]
                    ? index === currentMCQ.correctAnswer
                      ? "bg-[#8B9A6B]/10 border-[#8B9A6B]"
                      : "bg-red-50 border-red-400"
                    : "bg-[#8B9A6B]/10 border-[#8B9A6B]"
                  : answered[currentIndex] && index === currentMCQ.correctAnswer
                  ? "bg-[#8B9A6B]/10 border-[#8B9A6B]"
                  : "bg-[#FAF7F2] border-[#e8e0d5] hover:border-[#8B9A6B]"
              }`}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                    selectedAnswer === index
                      ? answered[currentIndex]
                        ? index === currentMCQ.correctAnswer
                          ? "bg-[#8B9A6B] text-white"
                          : "bg-red-500 text-white"
                        : "bg-[#8B9A6B] text-white"
                      : answered[currentIndex] && index === currentMCQ.correctAnswer
                      ? "bg-[#8B9A6B] text-white"
                      : "bg-[#e8e0d5] text-[#6b6b6b]"
                  }`}
                >
                  {String.fromCharCode(65 + index)}
                </span>
                <span className="text-[#2c2c2c]">{option}</span>
                {answered[currentIndex] && index === currentMCQ.correctAnswer && (
                  <svg className="w-5 h-5 text-[#8B9A6B] ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
                {answered[currentIndex] && selectedAnswer === index && index !== currentMCQ.correctAnswer && (
                  <svg className="w-5 h-5 text-red-500 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Feedback */}
      {showResult && (
        <div
          className={`p-4 rounded-lg mb-6 ${
            selectedAnswer === currentMCQ.correctAnswer
              ? "bg-[#8B9A6B]/10 border border-[#8B9A6B]/30"
              : "bg-red-50 border border-red-200"
          }`}
        >
          <p
            className={`font-medium ${
              selectedAnswer === currentMCQ.correctAnswer ? "text-[#8B9A6B]" : "text-red-600"
            }`}
          >
            {selectedAnswer === currentMCQ.correctAnswer ? "✓ Correct!" : "✗ Incorrect"}
          </p>
          {selectedAnswer !== currentMCQ.correctAnswer && (
            <p className="text-sm text-[#6b6b6b] mt-1">
              Correct answer: <strong className="text-[#8B9A6B]">{currentMCQ.options[currentMCQ.correctAnswer]}</strong>
            </p>
          )}
        </div>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          className="px-4 py-2 text-sm text-[#6b6b6b] hover:text-[#2c2c2c] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          ← Previous
        </button>

        {!answered[currentIndex] ? (
          <button
            onClick={handleSubmit}
            disabled={selectedAnswer === null}
            className="px-6 py-2 bg-[#8B9A6B] text-white rounded-lg hover:bg-[#7a8a5a] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Submit Answer
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="px-6 py-2 bg-[#8B9A6B] text-white rounded-lg hover:bg-[#7a8a5a] transition-colors"
          >
            {currentIndex === mcqs.length - 1 ? "Finish" : "Next →"}
          </button>
        )}
      </div>
    </div>
  );
}
