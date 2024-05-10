const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
function calculateReadingTime(text) {
  const wordsPerMinute = 200; // Average reading speed
  const words = text.trim().split(/\s+/).length; // Split by whitespace and count words
  const minutes = Math.ceil(words / wordsPerMinute); // Calculate reading time in minutes
  return `${minutes} min`; // Return reading time as a string
}
function textToHTML(text) {
  // Escape HTML-specific characters
  const escapedText = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

  // Convert double line breaks to paragraph tags
  let html = escapedText.replace(/\n/g, "</br>");

  html = html
    .replace(/(?:^|<br>)(-|\*)\s/g, "<ul><li>")
    .replace(/<br>(?=<ul><li>)/g, "")
    .replace(/<br>(?!<ul><li>)/g, "</li><li>")
    .replace(/<li>([^<]+)(<br>)?<\/li>/g, "<li>$1</li>");

  // Close the lists properly
  html = html.replace(/<\/li>(?!<li>)/g, "</li></ul>");

  return html;
}
function copyToClipboard(text) {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      alert("Text copied to clipboard:");
    })
    .catch((err) => {
      alert("Failed to copy text: ");
    });
}
document
  .getElementById("blog-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const blog = Object.fromEntries(formData);
    let today = new Date();
    let new_blog = `,
    {
      "title": "${blog.title}",
      "tag": "${blog.tag}",
      "image":"${blog.bimgs.name}",
    "upload_date": "${
      monthNames[today.getMonth()] +
      " " +
      today.getDate() +
      ", " +
      today.getFullYear()
    }",
      "content": "${textToHTML(blog.content)}",
      "reading_time": "${calculateReadingTime(blog.content)}"
    }`;
    copyToClipboard(new_blog);
  });
