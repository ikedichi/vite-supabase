import { ButtonGroup, Button } from "react-bootstrap";
import { Comment } from "./Card";
import Grid from "@mui/material/Grid";
import Forms from "./Forms";
import { Person2Rounded, CommentBankTwoTone, DateRangeRounded, EmailRounded, DeleteForeverRounded } from "@mui/icons-material";
import { Paper, Box, Typography } from "@mui/material";
import { useState } from "react";
import { supabase } from "./supabase";



export default function CommentCard({ comment, isDeleted, isNotDeleted, updadte, }:
    {
        comment: Comment, 
        isDeleted(commentId: number): Promise<void>,
        isNotDeleted(commentId: number): Promise<void>,
        updadte(commentId: number): Promise<void>,
    }) {

        // const [title, setTitle] = useState(props.title);
        const [email, setEmail] = useState()
        const [people, setPeople] = useState([]);
      // const [editing, setEditing] = useState(false

       


        const [editMode, setEditMode] = useState(false);
        console.log(email)

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
                email: email,
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
        <div>
            <div>
                {/* <Forms title={comment.email}></Forms> */}
                {/* <Grid container spacing={4}> */}
                <Grid item key={comment.id} >

                    <Paper elevation={5} >
                        <Box sx={{
                            alignItems: 'left',
                            borderSpacing: '',
                            display: 'flex'
                        }}>
                            <Person2Rounded />
                            <Typography color={'blue'} variant="h6" component="h2">
                                {comment.first_name} {comment.last_name} {comment.id}
                            </Typography>
                        </Box>
                        <Box sx={{
                            // alignItems: 'left',
                            display: 'flex'
                        }}>
                            <CommentBankTwoTone sx={{ width: 15.5 }} />
                            <Typography variant="subtitle1" component="h2">
                                {comment.comment}
                            </Typography>
                        </Box>
                        <Box sx={{
                            // alignItems: 'left',
                            display: 'flex'
                        }}>
                            <DateRangeRounded sx={{ width: 15.5 }} />
                            <Typography color={'black'} variant="subtitle1" component="h2">
                                {comment.schedule_date}
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                // alignItems: 'left',
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
                                // alignItems: 'left',
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
                                // alignItems: 'left',
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
                            {editMode && <Button color='warning' onClick={() => isDeleted(comment.id)}>delete</Button>}
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
        </div>
    )
}

