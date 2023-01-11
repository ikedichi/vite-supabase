import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { FormEventHandler, useEffect, useState } from "react";
import "./App.css";
import { FaTrash } from "react-icons/fa";
import { supabase } from "./supabase";
import Typography from "@mui/material/Typography";
import Box from '@mui/material/Box'
import {EmailRounded, CommentBankTwoTone, Person2Rounded, DateRangeRounded} from '@mui/icons-material'
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

type Comment = {
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

  async function deleteComment(){
    try {
      const {data, error} = await supabase
      .from('comments')
      .delete()
      .eq('id', comments.id)
    //   select()
      if(error) throw error;
      window;location.reload();
    }
    catch(error){
      alert(error.message)
      console.log(error)
    }
}

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


  return (
    <div>
      {comments &&
        comments.map((comment) => {
          return (
            <div>
            {/* <Grid container spacing={4}> */}
            <Grid item key={comment.id} >
                
              <Paper elevation={5} >
              <Box     sx={{
                    alignItems: 'left',
                    borderSpacing: '',
                    display: 'flex'
                    }}>
              <Person2Rounded/>
                <Typography color={'blue'} variant="h6" component="h2">
                  {comment.first_name} {comment.last_name} {comment.id}
                </Typography>
                </Box>
                <Box     sx={{
                    // alignItems: 'left',
                    display: 'flex'
                    }}>
                <CommentBankTwoTone sx={{width: 15.5}}/>
                <Typography variant="subtitle1" component="h2">
                  {comment.comment} 
                </Typography>
                </Box>
                <Box     sx={{
                    // alignItems: 'left',
                    display: 'flex'
                    }}>
                <DateRangeRounded sx={{width: 15.5}}/>
                <Typography color={'black'} variant="subtitle1" component="h2">
                  {comment.schedule_date} 
                </Typography>
                </Box>
                
                <Box
                sx={{
                    // alignItems: 'left',
                    display: 'flex'
                    }}>
                <EmailRounded sx={{width: 15.5}}></EmailRounded>
                <Typography color={'blue'}variant="body2" component="h2">
                {comment.email}
                </Typography>
                </Box>
                <br/>
                <ButtonGroup variant="contained" aria-label="outlined primary button group" size='small'>
                <Button color='secondary' onClick={deleteComment}>edit</Button>
                <Button color='success'>cancel</Button>
                <Button color='warning'>delete</Button>
            </ButtonGroup>
                
              </Paper>
              
            </Grid>
            {/* </Grid> */}
      {/* <Box padding={3}>
      <Paper elevation={5}>
        <Typography variant="h6" component="h2">
          {comment.first_name} {comment.last_name}
        </Typography>
        <Typography variant="h6" component="h2">
        {comment.email}
        </Typography>
      </Paper>
      </Box> */}
      </div>

            
          );
        })}
    </div>
  );
};

export default Card;
