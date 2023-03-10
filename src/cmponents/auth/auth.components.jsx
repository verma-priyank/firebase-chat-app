import { useState } from 'react';

import { signInAuthWithEmailAndPassword } from '../../utils/firbase.utils';
import SignUp from '../sign-up/sign-up.components';
import SignIn from '../sign-in/sign-in.component';
import { Loginpageselector } from '../../store/users/user.selector';

import "./auth.styles.css"
import { useSelector } from 'react-redux';
function Auth() {
  const isLoginSetup = useSelector(Loginpageselector)

  
   
 

  return (
   <div className='auth-container'>
   {isLoginSetup?<SignIn/> :<SignUp />}
   </div>
  );
}

export default Auth;