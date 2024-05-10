var index = localStorage.getItem("blogIndex");

function getBlogInnerHtml(blog, index) {
  return ` <h2 class="h1 s-blog-title">${blog.title}</h2>
            <img
              src="assets/images/${blog.image}"
              alt="Descriptive Alt Text"
              class="blog-image"
            />
            <div class="blog-content">
              ${blog.content}
            </div>`;
}

document.addEventListener("DOMContentLoaded", function () {
  fetch("assets/data/blogs.json")
    .then((response) => response.json())
    .then((blogs) => {
      const blog = blogs[index];
      const singleBlogContainer = document.getElementById(
        "single-blog-container"
      );
      singleBlogContainer.innerHTML = getBlogInnerHtml(blog);
    })
    .catch((error) => console.error("Error loading the posts:", error));
});
function adminLogin() {
  const password = prompt("Verification: ");
  console.log(password);
}
