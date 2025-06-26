const postsList = document.querySelector('.sidebar ul');
const postForm = document.querySelector('.add-form');
const postDetail = document.querySelector('.main-post');

const titleInput = postForm.querySelector('input[placeholder="Title"]');
const authorInput = postForm.querySelector('input[placeholder="Author name..."]');
const imageInput = postForm.querySelector('input[placeholder="Image URL..."]');
const contentInput = postForm.querySelector('textarea');

const BASE_URL = 'http://127.0.0.1:3001/posts';
let currentPosts = [];

// 🔄 Fetch and display posts
async function loadPosts() {
  const res = await fetch(BASE_URL);
  const posts = await res.json();
  currentPosts = posts;
  renderPostList(posts);
  if (posts.length) renderPostDetail(posts[posts.length - 1]); // show last added
}

// 📝 Render post list
function renderPostList(posts) {
  postsList.innerHTML = '';
  posts.forEach(post => {
    const li = document.createElement('li');
    li.textContent = post.title;
    li.addEventListener('click', () => renderPostDetail(post));
    postsList.appendChild(li);
  });
}

// 📄 Render single post
function renderPostDetail(post) {
  postDetail.innerHTML = `
    <div class="main-post-header">
      <div>
        <h2>${post.title}</h2>
        <p>by ${post.author} – ${post.date}</p>
      </div>
      <div class="buttons">
        <button onclick="editPost(${post.id})">Edit</button>
        <button class="delete" onclick="deletePost(${post.id})">Delete</button>
      </div>
    </div>
    <img src="${post.image}" alt="Blog Post" />
    <p>${post.content}</p>
  `;
}

// ✅ Add new post
postForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const newPost = {
    title: titleInput.value,
    author: authorInput.value,
    image: imageInput.value,
    content: contentInput.value,
    date: new Date().toISOString().split('T')[0]
  };

    await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newPost)
  });

  postForm.reset();
  previewImg.src = ''; // clear preview
  loadPosts();
});

// 🗑️ Delete post
async function deletePost(id) {
  await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
  loadPosts();
}

// 🛠 Edit post
function editPost(id) {
  const post = currentPosts.find(p => p.id === id);
  if (!post) return;

  titleInput.value = post.title;
  authorInput.value = post.author;
  imageInput.value = post.image;
  contentInput.value = post.content;
  previewImg.src = post.image;

  postForm.removeEventListener('submit', postForm._listener);

  const editListener = async (e) => {
    e.preventDefault();
    const updatedPost = {
      title: titleInput.value,
      author: authorInput.value,
      image: imageInput.value,
      content: contentInput.value,
      date: post.date
    };

    await fetch(`${BASE_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedPost)
    });

    postForm.reset();
    previewImg.src = '';
    loadPosts();
    postForm.removeEventListener('submit', editListener);
    postForm.addEventListener('submit', postForm._listener);
  };

  postForm._listener = postForm._listener || postForm.onsubmit;
  postForm.addEventListener('submit', editListener);
}

// 🖼️ Live image preview logic
const previewImg = document.createElement('img');
previewImg.style.maxWidth = '100%';
previewImg.style.borderRadius = '8px';
imageInput.after(previewImg);

imageInput.addEventListener('input', () => {
  previewImg.src = imageInput.value;
});

loadPosts();
