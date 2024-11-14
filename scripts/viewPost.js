const postId = new URLSearchParams(window.location.search).get('id');

const formatDate = (dateString) => {
    const date = new Date(dateString);

    return date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};

async function loadPost() {
    try {
        const response = await fetch(`https://blog-api-f102.onrender.com/posts/${postId}`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        });
        const post = await response.json();

        document.getElementById("postDetails").innerHTML = `
                    <div class="container mt-4">
                        <div class="card text-bg-light mb-4">
                            <div class="card-body">
                                <h2 class="card-title">${post.title}</h2>
                                <p class="card-text">${post.content}</p>
                                <small class="card-footer">Created on: ${formatDate(post.createdAt)}</small>
                            </div>
                        </div>

                        <div id="comments">
                            <h4>Comments:</h4>
                            ${post.comments.map(comment => `
                                <div class="card mb-3">
                                    <div class="card-body">
                                        <p class="card-text"><strong>${comment.username}</strong> commented <em>"${comment.content}"</em> on ${formatDate(comment.createdAt)}.</p>
                                    </div>
                                </div>
                            `).join("")}
                        </div>
                    </div>

                `;
    } catch (error) {
        console.error("Error fetching post details:", error);
    }
}

loadPost();