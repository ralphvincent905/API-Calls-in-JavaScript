document.getElementById('fetchBtn').addEventListener('click', function() {
    fetchDataWithFetch();
});

document.getElementById('xhrBtn').addEventListener('click', function() {
    fetchDataWithXHR();
});

document.getElementById('postForm').addEventListener('submit', function(event) {
    event.preventDefault();
    postData();
});

document.getElementById('putForm').addEventListener('submit', function(event) {
    event.preventDefault();
    putData();
});

function fetchDataWithFetch() {
    const url = 'https://jsonplaceholder.typicode.com/posts/1';

    fetch(url)
        .then(response => response.json())
        .then(data => {
            document.getElementById('title').textContent = `Title: ${data.title}`;
            document.getElementById('body').textContent = `Body: ${data.body}`;
            displayMessage('Data fetched successfully!', 'success');
        })
        .catch(error => {
            displayMessage(`Error fetching data: ${error.message}`, 'error');
        });
}

function fetchDataWithXHR() {
    const url = 'https://jsonplaceholder.typicode.com/posts/2';
    const xhr = new XMLHttpRequest();

    xhr.open('GET', url, true);
    xhr.onload = function() {
        if (xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            document.getElementById('title').textContent = `Title: ${data.title}`;
            document.getElementById('body').textContent = `Body: ${data.body}`;
            displayMessage('Data fetched successfully!', 'success');
        } else {
            displayMessage(`Error: ${xhr.status}`, 'error');
        }
    };
    xhr.onerror = function() {
        displayMessage('Network error occurred.', 'error');
    };
    xhr.send();
}

function postData() {
    const title = document.getElementById('postTitle').value;
    const body = document.getElementById('postBody').value;
    const url = 'https://jsonplaceholder.typicode.com/posts';

    const postData = {
        title: title,
        body: body,
        userId: 1
    };

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
    })
        .then(response => response.json())
        .then(data => {
            displayMessage(`Post created: ${JSON.stringify(data)}`, 'success');
        })
        .catch(error => {
            displayMessage(`Error posting data: ${error.message}`, 'error');
        });
}

function putData() {
    const id = document.getElementById('postId').value;
    const title = document.getElementById('putTitle').value;
    const body = document.getElementById('putBody').value;
    const url = `https://jsonplaceholder.typicode.com/posts/${id}`;

    const putData = {
        title: title,
        body: body,
        userId: 1
    };

    const xhr = new XMLHttpRequest();
    xhr.open('PUT', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function() {
        if (xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            displayMessage(`Post updated: ${JSON.stringify(data)}`, 'success');
        } else {
            displayMessage(`Error: ${xhr.status}`, 'error');
        }
    };
    xhr.onerror = function() {
        displayMessage('Network error occurred.', 'error');
    };
    xhr.send(JSON.stringify(putData));
}

function displayMessage(message, type) {
    const messageElement = document.getElementById('message');
    messageElement.textContent = message;
    messageElement.className = type === 'error' ? 'error' : 'success';
}