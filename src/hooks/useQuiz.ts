import { useState, useEffect, useMemo } from "react";

import { normalizeText } from "@/src/helpers/normalizeText";
import { useAppSelector } from "./useStore";
import { useCategory } from "./useCategory";

export const useQuiz = (order: number) => {
  const [shuffledAnswers, setShuffledAnswers] = useState<any[]>([]);
  const questions = useAppSelector((state) => state.quiz.allQuestions);
  const { completedQuestions } = useAppSelector((state) => state.quiz);

  const questionData = useMemo(() => {
    if (questions.length === 0) return null;

    const notCompletedQuestions = questions.filter(
      (question) => !completedQuestions.includes(question.id)
    );

    const shuffled =
      notCompletedQuestions.length > 0
        ? [...notCompletedQuestions].sort(() => Math.random() - 0.5)
        : [];

    const selected = shuffled.slice(0, 5);
    return selected[order] || null;
  }, [questions, order]);

  useEffect(() => {
    if (questionData) {
      const normalizedAnswer = normalizeText(questionData.answer);
      const correctAnswer = {
        content: normalizedAnswer,
        isCorrect: true,
      };

      const distractors = [
        ...(questionData.distractor1 || []),
        ...(questionData.distractor2 || []),
        ...(questionData.distractor3 || []),
        ...(questionData.distractor4 || []),
      ]
        .filter((distractor) => distractor?.content)
        .map((distractor) => ({
          content: distractor.content,
          isCorrect: false,
        }));

      const combinedAnswers = [correctAnswer, ...distractors];
      setShuffledAnswers(combinedAnswers.sort(() => Math.random() - 0.5));
    }
  }, [questionData]);

  const question = questionData ? normalizeText(questionData.question) : "";
  const categoryName = questionData
    ? useCategory(questionData.category_id)
    : "";
  const questionId = questionData?.id || null;

  return { question, shuffledAnswers, categoryName, questionId };
};
