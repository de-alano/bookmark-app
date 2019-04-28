// Get favicon from added website
const getFavicon = (url) => {
    let favicon = `https://s2.googleusercontent.com/s2/favicons?domain=${url}`;

    return favicon;
}


// Add bookmark function
const addBookmark = e => {
    // Get input values
    const siteURL = document.getElementById('url').value;
    const siteName = document.getElementById('name').value;

    // Create bookmark object
    const bookmark = {
        url: siteURL,
        name: siteName,
        // Get favicon
        icon: getFavicon(siteURL)
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

    // Set focus on the url field
    document.getElementById('url').focus();

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

    // Get output section
    const result = document.getElementById('bookmarks');

    // Build output
    result.innerHTML = ``;
    for (let i = 0; i < bookmarks.length; i++) {
        const name = bookmarks[i].name;
        const url = bookmarks[i].url;
        const icon = bookmarks[i].icon;

        // Add output to DOM
        result.innerHTML += `
        <div class="bookmark">
            <div class="bookmark__content">
            <a href="${url}" target="_blank" class="bookmark__link"><img src="${icon}" class="bookmark__icon"></a>
            <a href="#" class="bookmark__delete" onClick="removeBookmark('${url}')">X</a>
            <a href="${url}" target="_blank" class="bookmark__name">${name}</a>
            </div>
        </div>`;
    }
}

document.getElementById('bookmark-form').addEventListener('submit', addBookmark);