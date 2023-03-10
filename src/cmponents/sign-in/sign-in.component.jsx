import { useState } from "react";
import { Button } from "react-bootstrap";
import {
  createUserDocumentFromAuth,
  signInAuthWithEmailAndPassword,
} from "../../utils/firbase.utils";
import { useDispatch, useSelector } from "react-redux";
import { setUserDocRef } from "../../store/users/users.action";
import { Loginpageselector } from "../../store/users/user.selector";
import FormInput from "../form-input/form-input.component";
import "./sign-in.styles.css";
import { setisLogin } from "../../store/users/users.action";

const SignIn = () => {
  const dispatch = useDispatch();
  const isLoginSetup = useSelector(Loginpageselector);
  const [formField, setformfield] = useState({
    email: "",
    password: " ",
  });
  const { email, password } = formField;
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setformfield({
      ...formField,
      [name]: value,
    });
  };
  const onClickHandler = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      return alert("Please enter your email and password");
    }
    try {
      const { user } = await signInAuthWithEmailAndPassword(email, password);
      const res = await createUserDocumentFromAuth(user);
      console.log("signup" ,res)
      dispatch(setUserDocRef(res));
    } catch (error) {
      alert(error.code);
    }
  };
  const loginSetUpHandler = () => {
    dispatch(setisLogin(!isLoginSetup));
  };
  // do not use inline css
  return (
    <div className="sign-in-form">
      <h3 style={{ color: "grey" }}>Welcome to the Meet Box</h3>
      <span style={{ color: "grey" }}>
        Don,t have an acoout ?{" "}
        <Button variant="link" onClick={loginSetUpHandler}>
          register
        </Button>{" "}
        here
      </span>
      <FormInput
        name="email"
        onChange={onChangeHandler}
        label="Email Address"
        type="email"
        placeholder=" Email Address"
      />
      <FormInput
        name="password"
        onChange={onChangeHandler}
        label="Password"
        type="password"
        placeholder=" Password"
      />
      <div className="button-container">
        <Button className="button" onClick={onClickHandler}>
          Sign In
        </Button>
      </div>
    </div>
  );
};

export default SignIn;
