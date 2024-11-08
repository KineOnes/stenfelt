// URL for the WordPress.com REST API
const wordpressApiUrl = 'https://public-api.wordpress.com/rest/v1.1/sites/designones.wordpress.com/posts/';

async function fetchPosts() {
    try {
        // Fetch posts from the WordPress REST API
        const response = await fetch(wordpressApiUrl);
        const data = await response.json();

        // Get the blog post section
        const blogPostSection = document.getElementById('blog-post');
        blogPostSection.innerHTML = ''; // Clear any existing content

        // Loop through each post and display it
        data.posts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.classList.add('bg-white', 'p-4', 'rounded-lg', 'shadow', 'mb-4');

            postElement.innerHTML = `
                <h2 class="text-2xl font-semibold text-gray-800 mb-2">${post.title}</h2>
                <p class="text-gray-500">${new Date(post.date).toLocaleDateString()}</p>
                <div class="mt-2 text-gray-600">${post.excerpt}</div>
                <a href="${post.URL}" class="text-blue-500 mt-4 inline-block" target="_blank">Read More</a>
            `;
            blogPostSection.appendChild(postElement);
        });
    } catch (error) {
        console.error('Error fetching posts:', error);
    }
}

// Call the function to fetch and display posts when the page loads
fetchPosts();
