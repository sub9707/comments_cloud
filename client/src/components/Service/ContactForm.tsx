import { faEnvelope, faMobileScreen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form, InputGroup } from "react-bootstrap";
import styled from "styled-components";
import { ServiceButton } from "./BannerLeft";
import { JustifyCenter } from "../../styles/FlexBoxStlye";
import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { useDispatch } from "react-redux";
import { addMessage } from "../../store/Utils/Alert";

function ContactForm() {
  const [loading, setLoading] = useState<boolean>(false);
  const form = useRef<HTMLFormElement | null>(null);
  const dispatch = useDispatch();

  const sendEmail = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!form.current) return;
    setLoading(true);
    console.log(import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "ss");
    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID || "",
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "",
        form.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY || ""
      )
      .then(
        (result) => {
          dispatch(
            addMessage({
              id: "unique_id",
              text: `문의사항이 접수되었습니다.`,
              type: "success",
            })
          );
          setLoading(false);
          console.log(result.text);
        },
        (error) => {
          setLoading(false);
          console.log(error.text);
        }
      );

    form.current.reset();
  };

  return (
    <ContactBox>
      <form ref={form} onSubmit={sendEmail}>
        <ContactTitle>Contact Us</ContactTitle>
        <br />
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">
            <FontAwesomeIcon icon={faEnvelope} />
          </InputGroup.Text>
          <Form.Control name="email" type="email" placeholder="Email" />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">
            <FontAwesomeIcon icon={faMobileScreen} />
          </InputGroup.Text>
          <Form.Control name="phone" type="tel" placeholder="연락처" />
        </InputGroup>
        <InputGroup className="mb-3 h-50">
          <Form.Control
            name="message"
            as="textarea"
            placeholder="문의 내용 입력"
          />
        </InputGroup>
        <JustifyCenter>
          <ServiceButton>{loading ? "전송 중.." : "전송"}</ServiceButton>
        </JustifyCenter>
      </form>
    </ContactBox>
  );
}

export default ContactForm;

const ContactBox = styled.div`
  width: 55%;
  height: 50vh;
  border-radius: 10px;
  position: absolute;
  left: 15em;
  display: flex;
  align-items: self-start;
  justify-content: center;
  box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px,
    rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
  form {
    width: 70%;
    height: 70%;
    margin-top: 2em;
  }
`;

const ContactTitle = styled.h2`
  text-align: center;
  font-family: "Happiness-Sans-Bold";
`;
