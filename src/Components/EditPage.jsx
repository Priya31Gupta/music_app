import { useEffect, useState } from "react"
import axios from 'axios';
import Card from '@mui/material/Card';
import { Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

import IconButton from '@mui/material/IconButton';
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

export const Edit=()=>{
    const [data,setData] = useState([]);
    const name =JSON.parse(localStorage.getItem("SignedIn"));
    
    const handleDeleteSongs = async(id,id_al)=>{
        try{
            const {data} = await axios.delete(`https://ancient-atoll-47915.herokuapp.com/songs/${id}`);
            console.log(data);
    
            const da_al = await axios.get(`https://ancient-atoll-47915.herokuapp.com/album/${name.user._id}`);
            const updated_songs = da_al.data?.album?.songs?.map((e)=>{
                return e._id!==id&& e._id;
            })
            const d = await axios.patch(`https://ancient-atoll-47915.herokuapp.com/album/${id_al}`,{"songs":updated_songs});
            console.log(d);
            getData()
        }catch(err){
            alert('something Went Wrong')
        }
       
    }

    const getData = async()=>{
        console.log(name)
        const {data} = await axios.get(`https://ancient-atoll-47915.herokuapp.com/album/filterByName/${name.user._id}`);
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
            <Card>
                {data?.album?.map((el)=>{
                  return  <Card sx={{display:'flex',justifyContent:'space-evenly'}} key={el._id}>
                        <Card>
                            <img src={el.cover_photo} alt={el._id}/><br/>
                            Genre  :{el.genre}<br/>
                            Year : {el.year}
                        </Card>
                        <Card>
                            {el?.songs?.map(e=>{
                                return <Card sx={{display:'flex',justifyContent:'space-evenly',margin:"3% 3%"}} key={e._id}>
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
                })}
            </Card>
        </>
    )
}