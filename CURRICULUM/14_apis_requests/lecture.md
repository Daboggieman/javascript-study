# Lecture 14: APIs & Fetch

An **Application Programming Interface (API)** allows different software applications to communicate with each other over the web. Most web APIs use the HTTP protocol and exchange data in the **JSON** format.

---

## 1. How Web APIs Work
When you make a request to a web server (like typing a URL into a browser), the server responds.
- **Client**: Your program making the request.
- **Server**: The remote computer listening for requests and returning responses.
- **HTTP Methods**:
  - `GET`: Retrieve data from the server.
  - `POST`: Send new data to the server.
  - `PUT`/`PATCH`: Update existing data on the server.
  - `DELETE`: Remove data from the server.
- **Status Codes**:
  - `200 OK`: Request succeeded.
  - `201 Created`: Resource successfully created.
  - `400 Bad Request`: The server could not understand the request.
  - `404 Not Found`: The requested resource does not exist.
  - `500 Internal Server Error`: The server encountered an error.

---

## 2. Using the Built-in `fetch` (No Installation)
Node.js (18+) ships with a global `fetch` function — the analog of Python's `requests`, already installed. Because network calls take time, `fetch` returns a **Promise**, which we handle with `async`/`await` (covered in depth later — for now, copy the `async function` pattern):

```js
async function main() {
  const response = await fetch("https://api.github.com/users/octocat");

  // Check status code
  if (response.status === 200) {
    // Parse JSON response
    const data = await response.json();
    console.log(data.name);      // The Octocat
    console.log(data.company);   // @github
  } else {
    console.log(`Failed to fetch data: ${response.status}`);
  }
}

main();
```

Key differences from Python's `requests`:
- `response.status` (not `status_code`).
- `response.json()` is also asynchronous — `await` it too.
- **`fetch` does not raise an error for 404 or 500!** It only rejects on network failures. Always check `response.ok` (true for 200–299) or `response.status` yourself.

---

## 3. Sending Headers (and Other Options)
`fetch` takes an options object as its second argument — this is where you set methods, headers, and bodies:

```js
async function main() {
  const url = "https://api.github.com/users/octocat";
  // Add a User-Agent header so the API doesn't block the request
  const response = await fetch(url, {
    headers: { "User-Agent": "JavaScript Study Client" },
  });

  try {
    if (response.ok) {
      const data = await response.json();
      console.log(data.name);
    }
  } catch (err) {
    console.log(`Error occurred: ${err.message}`);
  }
}

main();
```

If you ever want a richer third-party client (retries, interceptors), the popular npm package is `axios` — but `fetch` covers everything in this course.

---

## 🧠 Try It Yourself
1. Use the public API `https://jsonplaceholder.typicode.com/todos/1` to fetch a sample todo item and print its title.
2. Experiment with error handling in case the API endpoint is down or returning a 404 status (remember: check `response.ok` yourself).
