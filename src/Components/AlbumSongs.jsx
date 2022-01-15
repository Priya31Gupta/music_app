import * as React from 'react';
import Card from '@mui/material/Card';
import ImageList from '@mui/material/ImageList';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { Typography } from '@mui/material';
import PlayArrowRounded from '@mui/icons-material/PlayArrowRounded';

function AlbumSongs(){
    const location = useLocation();
    const id = location.state.id;
    const [soloAlbum,setSoloAlbum] = React.useState([]);
 

    const getData = async ()=>{
        try{
            const {data} = await axios.get(`https://ancient-atoll-47915.herokuapp.com/album/${id}`) ;
            console.log(data);
            setSoloAlbum(data);
        }catch(err){
                console.log(err)
        }
        
            
    }
    React.useEffect(()=>{
        getData();
        
    },[])
    return (
      <Card sx={{ width:"80%" , margin:'2% 3%' }} >
        <ImageList sx={{ display: 'flex',justifyContent:'space-evenly' }} >
        
          <img
            src={soloAlbum?.album?.logo_artist}
            srcSet={soloAlbum?.album?.logo_artist}
            alt={soloAlbum?.album?.name}
            loading="lazy"
          />
              <Typography color="secondary" sx={{fontWeight:'600'}}>
                     Singer:   {soloAlbum?.artist?.name} <br/>
                     Genre : {soloAlbum?.album?.genre}<br/>
                     Year of Release  : {soloAlbum?.album?.year}<br/>

              </Typography>
           
          </ImageList>
          {soloAlbum?.album?.songs?.map((e)=>{
               return  <Card key={e._id} sx={{ display: 'flex',justifyContent:'space-evenly',margin:'1% 0%' }} >
                   <Typography>
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