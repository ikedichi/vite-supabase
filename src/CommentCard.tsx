import { ButtonGroup,  } from "react-bootstrap";
import { Comment } from "./Card";
import Grid from "@mui/material/Grid";
import Forms from "./Forms";
import { Person2Rounded, CommentBankTwoTone, DateRangeRounded, EmailRounded, DeleteForeverRounded } from "@mui/icons-material";
import { Paper, Box, Typography, Button } from "@mui/material";
import { useState } from "react";
import { supabase } from "./supabase";
import {format} from 'date-fns'


export default function CommentCard({ comment, isDeleted, isNotDeleted,}:
    {
        comment: Comment, 
        isDeleted(commentId: number): Promise<void>,
        isNotDeleted(commentId: number): Promise<void>,
    }) {

        // const [title, setTitle] = useState(props.title);
        const [email, setEmail] = useState('')
        const [people, setPeople] = useState([]);
      // const [editing, setEditing] = useState(false

      const dateFormat = format(new Date(comment.schedule_date), "MM/dd/yyyy");
       


        const [editMode, setEditMode] = useState(false);
       

        const editEmail = editMode&& <input id="email" placeholder="change email" onChange={(e)=>setEmail(e.target.value)}></input>


        function cancle(){
            setEditMode(false)
        }

        async function  update(){
            // event.preventDefault();
            try {
              const {data, error} = await supabase
              .from("comments")
              .update({
                // first_name: first,
                // last_name: last,
                email:  email,
                // date: date,
              })
              .eq('id', comment.id)
              if(error) throw error;
              window.location.reload();
            } catch (error){
          alert(error.message);
            }
          };
     
          
    return (
        <div >
            <div >
                {/* <Forms title={comment.email}></Forms> */}
                {/* <Grid container spacing={4}> */}
                <Grid>

                    <Paper elevation={5} >
                        <Box sx={{
                            alignItems: 'center',
                            borderSpacing: '',
                            display: 'flex'
                        }}>
                            <Person2Rounded />
                            <Typography color={'blue'} variant="h6" component="h2">
                                {comment.first_name} {comment.last_name} {comment.id}
                            </Typography>
                        </Box>
                        <Box sx={{
                             alignItems: 'center',
                            display: 'flex'
                        }}>
                            <CommentBankTwoTone sx={{ width: 15.5 }} />
                            <Typography variant="subtitle1" component="h2">
                                {comment.comment}
                            </Typography>
                        </Box>
                        <Box sx={{
                            alignItems: 'center',
                            display: 'flex'
                        }}>
                            <DateRangeRounded sx={{ width: 15.5 }} />
                            <Typography color={'black'} variant="subtitle1" component="h2">
                                {/* {new Date (comment.schedule_date).toLocaleString()} */}
                                {dateFormat}
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                 alignItems: 'center',
                                display: 'flex'
                            }}>
                            <EmailRounded sx={{ width: 15.5 }}></EmailRounded>
                            {!editMode && <Typography color={'blue'} variant="body2" component="h2">
                                {comment.email}
                            </Typography>}
                            {editEmail} 
                        </Box>

                       {editMode && <Box
                            sx={{
                                 alignItems: 'center',
                                display: 'flex'
                            }}>
                            <EmailRounded sx={{ width: 15.5 }}></EmailRounded>
                            <Typography color={'blue'} variant="body2" component="h2">
                            {/* <div>{email}</div> */}
                            </Typography>
                            <div>{email}</div>
                        </Box> }

                        <Box
                            sx={{
                                alignItems: 'center',
                                display: 'flex'
                            }}>
                            <DeleteForeverRounded sx={{ width: 15.5 }} />
                            <Typography color={'blue'} variant="body2" component="h2">
                                {JSON.stringify(comment.is_deleted)}
                            </Typography>
                        </Box>
                        <br />
                        <ButtonGroup variant="contained" aria-label="outlined primary button group" size='small'>
                        {!editMode &&  <Button color='secondary' onClick={() => {
                                setEditMode(true);
                            }} >edit</Button> ||  <Button color='success' onClick={() => update()}>update</Button>}
                             {editMode && <Button color='success' onClick={() => cancle()}>unedit</Button>}
                            {/* <Button color='success' onClick={() => update()}>cancel</Button> */}
                            {comment.is_deleted&& <Button color='warning' onClick={() => isNotDeleted(comment.id)}>undelete</Button>}
                            {editMode && <Button color='warning' onClick={() => isDeleted(comment.id)}>delete</Button>}
                        </ButtonGroup>

                    </Paper>

                </Grid>
            </div>
        </div>
    )
}

