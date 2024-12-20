import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { data } from "@/server/data.json";

type QuestionContent = {
  type: string;
  content: string;
};

type Question = {
  id: number;
  category_id: number;
  question: QuestionContent[];
  answer: QuestionContent[];
  distractor1: QuestionContent[];
  distractor2: QuestionContent[];
  distractor3: QuestionContent[];
  distractor4: QuestionContent[];
};

type Category = {
  id: number;
  name: string;
};

interface ExampleState {
  allQuestions: Question[];
  categories: Category[];
  correctAnswers: number;
  quizCorrectAnswers: number;
  wrongAnswers: number;
  quizWrongAnswer: number;
  completedQuestions: number[]
}

const initialState: ExampleState = {
  allQuestions: [],
  categories: [],
  correctAnswers: 0,
  quizCorrectAnswers: 0,
  wrongAnswers: 0,
  quizWrongAnswer: 0,
  completedQuestions: []
};

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    fetchQuestions: (state) => {
      state.allQuestions = data.questions;
      state.categories = data.categories;
    },
    incrementCorrect(state) {
      state.correctAnswers += 1;
    },
    incrementWrong(state) {
      state.wrongAnswers += 1;
    },
    incrementQuizCorrect(state) {
      state.quizCorrectAnswers += 1;
    },
    incrementQuizWrong(state) {
      state.quizWrongAnswer += 1;
    },
    resetQuizAnswers(state) {
      state.quizCorrectAnswers = 0
      state.quizWrongAnswer = 0
    },
    setCompletedQuestions(state, action: PayloadAction<number[]>) {
      state.completedQuestions = action.payload;
    },
    resetStatistics(state) {
      state.correctAnswers = 0;
      state.wrongAnswers = 0;
      state.completedQuestions = []
      state.quizCorrectAnswers = 0
      state.quizWrongAnswer = 0
    },
  },
});

export const {
  fetchQuestions,
  incrementCorrect,
  incrementWrong,
  resetStatistics,
  setCompletedQuestions,
  incrementQuizCorrect,
  incrementQuizWrong,
  resetQuizAnswers
} = quizSlice.actions;
export default quizSlice.reducer;
