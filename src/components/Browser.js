import React, { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import Container from "react-bootstrap/Container";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

import { browser } from "../util/axios";
import BrowserItem from "./BrowserItem";

function Browser() {
  const { path } = useParams();
  const history = useHistory();
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState(undefined);

  useEffect(() => {
    browser
      .get(path || "")
      .then((response) => {
        console.log(response.data);
        if (response.headers["content-type"] === "application/json") {
          setEntries(response.data);
          setError(undefined);
        } else {
          setError({
            status: 418,
            statusText: "I'm a teapot",
            data: "Not a directory.",
          });
          setEntries([]);
        }
      })
      .catch((error) => {
        setEntries([]);
        if (error.response) {
          console.error(error.response);
          const doc = document.implementation.createHTMLDocument("");
          // We can do this because we know the source is safe.
          // Otherwise shouldn't be used.
          doc.documentElement.innerHTML = error.response.data;
          error.response.data = doc.querySelector("p").textContent;
          setError(error.response);
        } else if (error.request) {
          console.error(error.request);
          setError({
            status: "5XX",
            statusText: "UNKOWN SERVER ERROR",
            data:
              "It seems that an error has occured on the server and no response was received.",
          });
        } else {
          console.error(error.message);
          setError({
            status: "4XX",
            statusText: "UNKOWN CLIENT ERROR",
            data:
              "Seems that something happened in setting up the request that triggered an error.",
          });
        }
      });

    return () => {
      // cleanup
    };
  }, [path]);

  const pathSubtrings = (path || "").split("/");
  pathSubtrings.pop();
  const parentPath = pathSubtrings.join("/");

  return (
    <Container fluid>
      <ButtonGroup className="my-4">
        <Link className="btn btn-outline-primary" to={`/browser/${parentPath}`}>
          Move up directory
        </Link>
        <Button variant="outline-light">Copy path to directory</Button>
      </ButtonGroup>

      {error && (
        <Alert variant="danger">
          <Alert.Heading>
            {`${error.status} >> ${error.statusText}`}
          </Alert.Heading>
          <p>{error.data}</p>
          <hr />
          <div className="d-flex justify-content-end">
            <Button onClick={() => history.goBack()} variant="outline-danger">
              Go back
            </Button>
          </div>
        </Alert>
      )}

      {entries.map((entry) => (
        <BrowserItem key={entry.path} entry={entry} />
      ))}
    </Container>
  );
}

export default Browser;
