import React from "react";
import { Button, Card } from "react-bootstrap";

function CarouselCard() {
  const CardBodyStyle = {
    background:
      "linear-gradient(90deg, #dfe5eb 0%, rgba(255,255,255,1) 10%, rgba(255,255,255,1) 80%, rgba(207,215,223,1) 100%)",
    borderRadius: "16px",
    border: `3px solid white`,
    boxShadow:
      "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px",
  };
  return (
    <div
      style={{
        width: "100%",
        height: "auto",
        marginBlock: "1em",
        paddingInline: "0.5em",
      }}>
      <Card className="text-center" style={CardBodyStyle}>
        <Card.Body>
          <Card.Title>Special title treatment</Card.Title>
          <Card.Text>
            With supporting text below as a natural lead-in to additional
            content.
          </Card.Text>
        </Card.Body>
        <Card.Footer className="text-muted">2 days ago</Card.Footer>
      </Card>
    </div>
  );
}

export default CarouselCard;
