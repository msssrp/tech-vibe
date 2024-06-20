export const calculateReadingTime = (text: string) => {
  const wordsPerMinute = 200;
  const textLength = text.split(" ").length;
  const readingTime = Math.ceil(textLength / wordsPerMinute);
  return readingTime;
};
