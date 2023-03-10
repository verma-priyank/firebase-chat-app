import { useState } from "react";
import Button from "react-bootstrap/Button";

import { useDispatch, useSelector } from "react-redux";
import { setUserDocRef } from "../../store/users/users.action";
import { Loginpageselector } from "../../store/users/user.selector";
import { setisLogin } from "../../store/users/users.action";
import FormInput from "../form-input/form-input.component";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firbase.utils";
import "./sign-up.styles.css";
const SignUp = () => {
  const dispatch = useDispatch();
  const isLoginSetup = useSelector(Loginpageselector);
  const [formField, setformfield] = useState({
    displayName: "",
    email: "",
    password: "",
    confirmpassword: "",
  });
  const { displayName, email, password, confirmpassword } = formField;
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setformfield({
      ...formField,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmpassword) {
      return alert("password Does not match");
    } else {
      try {
        const { user } = await createAuthUserWithEmailAndPassword(
          email,
          password
        );
        if(user){
        await createUserDocumentFromAuth(user, { displayName });
        const res = await createUserDocumentFromAuth(user, { displayName });
        console.log("signup" , res)
       
        dispatch(setUserDocRef(res));
        }
        setformfield({
          displayName: "",
          email: "",
          password: "",
          confirmpassword: "",
        });
      } catch (error) {
        alert(error.code);
      }
    }
  };
  const loginSetUpHandler = () => {
    dispatch(setisLogin(!isLoginSetup));
  };

  return (
    <div className="signup-form-container">
      <h2 className="sign-up-heading" style={{ color: "grey" }}>
        Sign Up Page
      </h2>
      <span style={{ color: "grey" }}>
        Already have an account ?{" "}
        <button onClick={loginSetUpHandler} className="sign-in-button">
          Login
        </button>{" "}
        here
      </span>
      <FormInput
        name="displayName"
        onChange={onChangeHandler}
        label="Display Name"
        type="text"
        placeholder="displayName"
        value={displayName}
      />
      <FormInput
        name="email"
        onChange={onChangeHandler}
        label="Email Address"
        type="email"
        placeholder="Email Address"
        value={email}
      />
      <FormInput
        name="password"
        onChange={onChangeHandler}
        label="Password"
        type="password"
        placeholder=" Password"
        value={password}
      />
      <FormInput
        name="confirmpassword"
        onChange={onChangeHandler}
        label="Confirm Password"
        type="password"
        placeholder="Confirm Password"
        value={confirmpassword}
      />
      <div className="button-container">
        <Button className="button" onClick={handleSubmit}>
          Sign Up
        </Button>
      </div>
    </div>
  );
};

export default SignUp;
