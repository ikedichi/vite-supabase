import { FormEventHandler, useEffect, useState } from 'react';
import './App.css';
import { FaTrash } from 'react-icons/fa';
import { supabase } from './supabase';
import Paper from '@mui/material/Paper'

type Comment = {
  first_name: string;
  last_name: string;
  comment: string;
  schedule_date: string;
  email: string;
  id: number;
  is_deleted: boolean;

}

function Forms() {
  // const [is_deleted, setIs_Deleted] = useState(false)
  const [isEmpty, setIsEmpty] = useState(false);
  const [comments, setComments] = useState<Comment[]>();
  const [form, setForm] = useState<any>({});
  const [firstName, SetFirstName] = useState('');
  const [lastName, SetLastName] = useState('');
  const [email, SetEmail] = useState('');
  const [comment, setComment] = useState('')
  const [date, setEnteredDate] = useState('');


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
    }
    catch (error) {
      alert(error.message)
    }
  }



  // const getData = async (commentId: number) => {
  //   const result = await fetch(
  //     'https://avvidhxhjmaskwwewvey.supabase.co/rest/v1/comments' ,
  //     {
  //       headers: {
  //         apikey:
  //           'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF2dmlkaHhoam1hc2t3d2V3dmV5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzEwMzc3MDgsImV4cCI6MTk4NjYxMzcwOH0.urgAvh6ctpOFwvZyBtl0JlIT-3Axvw_9eKBQhtFrmDY',
  //       },
  //     },
  //     // SetFirstName(result.first_name)
  //   );
  //   const data = await result.json() as Comment[] ;
  //   const filteredData = data.filter( comment=>comment);
  //   setComments(filteredData);
  //   // console.log(data)
  // };


    
    // const getData = async (commentId: number) => {
    //   const result = await fetch(
    //     'https://avvidhxhjmaskwwewvey.supabase.co/rest/v1/comments' ,
    //     {
    //       headers: {
    //         apikey:
    //           'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF2dmlkaHhoam1hc2t3d2V3dmV5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzEwMzc3MDgsImV4cCI6MTk4NjYxMzcwOH0.urgAvh6ctpOFwvZyBtl0JlIT-3Axvw_9eKBQhtFrmDY',
    //       },
    //     },
    //     // SetFirstName(result.first_name)
    //   );
    //   const data = await result.json() as Comment[] ;
    //   const filteredData = data.filter( comment=>comment);
    //   setComments(filteredData);
    //   // console.log(data)
    // };
    

  //   async function onFormSubmit(){
  //     try {
  //       const {data, error} = await supabase
  //       .from('comments')
  //       .insert({
  //         first_name: firstName,
  //         last_name: lastName,
  //         email: email,
  //         comment:comment,
  //         date: date
          

  //       })
  //       .single()
  //       if(error) throw error;
  //       window;location.reload();
  //     }
  //     catch(error){
  //       alert(error.message)
  //     }
  // }


  
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
      getData();
      

    }



  //   async function deleteComment(commentId: number){
  //     try {
  //       const {data, error} = await supabase
  //       .from('comments')
  //       .delete()
  //       .eq('id', comments.id)
  //       // select()
  //       if(error) throw error;
  //       window;location.reload();
  //     }
  //     catch(error){
  //       alert(error.message)
  //     }
  // }



// useEffect(() => {
//   getData();
// }, []);

// const getData = async (commentId: number) => {
//   const result = await fetch(
//     'https://avvidhxhjmaskwwewvey.supabase.co/rest/v1/comments',
//     {
//       headers: {
//         apikey:
//           'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF2dmlkaHhoam1hc2t3d2V3dmV5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzEwMzc3MDgsImV4cCI6MTk4NjYxMzcwOH0.urgAvh6ctpOFwvZyBtl0JlIT-3Axvw_9eKBQhtFrmDY',
//       },
//     },
//     // SetFirstName(result.first_name)
//   );
//   const data = await result.json() as Comment[];
//   const filteredData = data.filter(comment => comment);
//   setComments(filteredData);
//   // console.log(data)
// };
useEffect(() => {
  getData();
}, []);


// async function onFormSubmit() {
//   try {
//     const { error } = await supabase
//       .from('comments')
//       .insert({
//         name: firstName,
//         last: lastName,
//         // comment: comments,
//         schedule_date: date,
//         email: email,
//       })
//     if (error) throw error;
//     if (data != null) {
//     }
//   } catch (error) {
//     console.log(error.message)
//   }
//   getData();
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
  // { comments?.map(comment=>{comment.is_deleted = true})
}










//   function isDeleted(commentId: number){ comments?.map(comment=>{comment.is_deleted = true})
// }

function selectPerson() {

}


return (
  <div>

    {/* <table border={1}>
      
        <tr>
          <th>ID</th>
          <th>First Names</th>
          <th>Last Names</th>
          <th>Emails</th>
          <th>Comment</th>
          <th>Dates</th>
          <th>Update</th>
          <th>Action</th>
          <th>Is Deleted</th>
        </tr>

        {comments && comments.map(comment => {
          return <tr key={comment.id}>
            <td>{comment.id}</td>
            <td>{comment.first_name}</td>
            <td>{comment.last_name}</td>
            <td>{comment.email}</td>
            <td> {comment.comment}</td>
            <td> <button>change</button> </td>
            <td>{comment.schedule_date}</td>
            <td><FaTrash onClick={() => {

            deleteComment(comment.id)
            }} /></td>
            <td>{JSON.stringify(comment.is_deleted)}</td>
          </tr>
        })}
        
      </table> */}



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
    )
      

};



export default Forms;
