import { Typography, Box, AppBar, Card, CardActions, CardContent, CardMedia, CssBaseline, Grid, Toolbar, Container } from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { supabase } from './supabase';
import { SupabaseAuthClient } from '@supabase/supabase-js/dist/module/lib/SupabaseAuthClient';
import { FormEventHandler, useEffect, useState } from 'react';
// import {makeStyles} from '@mui/styles'
// import useStyles from "./Styles";

type Comment = {
    first_name: string;
    last_name: string;
    comment: string;
    schedule_date: string;
    email: string;
    id: number;
    is_deleted: boolean;
  
  }

//   const useStyles = makeStyles((theme)=>({
//    container: {
//     backgroundColor: theme.palette.backGround.paper
//    } 
//   }));

function NewForm() {
    // const classes = useStyles();
        const [isEmpty, setIsEmpty] = useState(false);
        const [comments, setComments] = useState<Comment[]>();
        const [form, setForm] = useState<any>({});
        const [firstName, SetFirstName] = useState([]);
        const [lastName, SetLastName] = useState([]);
        const [email, SetEmail] = useState([]);
        const [date, setDate] = useState()
      
        useEffect(() => {
          getData();
        }, []);
      
        async function getData() {
          try {
            const { data, error } = await supabase
              .from('comments')
              .select()
            if (error) throw error;
            if (data != null) {
              setComments(data)
            }
          } catch (error) {
            console.log(error.message)
          }
      
        }
      


    return (
        <>
    
    {comments && comments.map((comment) =>{
  return (
    <div>
   <CssBaseline />
<AppBar>
    <Toolbar>
        <DocumentScannerIcon />
        <Typography variant="h5">Documents</Typography>
    </Toolbar>

</AppBar>
<main>
    <div>
        <Grid item key={comment.id} xs={12}>
            <div>
           <Grid  >{comment.last_name}
                </Grid>
                </div>
                    {/* <Card>
                        <Box>
                        </Box>
                    </Card>
                </Grid> */}
           {/* </Grid> */}

            <ButtonGroup variant="contained" aria-label="outlined primary button group">
                <Button color='secondary'>One</Button>
                <Button color='success'>Two</Button>
                <Button color='warning'>Three</Button>
            </ButtonGroup>

        </Grid>
    </div>
</main> 
</div>

  )
})}
        </>
    )
}

export default NewForm;


{/* <CssBaseline />
<AppBar>
    <Toolbar>
        <DocumentScannerIcon />
        <Typography variant="h5">Documents</Typography>
    </Toolbar>

</AppBar>
<main>
    <div>
        <Container>
           <Grid>
                <Grid item>
                    <Card>
                        <Box>
                        </Box>
                    </Card>
                </Grid>
           </Grid>

            <ButtonGroup variant="contained" aria-label="outlined primary button group">
                <Button color='secondary'>One</Button>
                <Button color='success'>Two</Button>
                <Button color='warning'>Three</Button>
            </ButtonGroup>

        </Container>
    </div>
</main> */}