
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import { useHistory } from 'react-router-dom';

export const SignUp =()=>{
    const history = useHistory();
    const [name,setname] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState('');
    const handleSignin = async ()=>{
        try{
            if(email===""||password===''||name===''){
                alert(`Email,Name and Password are required`);
            }else{
                let b ={
                    name:name,
                    email : email,
                    password:password
                 }
                fetch("https://ancient-atoll-47915.herokuapp.com/signup",{
                    method: "POST",
                   body: JSON.stringify(b),
                    headers: {
                        'Accept': 'application/json',
                        "Content-type": "application/json",
                        
                        
                    }
                }).then(response => response.json())
                .then(json => {console.log(json);
                    alert(`Successfully signed Up! 
                        Please Sign In with Same Email to continue.`);
                    history.push("/signIn")
                    ;})                         
                .catch((err)=>{
                    alert(`Ooops! Something Went Wrong!😑
                       `)
                })  

               
                
            }
              
        }catch(err){
            console.log(err);
            alert(`Ooops! Something Went Wrong!😑`)
        }
    }
    return (
        <>
            <Card sx={{ minWidth: 275,margin:"4% 35%" }}>
            <Typography sx={{ fontSize: 25,textAlign:"center",margin:"4% 5%",width:"90%" }} color="#0F044C" gutterBottom>
                 Sign Up
            </Typography>

            <TextField onChange={(e)=>{setname(e.target.value)}} label={'Name'} id="margin-none" sx={{ fontSize: 25,textAlign:"center",margin:"4% 5%",width:"90%" }} />

            <TextField onChange={(e)=>{setEmail(e.target.value)}} label={'Email'} id="margin-none" sx={{ fontSize: 25,textAlign:"center",margin:"4% 5%",width:"90%" }} />

            <TextField onChange={(e)=>{setPassword(e.target.value)}} label={'Password'} id="margin-none" sx={{ fontSize: 25,textAlign:"center",margin:"4% 5%",width:"90%" }} />

            <Button variant="outlined" onClick={()=>{handleSignin()}} sx={{ textAlign:"center",margin:"4% 5%",width:"90%" }}>Sign Up</Button>


            
            
            </Card>
        </>
    )
}