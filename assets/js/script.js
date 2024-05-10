"use strict";

function handleClick(index) {
  localStorage.setItem("blogIndex", index);
  window.location.href = "blog.html";
}

function getBlogInnerHtml(blog, index) {
  return `
    <div class="blog-card-banner">
      <img
        src="./assets/images/${blog.image}"
        alt="${blog.title}"
        width="250"
        class="blog-banner-img"
      />
    </div>

    <div class="blog-content-wrapper">
      <button class="blog-topic text-tiny">${blog.tag}</button>

      <h3>
        <a href="#" data-id="${index}" onclick="handleClick(${index})" class="h3">
          ${blog.title}
        </a>
      </h3>

      <p class="blog-text">
        ${blog.content}
      </p>

      <div class="wrapper-flex">
        <div class="profile-wrapper">
          <img
            src="./assets/images/author.png"
            alt="Mahima Kathiwoda"
            width="50"
          />
        </div>

        <div class="wrapper">
          <a href="#" class="h4">Mahima Kathiwoda</a>

          <p class="text-sm">
            <time datetime="2022-01-17">${blog.upload_date}</time>
            <span class="separator"></span>
            <ion-icon name="time-outline"></ion-icon>
            <time datetime="PT3M">${blog.reading_time}</time>
          </p>
        </div>
      </div>
    </div>
  `;
}
document.addEventListener("DOMContentLoaded", function () {
  fetch("assets/data/blogs.json")
    .then((response) => response.json())
    .then((blogs) => {
      const blogsContainer = document.getElementById("blogs-container");
      blogs.forEach((blog, index) => {
        console.log(blog.content.length);
        const blogElement = document.createElement("div");
        blogElement.classList.add("blog-card");
        blogElement.innerHTML = getBlogInnerHtml(blog, index);
        blogsContainer.appendChild(blogElement);
      });
    })
    .catch((error) => console.error("Error loading the posts:", error));
});
