import React from "react";
import { Link } from "react-router-dom";

export default function PageNotFound() {
  return (
    <section className="App-center">
      <div>
        <h1>Oops! It's a dead end :(</h1>
        <Link to="/" className="btn btn-primary">
          Back Home
        </Link>
      </div>
    </section>
  );
}
