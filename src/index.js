import React from "react";
import ReactDOM from "react-dom";
import { createResource } from "simple-cache-provider";

import "./styles.css";

const readBook = async () => {
  const res = await fetch(
    "https://www.googleapis.com/books/v1/volumes?q=%E3%82%AA%E3%83%96%E3%82%B8%E3%82%A7%E3%82%AF%E3%83%88%E6%8C%87%E5%90%91"
  );
  console.log(res);
  const books = await res.json();
  return books;
};

const Book = ({ books }) => (
  <div>
    <p>{books.items[0].volumeInfo.title}</p>
    <img
      src={books.items[0].volumeInfo.imageLinks.thumbnail}
      alt={books.items[0].volumeInfo.title}
    />
  </div>
);

class App extends React.Component {
  state = {
    isLoading: false,
    books: null
  };

  async requestData() {
    this.setState({ isLoading: true });
    this.setState({ books: await readBook() });
  }

  render() {
    return (
      <div className="App">
        <p>
          <button onClick={this.requestData.bind(this)}>load data</button>
        </p>
        {this.state.isLoading &&
          (this.state.books ? (
            <Book books={this.state.books} />
          ) : (
            <p>loading...</p>
          ))}
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
