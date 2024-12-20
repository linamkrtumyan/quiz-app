import { useRouter } from "expo-router";
import { View, Text, StyleSheet } from "react-native";

import { Button } from "@/src/components";
import { useAppDispatch, useAppSelector } from "@/src/hooks";
import { resetQuizAnswers } from "@/src/store/slices/quizSlice";

export default function Index() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { correctAnswers, wrongAnswers, quizCorrectAnswers, quizWrongAnswer } =
    useAppSelector((state) => state.quiz);

  const handleGoHome = () => {
    dispatch(resetQuizAnswers());
    router.push("/");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>quiz stats</Text>
      <Text style={styles.text}>correct: {quizCorrectAnswers}</Text>
      <Text style={styles.text}>incorrect: {quizWrongAnswer}</Text>

      <Text style={styles.title}>overall stats:</Text>
      <Text style={styles.text}>correct: {correctAnswers}</Text>
      <Text style={styles.text}>incorrect: {wrongAnswers}</Text>

      <Button
        title="go home"
        onPress={handleGoHome}
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
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
});
