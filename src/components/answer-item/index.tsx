import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Markdown from "react-native-markdown-display";

const Variant = ({ label }: { label: string }) => (
  <View style={styles.variant}>
    <Text style={styles.variantText}>{label}</Text>
  </View>
);

export const Answer = ({
  label,
  content,
  onPress,
  isSelected,
  isCorrect,
  showCorrect,
}: {
  label: string;
  content: string;
  onPress: () => void;
  isSelected: boolean;
  isCorrect: boolean;
  showCorrect: boolean;
}) => (
  <TouchableOpacity
    style={[
      styles.answer,
      isSelected && {
        backgroundColor: isCorrect ? "#D4EDDA" : "#F8D7DA",
        borderColor: isCorrect ? "#28A745" : "#DC3545",
      },
      showCorrect &&
        isCorrect && { backgroundColor: "#D4EDDA", borderColor: "#28A745" },
    ]}
    onPress={onPress}
    disabled={isSelected || showCorrect}
  >
    <Variant label={label} />
    <View style={styles.answerText}>
      <Markdown>{content}</Markdown>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  answer: {
    flexDirection: "row",
    padding: 20,
    borderColor: "#7BBBBA",
    width: "100%",
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: "#fff",
    marginBottom: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  variant: {
    width: 44,
    height: 44,
    borderColor: "#7BBBBA",
    borderWidth: 2,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  variantText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  answerText: {
    fontSize: 16,
    flex: 1,
  },
});
