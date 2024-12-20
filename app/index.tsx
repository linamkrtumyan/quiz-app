import { useEffect } from "react";
import { useRouter } from "expo-router";
import { View, Text, StyleSheet } from "react-native";

import { Button } from "@/src/components";
import { useAppDispatch, useAppSelector } from "@/src/hooks/useStore";
import { fetchQuestions, resetStatistics } from "@/src/store/slices/quizSlice";

export default function HomeScreen() {
  const router = useRouter();
  const { correctAnswers, wrongAnswers } = useAppSelector(
    (state) => state.quiz
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchQuestions());
  }, []);

  const completedQuestions = useAppSelector(
    (state: any) => state.quiz.completedQuestions
  );

  const handleReset = () => {
    dispatch(resetStatistics());
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>overall stats:</Text>

      <Text>Correct: {correctAnswers}</Text>
      <Text>Incorrect: {wrongAnswers}</Text>

      <Button
        title="start quiz"
        onPress={() => router.push("/quiz")}
        isLoading={false}
        style={{ marginTop: 20 }}
        textStyle={{ fontSize: 20 }}
        disabled={completedQuestions.length === 18}
      />
      <Button
        title="reset progress"
        onPress={handleReset}
        isLoading={false}
        style={{ marginTop: 20 }}
        textStyle={{ fontSize: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#DDEBE6",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  link: {
    fontSize: 18,
    color: "blue",
    marginTop: 20,
  },
});
