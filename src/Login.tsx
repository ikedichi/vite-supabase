import React from 'react';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';    
import { Card, Paper, Container, Box, Toolbar, Typography, Button } from "@mui/material";
import { useState } from "react";


export default function Login(props){

    const [enteredEmail, setEnteredEmail] = useState('');
    const [emailIsValid, setEmailIsValid] = useState();
    const [enteredPassword, setEnteredPassword] = useState('');
    const [passwordIsValid, setPasswordIsValid] = useState();
    const [formIsValid, setFormIsValid] = useState(false);
  
    const emailChangeHandler = (event) => {
      setEnteredEmail(event.target.value);
  
      setFormIsValid(
        event.target.value.includes('@') && enteredPassword.trim().length > 6
      );
    };
  
    const passwordChangeHandler = (event) => {
      setEnteredPassword(event.target.value);
  
      setFormIsValid(
        event.target.value.trim().length > 6 && enteredEmail.includes('@')
      );
      console.log(event.target.value.trim().length > 6 && enteredEmail.includes('@'))
    };
  
    const validateEmailHandler = () => {
      setEmailIsValid(enteredEmail.includes('@'));
    };
  
    const validatePasswordHandler = () => {
      setPasswordIsValid(enteredPassword.trim().length > 6);
    };
  
    const submitHandler = (event) => {
      event.preventDefault();
      props.onLogin(enteredEmail, enteredPassword);
    };
  
    return (
      <Box p={2}>
        <form onSubmit={submitHandler}>
          <div
            // className={`${classes.control} ${
            //   emailIsValid === false ? classes.invalid : ''
            // }`}
          >
            {/* <label placeholder="email">E-Mail</label> */}
            <input
              placeholder="email"
              type="email"
              id="email"
              value={enteredEmail}
              onChange={emailChangeHandler}
              onBlur={validateEmailHandler}
            />
          </div>
          <div
            //   passwordIsValid === false ? classes.invalid : ''
          >
            {/* <p placeholder="password">Password</p> */}
            <input
             placeholder="password"
              type="password"
              id="password"
              value={enteredPassword}
              onChange={passwordChangeHandler}
              onBlur={validatePasswordHandler}
            />
          </div>
          <div >
            <Button type="submit" disabled={!formIsValid}>
              Login
            </Button>
          </div>
        </form>
      </Box>
    )
}