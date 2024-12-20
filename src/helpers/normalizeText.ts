interface TextProps {
  type: string;
  content: string;
}

export const normalizeText = (item: TextProps[]) => {
  return item
    ?.filter((q: any) => q.type === "text")
    .map((q: any) => q.content)
    .join(" ");
};
