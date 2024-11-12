document.addEventListener("DOMContentLoaded", async () => {
    const postsContainer = document.getElementById("posts");

    try {
        const response = await fetch("http://localhost:3000/posts/author/posts", {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
            },
        });

        if (response.ok) {
            const posts = await response.json();
            postsContainer.innerHTML = posts.map(post => `
                <div class="post">
                    <h2>${post.title}</h2>
                    <p>${post.content}</p>
                    <small>Author: ${post.author.username}</small>
                    <button onclick="window.location.href='pages/view-post.html?id=${post.id}'">View</button>
                    <button onclick="window.location.href='pages/edit-post.html?id=${post.id}'">Edit</button>
                    <button onclick="deletePost(${post.id})">Delete</button>
                </div>
            `).join('');
        } else {
            alert("Failed to load posts.");
        }
    } catch (error) {
        console.error("Error loading posts:", error);
    }
});

async function deletePost(postId) {
    if (!confirm("Are you sure you want to delete this post?")) return;
    try {
        const response = await fetch(`http://localhost:3000/posts/${postId}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        });

        if (response.ok) {
            alert("Post deleted successfully!");
            window.location.href = "./index.html";
        } else {
            const errorData = await response.json();
            alert(`Failed to delete post: ${errorData.message || "Unknown error"}`);
        }
    } catch (error) {
        console.error("Error deleting post:", error);
    }
}


