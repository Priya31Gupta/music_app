
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';


export const SignIn =()=>{
    const [name,setname] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState('');
    const history = useHistory();
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
                fetch("https://music-backend-k9aq.onrender.com/signin",{
                    method: "POST",
                   body: JSON.stringify(b),
                    headers: {
                        'Accept': 'application/json',
                        "Content-type": "application/json",
                        
                        
                    }
                }).then(response => response.json())
                .then(json => {console.log(json);
                    if(json.token){
                    alert(`Successfully signed In`);
                    localStorage.setItem("SignedIn",JSON.stringify(json));
                    history.push("/")    ;
                    }
                })  
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
                 Sign In
            </Typography>

            <TextField onChange={(e)=>{setname(e.target.value)}} label={'Name'} id="margin-none" sx={{ fontSize: 25,textAlign:"center",margin:"4% 5%",width:"90%" }} />

            <TextField onChange={(e)=>{setEmail(e.target.value)}} label={'Email'} id="margin-none" sx={{ fontSize: 25,textAlign:"center",margin:"4% 5%",width:"90%" }} />

            <TextField onChange={(e)=>{setPassword(e.target.value)}} label={'Password'} id="margin-none" sx={{ fontSize: 25,textAlign:"center",margin:"4% 5%",width:"90%" }} />

            <Button variant="outlined" onClick={()=>{handleSignin()}} sx={{ textAlign:"center",margin:"4% 5%",width:"90%" }}>Sign In</Button>


           
            
            </Card>
        </>
    )
}