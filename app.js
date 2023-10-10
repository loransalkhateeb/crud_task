
// Section 2:
function postForm() {
    var valueoftitle = document.getElementById("title").value;
    var valueofcontent = document.getElementById("content").value;

    const postData = {
        title: valueoftitle,
        content: valueofcontent,
    };
    // POST
    fetch("http://localhost:3000/posts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
    })
        .catch(error => console.error("Error creating post:", error));
}

function displayPost(post) {
    const postList = document.getElementById('postList');
    const postDiv = document.createElement('div');
    postDiv.classList.add("post-div");
    postDiv.id = `post_${post.id}`;

    postDiv.innerHTML = `
        <h3>${post.title}</h3>
        <p>${post.content}</p>
        <button type="button" class="btn btn-outline-success" onclick="editPost(${post.id})">Edit</button>
        <button type="button" class="btn btn-outline-danger" onclick="deletePost(${post.id})">Delete</button>
    `;

    postList.appendChild(postDiv);
}

// UPDATE
function editPost(postId) {
    const updatedContent2 = prompt('Enter the Title:', '');
    const updatedContent = prompt('Enter the updated content:', '');

    if (updatedContent !== null) {
        fetch(`http://localhost:3000/posts/${postId}`, {
            method: "PUT", 
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title:updatedContent2,
                content: updatedContent }),
        })
            .catch(error => console.error("Error updating post:", error));
    }
}


//DELETE
function deletePost(postId) {
    fetch(`http://localhost:3000/posts/${postId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .catch(error => console.error("Error deleting post:", error));
}

//GET
fetch('http://localhost:3000/posts')
    .then(response => response.json())
    .then(posts => {
        posts.forEach(post => {
            displayPost(post);
        });
    })
    .catch(error => {
        console.error('Error fetching posts:', error);
    });