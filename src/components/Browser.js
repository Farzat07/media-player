import React, { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import Container from "react-bootstrap/Container";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

import { browser } from "../util/axios";
import { handleAxiosError } from "../util/handleError";
import BrowserItem from "./BrowserItem";
import CopyAlert from "./CopyAlert";

function Browser() {
  const { path = "" } = useParams();
  const history = useHistory();
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState(undefined);
  const [copyText, setCopyText] = useState("");

  useEffect(() => {
    browser
      .get(path)
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
        setError(handleAxiosError(error));
      });

    return () => {
      setCopyText("");
    };
  }, [path]);

  const pathSubtrings = path.split("/");
  pathSubtrings.pop();
  const parentPath = pathSubtrings.join("/");

  return (
    <Container fluid>
      <ButtonGroup className="my-4">
        <Link className="btn btn-outline-primary" to={`/browser/${parentPath}`}>
          Move up directory
        </Link>
        <Button onClick={() => setCopyText(`/${path}`)} variant="outline-light">
          Copy path to directory
        </Button>
      </ButtonGroup>

      <CopyAlert copyText={copyText} onClose={() => setCopyText("")} />

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
