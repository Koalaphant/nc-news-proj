function dateFormatter(dateString) {
  const dateObject = new Date(dateString);

  // Extract day, month, and year from the date object
  const day = dateObject.getDate().toString().padStart(2, "0");
  const month = (dateObject.getMonth() + 1).toString().padStart(2, "0"); // Month is zero-based, so we add 1
  const year = dateObject.getFullYear();

  // Concatenate day, month, and year with slashes
  const formattedDate = `${day}/${month}/${year}`;

  return formattedDate;
}

function articleTextPreview(articleBody) {
  const splitWords = articleBody.split(" ");
  console.log(splitWords);

  const articlePreview = [];
  for (let i = 0; i < 25; i++) {
    articlePreview.push(splitWords[i]);
  }

  return articlePreview.join(" ") + "...";
}

export { dateFormatter, articleTextPreview };
