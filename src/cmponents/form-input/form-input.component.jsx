import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./form-input.styles.css";

const FormInput = ({ label, type, name, placeholder, onChange ,value }) => {
  return (
    <div>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label className="label">{label}</Form.Label>
          <Form.Control
            type={type}
            placeholder={placeholder}
            name={name}
            onChange={onChange}
            value={value}
          />
        </Form.Group>
        
      </Form>
    </div>
  );
};

export default FormInput;
