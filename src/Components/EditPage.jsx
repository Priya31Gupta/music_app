import { useEffect, useState } from "react"
import axios from 'axios';
import Card from '@mui/material/Card';
import { Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import AssignmentLateOutlinedIcon from '@mui/icons-material/AssignmentLateOutlined';
import IconButton from '@mui/material/IconButton';
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

export const Edit=()=>{
    const [data,setData] = useState([]);
    const name =JSON.parse(localStorage.getItem("SignedIn"));
    
    const handleDeleteSongs = async(id,id_al)=>{
        try{
            const {data} = await axios.delete(`https://music-backend-k9aq.onrender.com/songs/${id}`);
            console.log(data);
    
            const da_al = await axios.get(`https://music-backend-k9aq.onrender.com/album/${name.user._id}`);
            const updated_songs = da_al.data?.album?.songs?.map((e)=>{
                return e._id!==id&& e._id;
            })
            const d = await axios.patch(`https://music-backend-k9aq.onrender.com/album/${id_al}`,{"songs":updated_songs});
            console.log(d);
            getData()
        }catch(err){
            alert('something Went Wrong')
        }
       
    }

    const getData = async()=>{
        console.log(name)
        const {data} = await axios.get(`https://music-backend-k9aq.onrender.com/album/filterByName/${name.user._id}`);
        console.log(data);
        setData(data);
    }
    useEffect(()=>{
            getData();
    },[])
    if(!name){
        return (
            <Redirect to="/signUp" />
        )
    }
    return (
        <>
            <Card sx={{margin: '5%'}}>
                { data?.album?.length > 0 ? data?.album?.map((el)=>{
                  return  <Card sx={{justifyContent:'space-evenly',margin:'2%'}} key={el._id}>
                        <Card sx={{display:'flex',justifyContent:'space-evenly',fontSize:'20px',padding:'10px'}}>
                            <img src={el.logo_artist} alt={el._id}/><br/>
                            Artist Name : {el.artist_name}<br/>
                            Genre  :{el.genre}<br/>
                            Year : {el.year}<br/>
                            No. Of Songs : {el?.songs?.length}
                        </Card>
                        <br/>
                        <Card>
                            {el?.songs?.map((e,i)=>{
                                return <Card sx={{display:'flex',justifyContent:'space-evenly',margin:"3% 3%"}} key={e._id}>
                                        <Typography>
                                            {i+1}
                                        </Typography>
                                        <Typography>
                                            {e.name}
                                        </Typography>
                                        <Typography>
                                            {e.duration}
                                        </Typography>
                                        <IconButton 
                                        onClick={()=>{
                                            handleDeleteSongs(e._id,el._id)
                                        }}
                                        aria-label="delete" >
                                            <EditIcon/>
                          </IconButton>
                                </Card>
                            })}
                        </Card>

                    </Card>
                })
                : <>
                    <Typography sx={{justifyContent:'space-evenly',margin:'2%', alignItems:'center',minHeight:'10em', display:'flex', fontSize:'2rem'}}> You Don't have any album </Typography>
                    <AssignmentLateOutlinedIcon sx={{fontSize:"140px"}}/>
                </>
                    
                }
            </Card>
        </>
    )
}