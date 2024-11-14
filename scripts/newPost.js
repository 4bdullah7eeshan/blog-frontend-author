document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("newPostForm");
    const titleInput = document.getElementById("title");

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const title = titleInput.value;
        const content = tinymce.get("content").getContent();
        
        const newPost = {
            title: title,
            content: content
        };

        try {
            const response = await fetch("https://blog-api-f102.onrender.com/posts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify(newPost)
            });

            if (response.ok) {
                alert("Post published successfully!");
                window.location.href = "../index.html";
            } else {
                const errorData = await response.json();
                alert(`Failed to create post: ${errorData.message || "Unknown error"}`);
            }
        } catch (error) {
            console.error("Error creating post:", error);
            alert("An error occurred while creating the post.");
        }
    });
});
