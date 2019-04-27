
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


    e.preventDefault();
}

document.getElementById('bookmark-form').addEventListener('submit', addBookmark);