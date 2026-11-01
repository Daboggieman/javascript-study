// Exercise 14: APIs & Fetch
// Run this script with: node exercises.js

// We will use the JSONPlaceholder API, a free public fake API for testing.
const URL = "https://jsonplaceholder.typicode.com/posts/1";

// TODO: Exercise 1
// Write a function named 'fetchPost' that makes a GET request to the URL using fetch.
// The function should return the object parsed from the JSON response.
// Handle potential errors and return null if the request fails.

async function fetchPost() {
  // Write your code here
  return null;
}

// Test your function:
async function main() {
  const post = await fetchPost();
  if (post) {
    console.log("Post fetched successfully!");
    console.log(`Title: ${post.title}`);
  } else {
    console.log("Failed to fetch post.");
  }


  // TODO: Exercise 2
  // Write code to parse and print the 'body' of the post in upper-case.

}

main();
