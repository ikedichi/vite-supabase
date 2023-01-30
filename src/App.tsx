// import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
// import Forms from './Forms'
import NewForm from './NewForm'
import Forms from './Forms'
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Card from './Card'
import PrimarySearchAppBa from './AppBars'
import { CenterFocusStrong, ForkLeft } from '@mui/icons-material';
import cities from './Forms'
import { Paper, Typography } from '@mui/material';
import { supabase } from "./supabase";
import React, { FormEventHandler, useEffect, useState } from "react";
import Box from '@mui/material/Box'
import {EmailRounded, CommentBankTwoTone, Person2Rounded, DateRangeRounded} from '@mui/icons-material';
import Menu from "./Login"
import Login from './Login';



type Comment = {
  first_name: string;
  last_name: string;
  comment: string;
  schedule_date: string;
  email: string;
  id: number;
  is_deleted: boolean;
};

function App() {
  const [count, setCount] = useState(0)
  const  [isEmpty, setIsEmpty] = useState(false);
  const [comments, setComments] = useState<Comment[]>();
  const [form, setForm] = useState<any>({});
  const [firstName, SetFirstName] = useState('');
  const [lastName, SetLastName] = useState('');
  const [email, SetEmail] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    getData();
  }, []);

async function getData(){
  try {
    const {data, error} = await supabase
    .from('comments')
    .select()
    if(error) throw error;
    if(data !=null){
      setComments(data)
    }
  }
  catch(error){
    alert(error.message)
  }
}
  
const loginHandler = (email, password) => {
  // i should of course check email and password
  // But it's just a dummy/ demo anyways
  setIsLoggedIn(true);3 
};

const logoutHandler = () => {
  setIsLoggedIn(false);
};

  return (
    <div className='App'>
      <PrimarySearchAppBa onLogout={logoutHandler}/>
      {!isLoggedIn &&<Login onLogin={loginHandler} />}
      {  <Card></Card>}
      {/* <Menu></Menu> */}
    {/* <Container sx={{ margin: 9}}> */}
   
        {/* {comments&&comments.map((comment)=>(
          <>
          <Typography></Typography>
          <Grid>
            {comment.last_name}
          </Grid>
            </>
        ))} */}
   
    {/* < Grid> */}
     {/* <Forms></Forms> */}

     {/* <Card></Card>
     <Card></Card> */}
    {/* </Grid> */}
    {/* </Container> */}
    </div>
  )
}

export default App
