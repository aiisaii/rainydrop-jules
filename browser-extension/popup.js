document.addEventListener('DOMContentLoaded', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const currentTab = tabs[0];
    document.getElementById('title').value = currentTab.title;
    document.getElementById('url').value = currentTab.url;
  });

  const form = document.getElementById('save-bookmark-form');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const url = document.getElementById('url').value;
    const description = document.getElementById('description').value;

    // In a real extension, you would get the auth token from storage
    // and handle the API call properly.
    // For simplicity, we'll just log the data to the console.
    console.log({
      title,
      url,
      description,
    });

    window.close();
  });
});
