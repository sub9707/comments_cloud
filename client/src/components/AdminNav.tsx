import { Badge } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import styled from "styled-components";

const UserBox = styled.p`
  min-width: 10%;
  color: white;
  font-weight: 700;
  display: flex;
  justify-content: center;
  margin-top: 1em;
`;

export default function AdminNav() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary" data-bs-theme="dark">
      <Container>
        <Navbar.Brand as={Link} to="/admin">
          관리자 페이지
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              홈으로
            </Nav.Link>
            <Nav.Link as={Link} to="/admin/user">
              유저 관리
            </Nav.Link>
            <Nav.Link as={Link} to="/admin/board">
              게시글 관리
            </Nav.Link>
            <Nav.Link as={Link} to="/admin/notice">
              공지사항 관리
            </Nav.Link>
            <NavDropdown title="드롭다운" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <UserBox>
            <Badge
              bg="danger"
              style={{ marginRight: "1em", marginTop: "0.3em" }}>
              관리자
            </Badge>
            이름
          </UserBox>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
