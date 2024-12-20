import { useRouter } from "expo-router";
import { useState } from "react";
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import Markdown from "react-native-markdown-display";

import { Button, Answer } from "@/src/components";
import { useQuiz, useAppDispatch, useAppSelector } from "@/src/hooks";
import {
  incrementCorrect,
  incrementQuizCorrect,
  incrementQuizWrong,
  incrementWrong,
  setCompletedQuestions,
} from "@/src/store/slices/quizSlice";

export default function Index() {
  const [stepCount, setStepCount] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { completedQuestions, allQuestions } = useAppSelector(
    (state: any) => state.quiz
  );
  const { shuffledAnswers, question, categoryName, questionId } =
    useQuiz(stepCount);

  const handleNextStep = () => {
    setSelectedAnswer(null);
    setShowCorrectAnswer(false);
    if (
      stepCount >= shuffledAnswers.length - 1 ||
      completedQuestions.length === allQuestions.length - 2
    ) {
      router.push("/result");
    } else {
      setStepCount((prev) => prev + 1);
    }
  };

  const handleAnswerClick = (answer: string, correct: boolean) => {
    setSelectedAnswer(answer);
    const updatedCompletedQuestions = [...completedQuestions, questionId];
    dispatch(setCompletedQuestions(updatedCompletedQuestions));

    if (!correct) {
      dispatch(incrementWrong());
      dispatch(incrementQuizWrong());
      setShowCorrectAnswer(true);
    } else {
      dispatch(incrementCorrect());
      dispatch(incrementQuizCorrect());
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={styles.text}>Question ID: {questionId}</Text>
        <Text style={styles.text}>Category: {categoryName}</Text>
        <View style={styles.question}>
          <Markdown>{question}</Markdown>
        </View>
        {shuffledAnswers.map((answer, index) => (
          <Answer
            key={index}
            label={String.fromCharCode(65 + index)}
            content={answer.content}
            onPress={() => handleAnswerClick(answer.content, answer.isCorrect)}
            isSelected={selectedAnswer === answer.content}
            isCorrect={answer.isCorrect}
            showCorrect={showCorrectAnswer}
          />
        ))}
      </ScrollView>
      {selectedAnswer && (
        <Button
          title="Continue"
          onPress={handleNextStep}
          isLoading={false}
          style={styles.fixedButton}
          textStyle={{ fontSize: 20 }}
          disabled={!selectedAnswer}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#DDEBE6",
  },
  scrollViewContent: {
    padding: 16,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
  question: {
    height: 272,
    padding: 20,
    borderColor: "#7BBBBA",
    width: "100%",
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: "#fff",
    marginBottom: 30,
  },
  fixedButton: {
    bottom: 20,
  },
});
