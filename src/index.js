const BASE_URL = "http://localhost:3000/posts";

function displayPosts() {
  fetch(BASE_URL)
    .then((res) => res.json())
    .then((posts) => {
      const postList = document.getElementById("post-list");
      postList.innerHTML = "";
      posts.forEach((post) => {
        const postDiv = document.createElement("div");
        postDiv.textContent = post.title;
        postDiv.addEventListener("click", () => handlePostClick(post.id));
        postList.appendChild(postDiv);
      });
    });
}

function handlePostClick(postId) {
  fetch(`${BASE_URL}/${postId}`)
    .then((res) => res.json())
    .then((post) => {
      const postDetail = document.getElementById("post-detail");
      postDetail.innerHTML = `
        <h2>${post.title}</h2>
        <p><strong>Author:</strong> ${post.author}</p>
        <p>${post.content}</p>
        <img src="${post.image}" alt="${post.title}" />
      `;
    });
}

function addNewPostListener() {
  const form = document.getElementById("new-post-form");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const newPost = {
      title: form.title.value,
      author: form.author.value,
      content: form.content.value,
      image: form.image.value,
    };

    // Add to server
    fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newPost)
    })
    .then(res => res.json())
    .then((post) => {
      const postList = document.getElementById("post-list");
      const postDiv = document.createElement("div");
      postDiv.textContent = post.title;
      postDiv.addEventListener("click", () => handlePostClick(post.id));
      postList.appendChild(postDiv);
      form.reset();
    });
  });
}

function main() {
  displayPosts();
  addNewPostListener();
}

document.addEventListener("DOMContentLoaded", main);
