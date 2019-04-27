
// Add bookmark function
const addBookmark = e => {
    // Get input values
    const siteURL = document.getElementById('url').value;
    const siteName = document.getElementById('name').value;

    // Create bookmark object
    const bookmark = {
        url: siteURL,
        name: siteName
    };

    // Local Storage
    if (localStorage.getItem('bookmarks') === null) {
        // Init array
        const bookmarks = [];
        // Add new bookmark to array
        bookmarks.push(bookmark);
        // Add bookmarks to local storage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    } else {
        // Get bookmarks from local storage
        const bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        // Add new bookmark to array
        bookmarks.push(bookmark);
        // Add bookmarks back to local storage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    }

    // Clear input fields
    document.getElementById('bookmark-form').reset();

    // Fetch bookmarks
    fetchBookmarks();

    // Prevent from submitting a form
    e.preventDefault();
}

// Remove bookmark function
const removeBookmark = url => {
    // Get bookmarks from local storage
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    // Loop through bookmarks
    for (let i = 0; i < bookmarks.length; i++) {
        if (bookmarks[i].url == url) {
            // Remove specific bookmark from array
            bookmarks.splice(i, 1);
        }
    }

    // Add bookmarks back to local storage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    // Fetch bookmarks
    fetchBookmarks();
}

// Fetch bookmarks function
const fetchBookmarks = () => {
    // Get bookmarks from local storage
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    console.log(bookmarks);

    // Get output section
    const result = document.getElementById('bookmarks');

    // Build output
    result.innerHTML = ``;
    for (let i = 0; i < bookmarks.length; i++) {
        const name = bookmarks[i].name;
        const url = bookmarks[i].url;

        // Add output to DOM
        result.innerHTML += `
        <div class="bookmark">
            <a href="${url}" target="_blank" class="bookmark__name">${name}</a>
            <a href="#" class="bookmark__delete" onClick="removeBookmark('${url}')">X</a>
        </div>`;
    }
}

document.getElementById('bookmark-form').addEventListener('submit', addBookmark);