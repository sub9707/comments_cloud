import React from "react";
import { Nav } from "react-bootstrap";

function RankingTabs() {
  return (
    <Nav justify variant="tabs" defaultActiveKey="main" className="w-50">
      <Nav.Item>
        <Nav.Link eventKey="main">Active</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="link-1">Link</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="link-2">Link</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="link-3">Link</Nav.Link>
      </Nav.Item>
    </Nav>
  );
}

export default RankingTabs;
