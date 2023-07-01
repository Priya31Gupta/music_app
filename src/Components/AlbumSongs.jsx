import * as React from 'react';
import Card from '@mui/material/Card';
import ImageList from '@mui/material/ImageList';
import { useLocation,useParams } from 'react-router-dom';
import axios from 'axios';
import { Typography } from '@mui/material';
import PlayArrowRounded from '@mui/icons-material/PlayArrowRounded';

function AlbumSongs(){
    const location = useLocation();
    const param = useParams();
  //  const id = location.state.id;

    const [soloAlbum,setSoloAlbum] = React.useState([]);
 

    const getData = async ()=>{
        try{
            const {data} = await axios.get(`https://music-backend-k9aq.onrender.com/album/${param.id}`) ;
           // console.log(data);
            setSoloAlbum(data);
        }catch(err){
                console.log(err)
        }
        
            
    }
    React.useEffect(()=>{
        getData();
        console.log(param,"queryParams")
        
    },[])
    return (
      <Card sx={{ width:"80%" , margin:'2% 3%' }} >
        <ImageList sx={{ display: 'flex',justifyContent:'space-evenly', marginBottom:'2em' }} >
        
          <img
            src={soloAlbum?.album?.logo_artist}
            srcSet={soloAlbum?.album?.logo_artist}
            alt={soloAlbum?.album?.name}
            loading="lazy"
          />
              <Typography color="secondary" sx={{fontWeight:'600',display: 'flex',alignItems: 'center'}}>
                     Singer:   {soloAlbum?.artist?.name} <br/>
                     Genre : {soloAlbum?.album?.genre}<br/>
                     Year of Release  : {soloAlbum?.album?.year}<br/>
                    Total Songs : {soloAlbum?.album?.songs?.length}
              </Typography>
           
          </ImageList>
          {soloAlbum?.album?.songs?.map((e,i)=>{
               return  <Card key={e._id} sx={{ display: 'flex',justifyContent:'space-evenly',margin:'1% 0%', alignItems:'center', width: '70%', alignItems:'center',margin:'1em auto' }} >
                    <Typography sx={{margin:'4% 5%'}}>{i+1}</Typography>
                   <Typography sx={{display:"flex",margin:'2%',justifyContent:'space-evenly', alignItems:'center'}}>
                       
                   <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeNRE-sjM7GPvocTpgzfGao6N1fU8PLaA8IDwx6W-GxXcwsQfM1AHpDeIJPHV9ObPbaBc&usqp=CAU' height='75px' width="75px"/>
                            <PlayArrowRounded />
                   </Typography>
                   
                            <Typography>
                                {e.name}
                            </Typography>
                            <Typography>
                                {e.duration}
                            </Typography>
                </Card>
            })}
      </Card>
    )
}

export default AlbumSongs