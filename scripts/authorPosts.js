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
            postsContainer.innerHTML = `
                <table class="table table-striped table-bordered">
                    <thead class="table-dark">
                        <tr>
                            <th>Title</th>
                            <th>Content</th>
                            <th>Author</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${posts.map(post => `
                            <tr>
                                <td>${post.title}</td>
                                <td>${post.content.slice(0, 100)}...</td>
                                <td>${post.author.username}</td>
                                <td>
                                    <button class="btn btn-primary btn-sm me-1" onclick="window.location.href='pages/view-post.html?id=${post.id}'">View</button>
                                    <button class="btn btn-warning btn-sm me-1" onclick="window.location.href='pages/edit-post.html?id=${post.id}'">Edit</button>
                                    <button class="btn btn-danger btn-sm" onclick="deletePost(${post.id})">Delete</button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            `;
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


