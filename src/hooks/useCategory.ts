import { useAppSelector } from "./useStore";

export const useCategory = (id: number | null | undefined) => {
  const categories = useAppSelector((state) => state.quiz.categories) || [];

  if (!id) return "";

  const category = categories.find((category) => category.id === id);

  if (!category) {
    throw new Error(`Category with id ${id} not found`);
  }

  return category.name;
};
