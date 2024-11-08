const wordpressApiUrl = 'https://public-api.wordpress.com/rest/v1.1/sites/designones.wordpress.com/posts/';

// Fetch and display the list of blog posts
async function fetchPosts() {
    try {
        const response = await fetch(wordpressApiUrl);
        const data = await response.json();

        const blogPostsList = document.getElementById('blog-posts-list');
        blogPostsList.innerHTML = ''; // Clear any existing content

        data.posts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.classList.add('bg-white', 'p-4', 'rounded-lg', 'shadow', 'mb-4');

            postElement.innerHTML = `
                <h2 class="text-2xl font-semibold text-gray-800 mb-2">${post.title}</h2>
                <p class="text-gray-500">${new Date(post.date).toLocaleDateString()}</p>
                <div class="mt-2 text-gray-600">${post.excerpt}</div>
                <a href="#post-${post.ID}" id="readMore-${post.ID}" class="text-blue-500 mt-4 inline-block">Read More</a>
            `;

            blogPostsList.appendChild(postElement);

            // Add event listener to "Read More" link
            document.getElementById(`readMore-${post.ID}`).addEventListener('click', (event) => {
                event.preventDefault(); // Prevent default link behavior
                fetchPostById(post.ID);
            });
        });
    } catch (error) {
        console.error('Error fetching posts:', error);
    }
}

// Fetch and display a single blog post by ID
async function fetchPostById(postId) {
    try {
        const response = await fetch(`${wordpressApiUrl}/${postId}`);
        const post = await response.json();

        const singlePostView = document.getElementById('single-post-view');
        const blogPostsList = document.getElementById('blog-posts-list');
        const singlePostContent = document.getElementById('single-post-content');

        // Populate single post content
        singlePostContent.innerHTML = `
            <h2 class="text-3xl font-semibold mb-4">${post.title}</h2>
            <p class="text-gray-500 mb-4">${new Date(post.date).toLocaleDateString()}</p>
            <div class="text-gray-700">${post.content}</div>
        `;

        // Show the single post view and hide the blog posts list
        blogPostsList.classList.add('hidden');
        singlePostView.classList.remove('hidden');
    } catch (error) {
        console.error('Error fetching post:', error);
    }
}

// Back button event listener to return to blog list
document.getElementById('backButton').addEventListener('click', () => {
    document.getElementById('single-post-view').classList.add('hidden');
    document.getElementById('blog-posts-list').classList.remove('hidden');
});

// Call the function to fetch and display posts when the page loads
fetchPosts();
