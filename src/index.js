import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

const readBook = async () => {
  const res = await fetch(
    "https://www.googleapis.com/books/v1/volumes?q=%E3%82%AA%E3%83%96%E3%82%B8%E3%82%A7%E3%82%AF%E3%83%88%E6%8C%87%E5%90%91"
  );
  console.log(res);
  const books = await res.json();
  return books;
};

class Books extends React.Component {
  state = {
    isLoaded: false
  };

  // onComponentDidMount() {
  //   const img = document.createElement("img");
  //   const books = this.props.books;
  //   img.src = books.items[0].volumeInfo.imageLinks.thumbnail;
  // }

  onLoad() {
    console.log("hoge");
    this.setState({ isLoaded: true });
  }

  render() {
    const books = this.props.books;
    const visibilityState = this.state.isLoaded ? "visible" : "hidden";
    const visibilityStateU = this.state.isLoaded ? "hidden" : "visible";

    return (
      <div>
        <p>{books.items[0].volumeInfo.title}</p>
        <p style={{ visibility: visibilityStateU }}>image loading...</p>
        <img
          src={books.items[0].volumeInfo.imageLinks.thumbnail}
          alt={books.items[0].volumeInfo.title}
          onLoad={this.onLoad.bind(this)}
          style={{ visibility: visibilityState }}
        />
      </div>
    );
  }
}

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
            <Books books={this.state.books} />
          ) : (
            <p>loading...</p>
          ))}
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
