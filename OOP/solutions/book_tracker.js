"use strict";
// from the directions in the python exercise folder, there are quite a few things
// to consider, add:
// logs should be saved in a json file.
// books should be given an id, use this medium to learn json file data arrangements
// and schematics.
// actions ON or WITH books should be subject to as many books as are involved,
// instead of assigning actions to books one by one.
// add a search system to it, and integrate some of the things u've learnt from DSA
// in here.

const fs = require("fs");
const os = require("os");
const path = require("path");

function loadJson(filepath) {
  if (fs.existsSync(filepath) && fs.statSync(filepath).size) {
    try {
      return JSON.parse(fs.readFileSync(filepath, "utf8"));
    } catch (e) {
      if (e instanceof SyntaxError) {
        throw new Error(`Inventory log at ${filepath} is corrupted`);
      }
      throw e;
    }
  }
  return [];
}

function appendJsonEntry(filepath, entry) {
  const records = loadJson(filepath);
  records.push(entry);

  const directory = path.dirname(filepath) || ".";
  const tmpPath = path.join(
    directory,
    `.tmp-${process.pid}-${Date.now()}${Math.random().toString(36).slice(2)}.tmp`
  );
  try {
    fs.writeFileSync(tmpPath, JSON.stringify(records, null, 2));
    fs.renameSync(tmpPath, filepath);
  } catch (e) {
    if (fs.existsSync(tmpPath)) {
      fs.unlinkSync(tmpPath);
    }
    throw e;
  }
}

function formatInput(word) {
  if (typeof word !== "string") {
    throw new Error("input type must be a string");
  }
  word = word.trim().toLowerCase();
  if (word.length < 1) {
    throw new Error("invalid input");
  }
  return word;
}

class Book {
  constructor(bookId, title, author, isbn, location, rating) {
    this.bookId = bookId;
    this.title = title;
    this.author = author;
    this.isbn = isbn;
    this.location = location;
    this.rating = rating;
    this.isCheckedOut = false;
    this.givenTo = null;
    this.dateAdded = Date.now() / 1000; // time.time() analog: seconds
    this.checkoutDate = null;
  }

  toDict() {
    return {
      id: this.bookId,
      isbn: this.isbn,
      title: this.title,
      author: this.author,
      rating: this.rating,
      location: this.location,
      is_checked_out: this.isCheckedOut,
      given_to: this.givenTo,
      date_added: this.dateAdded,
      checkout_date: this.checkoutDate,
    };
  }

  toString() {
    return `Book(${this.bookId}, ${JSON.stringify(this.title)}, isbn=${JSON.stringify(this.isbn)})`;
  }
}

class Library {
  constructor(filepath) {
    this.filepath = filepath;
    this.books = new Map();
    this._isbnIndex = new Map();
    this._nextId = 1;
  }

  _logAction(action, book, extra = null) {
    const entry = Object.assign({ action }, book.toDict());
    if (extra) {
      Object.assign(entry, extra);
    }
    appendJsonEntry(this.filepath, entry);
    return entry;
  }

  addBook(title, author, isbn, location, rating) {
    if (this._isbnIndex.has(isbn)) {
      throw new Error(`Book with isbn ${isbn} already exists`);
    }

    const book = new Book(this._nextId, title, author, isbn, location, rating);
    this.books.set(book.bookId, book);
    this._isbnIndex.set(isbn, book.bookId);
    this._nextId += 1;

    return this._logAction("add_book", book);
  }

  checkout(bookIds, givenTo) {
    if (typeof bookIds === "string" || typeof bookIds === "number") {
      bookIds = [bookIds];
    }

    const results = [];
    for (const bookId of bookIds) {
      const book = this.books.get(bookId);
      if (book === undefined) {
        throw new Error(`No book with id ${bookId}`);
      }
      if (book.isCheckedOut) {
        throw new Error(`'${book.title}' is already checked out`);
      }

      book.isCheckedOut = true;
      book.givenTo = givenTo;
      book.checkoutDate = Date.now() / 1000;
      results.push(this._logAction("checkout", book));
    }

    return results;
  }

  returnBook(bookIds) {
    if (typeof bookIds === "string" || typeof bookIds === "number") {
      bookIds = [bookIds];
    }

    const results = [];
    for (const bookId of bookIds) {
      const book = this.books.get(bookId);
      if (book === undefined) {
        throw new Error(`No book with id ${bookId}`);
      }
      if (!book.isCheckedOut) {
        throw new Error(`'${book.title}' was not checked out`);
      }

      book.isCheckedOut = false;
      book.givenTo = null;
      book.checkoutDate = null;
      results.push(this._logAction("return_book", book));
    }

    return results;
  }

  removeBook(bookId) {
    const book = this.books.get(bookId);
    if (book === undefined) {
      throw new Error(`No book with id ${bookId}`);
    }
    this.books.delete(bookId);
    this._isbnIndex.delete(book.isbn);
    return this._logAction("remove_book", book);
  }

  findBook(bookId) {
    return this.books.get(bookId);
  }

  findByIsbn(isbn) {
    const bookId = this._isbnIndex.get(isbn);
    return bookId !== undefined ? this.books.get(bookId) : undefined;
  }

  listAvailable() {
    const available = [];
    for (const b of this.books.values()) {
      if (!b.isCheckedOut) {
        available.push(b);
      }
    }
    return available;
  }

  search(query) {
    query = formatInput(query);
    const matches = [];
    for (const b of this.books.values()) {
      if (b.title.toLowerCase().includes(query) || b.author.toLowerCase().includes(query)) {
        matches.push(b);
      }
    }
    return matches;
  }
}

// note: a Node CLI wrapper for the original `input()` line isn't run here to
// keep this a plain module; call the methods directly as in the python original.
module.exports = { Book, Library, formatInput, loadJson, appendJsonEntry };
