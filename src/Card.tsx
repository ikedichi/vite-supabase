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
  const [isEmpty, setIsEmpty] = useState(false);
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
      const { data, error } = await supabase.from("comments").select();
      if (error) throw error;
      if (data != null) {
        setComments(data);
      }
    } catch (error) {
      alert(error.message);
    }
  }

//   async function deleteComment(){
//     try {
//       const {data, error} = await supabase
//       .from('comments')
//       .delete()
//       .eq('id', comments.id)
//     //   select()
//       if(error) throw error;
//       window;location.reload();
//     }
//     catch(error){
//       alert(error.message)
//       console.log(error)
//     }
// }

// async function deleteComment(commentId: number) {
//   // Call API to delete comment
//   const result = await fetch(
//       'https://avvidhxhjmaskwwewvey.supabase.co/rest/v1/comments?id=eq.' + commentId,
//       {
//         method: 'DELETE',
//         headers: {
//           apikey:
//             'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF2dmlkaHhoam1hc2t3d2V3dmV5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzEwMzc3MDgsImV4cCI6MTk4NjYxMzcwOH0.urgAvh6ctpOFwvZyBtl0JlIT-3Axvw_9eKBQhtFrmDY',
//         }
//       }
//   );

//   getData();
// }


    // async function deleteComment(commentId: number) {
    //     // Call API to delete comment
    //     const result = await fetch(
    //         'https://avvidhxhjmaskwwewvey.supabase.co/rest/v1/comments?id=eq.' + commentId,
    //         {
    //           method: 'DELETE',
    //           headers: {
    //             apikey:
    //               'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF2dmlkaHhoam1hc2t3d2V3dmV5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzEwMzc3MDgsImV4cCI6MTk4NjYxMzcwOH0.urgAvh6ctpOFwvZyBtl0JlIT-3Axvw_9eKBQhtFrmDY',
    //           }
    //         }
    //     );

    //     getData();
    // }

   
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
let Email = SetEmail

async function updadte(commentId: number) {
  const result = await fetch(
    'https://avvidhxhjmaskwwewvey.supabase.co/rest/v1/comments?id=eq.' + commentId,
    {
      method: 'POST ',
      headers: {
        'Content-Type': 'application/json',
        apikey:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF2dmlkaHhoam1hc2t3d2V3dmV5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzEwMzc3MDgsImV4cCI6MTk4NjYxMzcwOH0.urgAvh6ctpOFwvZyBtl0JlIT-3Axvw_9eKBQhtFrmDY',
      },
      body: JSON.stringify({ email: email})
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

 let title = 'car'


  return (
    <div>
      <div>.</div>
      <Forms></Forms>
      {comments &&
        comments.map((comment) => {
          return (
            <CommentCard key={comment.id} comment={comment} isDeleted={isDeleted} isNotDeleted={isNotDeleted} updadte={updadte} />            
          );
        })}
    </div>
  );
};

export default Card;
