const formatDate = (date) => {
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${hours}:${minutes} ${day}.${month}.${year}`;
};

const formatContent = (content) => {
  const newContent = content.replaceAll(/<.*?>/g, "");

  return newContent.length < 140
    ? newContent
    : newContent.slice(0, 137) + "...";
};

export { formatDate, formatContent };
