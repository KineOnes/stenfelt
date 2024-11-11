const wordpressApiUrl = 'https://public-api.wordpress.com/rest/v1.1/sites/designones.wordpress.com/posts/';

// Fetch and display the list of blog posts in full
async function fetchPosts() {
    try {
        const response = await fetch(wordpressApiUrl);
        const data = await response.json();

        const blogPostsList = document.getElementById('blog-posts-list');
        blogPostsList.innerHTML = ''; // Clear any existing content

        // Loop through each post and display it in full
        data.posts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.classList.add('bg-white', 'p-4', 'rounded-lg', 'shadow', 'mb-4');

            postElement.innerHTML = `
                <h2 class="text-2xl font-semibold text-gray-800 mb-2">${post.title}</h2>
                <p class="text-gray-500">${new Date(post.date).toLocaleDateString()}</p>
                <div class="mt-2 text-gray-600">${post.content}</div>
            `;

            blogPostsList.appendChild(postElement);
        });
    } catch (error) {
        console.error('Error fetching posts:', error);
    }
}

// Call the function to fetch and display posts when the page loads
fetchPosts();
