import { FormEventHandler, useEffect, useState } from 'react';
import './App.css';
import { supabase } from './supabase';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import * as React from 'react';
import CommentCard from './CommentCard';
import UndoIcon from '@mui/icons-material/Undo';

type Comment = {
  first_name: string;
  last_name: string;
  comment: string;
  schedule_date: string;
  email: string;
  id: number;
  is_deleted: boolean;

}

export default function Forms(props: { title: any; setCardFilter: (list: Comment[]) => void; }) {
  // const [is_deleted, setIs_Deleted] = useState(false)
  const [isEmpty, setIsEmpty] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [form, setForm] = useState<any>({});
  const [firstName, SetFirstName] = useState('');
  const [lastName, SetLastName] = useState('');
  const [email, SetEmail] = useState('');
  // const [comment, setComment] = useState('')
  const [date, setEnteredDate] = useState('');
  const [title, setTitle] = useState(props.title);
  const clickHandler = () => {
    setTitle(<input id="email" placeholder="change email" onChange={(e)=>SetEmail(e.target.value)}></input>
    );
    console.log(email); 
   
};

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    try {
      const { data, error } = await supabase
        .from('comments')
        .select()
        // .limit(3)
      if (error) throw error;
      if (data != null) {
        setComments(data)
      }
    }
    catch (error) {
      alert(error.message)
    }
  }
  
    async function onFormSubmit(event: React.FormEvent) {
      event.preventDefault();
      if(!form.first_name || !form.last_name || !form.email || !form.comment ){
        console.log('please fill in all fields')
        return;
        
      } else{console.log('w');}
  
      const result = await fetch(
        'https://avvidhxhjmaskwwewvey.supabase.co/rest/v1/comments',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            apikey:
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF2dmlkaHhoam1hc2t3d2V3dmV5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzEwMzc3MDgsImV4cCI6MTk4NjYxMzcwOH0.urgAvh6ctpOFwvZyBtl0JlIT-3Axvw_9eKBQhtFrmDY',
          },
          body: JSON.stringify(form),
        }
      );
      console.log(result);
      location.reload();
    }

useEffect(() => {
  getData();
}, []);



async function isDeleted(commentId: number) {
  const result = await fetch(
    'https://avvidhxhjmaskwwewvey.supabase.co/rest/v1/comments?id=eq.' + commentId,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        apikey:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF2dmlkaHhoam1hc2t3d2V3dmV5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzEwMzc3MDgsImV4cCI6MTk4NjYxMzcwOH0.urgAvh6ctpOFwvZyBtl0JlIT-3Axvw_9eKBQhtFrmDY',
      },
      body: JSON.stringify({ is_deleted: true })
      // comments.is_deleted
    }
  )
  getData();
}


function selectPerson() {

}

const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };


const menuClose = () => {
  setAnchorEl(null);
  location.reload()
}

  const handleNameFilter = () => {
    setAnchorEl(null);
   const FirstComment = comments.sort(function(a, b) {
    if (a.first_name < b.first_name) {
      return -1;
    }
    if (a.last_name > b.last_name) {
      return 1;
    }
    return 0;
  });
  console.log(FirstComment)
  // location.reload()
  props.setCardFilter([...FirstComment])
  };


  const handleDeleteFilter = () => {
    setAnchorEl(null);
   const DeletedComment = comments.sort(function(a, b) {
    if (a.is_deleted > b.is_deleted) {
      return -1;
    }
    if (a.is_deleted < b.is_deleted) {
      return 1;
    }
    return 0;
  });
  console.log(DeletedComment)
  props.setCardFilter([...DeletedComment])
  };

  const handleDateFilter = () => {
    setAnchorEl(null);
   const DateComment = comments.sort(function(a, b) {
    if (a.schedule_date < b.schedule_date) {
      return -1;
    }
    if (a.schedule_date > b.schedule_date) {
      return 1;
    }
    return 0;
  });
  console.log(DateComment)
  props.setCardFilter(DateComment)
  };


return (
  <div>
    {/* <CommentCard handleNameFilter={handleNameFilter}  />  */}
      <Button
        id="fade-button"
        aria-controls={open ? 'fade-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      > <div>
        Filter </div> 
      </Button>
        {{handleDateFilter} && 'car'}
      <Menu
        id="fade-menu"
        MenuListProps={{
          'aria-labelledby': 'fade-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={menuClose}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={handleDateFilter}>by Date</MenuItem>
        <MenuItem onClick={handleNameFilter}>By Name</MenuItem>
        <MenuItem onClick={handleDeleteFilter}>By Deleted</MenuItem>
      </Menu>



    <form onSubmit={onFormSubmit} id="form">
      <div>
        <input id="first_name" placeholder="first name"

          onChange={(e) => {
            setForm((prev) => ({ ...prev, first_name: e.target.value }));
          }} ></input>
      </div>
      <div>
        <label></label>
        <input type="string" placeholder="last name"
          onChange={(e) => {
            setForm((prev) => ({ ...prev, last_name: e.target.value }));
          }}></input>
      </div>
      <label></label>
      <input type="string" placeholder="email"
        onChange={(e) => {
          setForm((prev) => ({ ...prev, email: e.target.value }));
        }}></input>
      <div>
        <input type="string" placeholder="comment"
          onChange={(e) => {
            setForm((prev) => ({ ...prev, comment: e.target.value }));
          }}></input>
      </div>
      <div>
        <label>date</label>
        <input type="date" placeholder="date"
          onChange={(e) => {
            setForm((prev) => ({ ...prev, schedule_date: e.target.value }));
          }}></input>
        </div>
        <button onClick={()=>onFormSubmit(comment.id)}> submit</button>
        {/* <button type='submit'>Submit</button> */}
      </form>
      <button
       onClick={()=>selectPerson(comment.id)}
      >
        update
      </button>
  </div>
    )};
