import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { FormEventHandler, useEffect, useState } from "react";
import "./App.css";
import { FaTrash } from "react-icons/fa";
import { supabase } from "./supabase";
import Typography from "@mui/material/Typography";
import Box from '@mui/material/Box'
import {EmailRounded, QuestionMark, DeleteForeverRounded, CommentBankTwoTone, Person2Rounded, DateRangeRounded} from '@mui/icons-material'
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Forms from "./Forms";
import CommentCard from "./CommentCard";


export type Comment = {
  first_name: string;
  last_name: string;
  comment: string;
  schedule_date: string;
  email: string;
  id: number;
  is_deleted: boolean;
};

const Card = () => {
  const [orderBy, setIsEmpty] = useState('created_at');
  const [comments, setComments] = useState<Comment[]>();
  const [form, setForm] = useState<any>({});
  const [firstName, SetFirstName] = useState("");
  const [lastName, SetLastName] = useState("");
  const [email, SetEmail] = useState("");

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    try {
      const { data, error } = await supabase
      .from("comments")
      .select()
      // .limit(1)
      .order(orderBy,  {ascending: false} );
      if (error) throw error;
      if (data != null) {
        setComments(data);
      }
    } catch (error) {
      alert(error.message);
    }
  }



  async function Order(){
    setIsEmpty('created_at')
  }
   
async function isDeleted(commentId: number) {
  // TODO: Add code to update comment
  // let is_deleted = true
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


async function isNotDeleted(commentId: number) {
  const result = await fetch(
    'https://avvidhxhjmaskwwewvey.supabase.co/rest/v1/comments?id=eq.' + commentId,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        apikey:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF2dmlkaHhoam1hc2t3d2V3dmV5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzEwMzc3MDgsImV4cCI6MTk4NjYxMzcwOH0.urgAvh6ctpOFwvZyBtl0JlIT-3Axvw_9eKBQhtFrmDY',
      },
      body: JSON.stringify({is_deleted: false })
      // comments.is_deleted
    }
  )
  getData();
 
}


  return (
    <div>
      <div>.</div>
      <Forms setCardFilter={setComments} title = 'Namejhjh'></Forms>
      {/* <Forms title ='car'></Forms> */}
      {comments &&
        comments.map((comment) => {
          return (
            <CommentCard key={comment.id} comment={comment} 
            isDeleted={isDeleted} isNotDeleted={isNotDeleted} />           
          );
        })}
    </div>
  );
};

export default Card;
