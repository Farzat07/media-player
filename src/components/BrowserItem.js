import React from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { escapeFileURL } from "../util/escape";

function BrowserItem({ entry }) {
  const { name, path, permissions, type, filetype } = entry;
  return (
    <Row noGutters>
      <Col>
        <Link
          className="btn btn-outline-light btn-block"
          to={"/browser" + escapeFileURL(path)}
        >
          {name}
        </Link>
      </Col>
      <Col sm="2">
        {type !== "file" && (
          <Button variant="outline-danger" block>
            {type === "directory" ? "Play" : "+ Playlist"}
          </Button>
        )}
      </Col>
      <Col sm="auto">
        <Button variant="outline-info" block>
          Info
        </Button>
      </Col>
    </Row>
  );
}

export default BrowserItem;
