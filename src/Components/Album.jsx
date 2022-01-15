import Button from '@mui/material/Button';
import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import TextField from '@mui/material/TextField';

export default function Album() {
    const [album_data,setAlbumData] = React.useState([]);
    const [page,setPage] = React.useState(1);
    const [artistData,setArtistData] = React.useState([]);
    const [filteredName,setFiltredName] = React.useState('');
    const [filtredGenre,setFiltredGenre] = React.useState('');

    const getArtistId = async()=>{
      const {data} = await axios.get(`https://ancient-atoll-47915.herokuapp.com/artists/filteredByName/${filteredName}`);
      console.log(data.artist_[0]._id)
      return data.artist_[0]._id
    }
    const getFilteredData = async()=>{
      const id = await   getArtistId();
      console.log(id)


        const {data} = await axios.get(`https://ancient-atoll-47915.herokuapp.com/album/filterByName/${id}`);
        console.log(data,22);
        if(!data) {
          alert('No Data Found')
        }else{
          setAlbumData(data);
        }
        
    }

    const getFilteredGenre = async()=>{
        
      const {data} = await axios.get(`https://ancient-atoll-47915.herokuapp.com/album/filterByGenre/${filtredGenre}`);
      console.log(data);
      if(!data) {
        alert('No Data Found')
      }else{
        setAlbumData(data);
      }
      
  }


    const getName = async (id)=>{
        const {data}= await axios.get(`https://ancient-atoll-47915.herokuapp.com/artists?page=${page}&size=4`);
       // console.log(data,data.artist_)
        setArtistData(data.artist_);
    }
   
    const getData =async ()=>{
        const {data} = await axios.get(`https://ancient-atoll-47915.herokuapp.com/album?page=${page}&size=4`);
       //console.log(data);
        setAlbumData(data);
    }

    const getSorteddata = async()=>{
      const {data} = await axios.get(`https://ancient-atoll-47915.herokuapp.com/album/sort_year?page=${page}&size=4`);
      console.log(data)
    }

   const history = useHistory();
    React.useEffect(()=>{
        getData();
        getName();
    },[page])
  return (
    <ImageList sx={{ width: '80%', height: '100%',margin:"1% 5%" }}>
      <ImageListItem key="Subheader" cols={2}>
        <ListSubheader component="div" sx={{display:'flex'}}> 
        <Button color="secondary" variant="text" onClick={()=>{
          //console.log("sorted");
          getSorteddata();
      }} >Sort By Year </Button>


      <TextField onChange={(e)=>{setFiltredName(e.target.value)}} label={'Name'} id="margin-none" sx={{ fontSize: 25,textAlign:"center",margin:"4% 5%" }} />
      <Button onClick={getFilteredData}>Filter By Name</Button>

      <TextField onChange={(e)=>{setFiltredGenre(e.target.value)}} label={'Genre'} id="margin-none" sx={{ fontSize: 25,textAlign:"center",margin:"4% 5%" }} />
      <Button onClick={getFilteredGenre}>Filter By Genre</Button>

      </ListSubheader>
      </ImageListItem>
      {album_data?.album?.map((item,i) => (
        
        <ImageListItem key={item._id} onClick={()=>{
            history.push({
                pathname:'/albumDetails',
                state:{
                    id:item._id
                }
            })
        }}>
          <img
            src={`${item.cover_photo}?w=248&fit=crop&auto=format`}
            srcSet={`${item.cover_photo}?w=248&fit=crop&auto=format&dpr=2 2x`}
            alt={item.name}
            loading="lazy"
          />
          
          <ImageListItemBar
            title={item.genre}
            subtitle={`songs : ${item.songs.length}`}
            actionIcon={
              <IconButton
                sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                aria-label={`info about ${item.genre}`}
              >
                <InfoIcon />
              </IconButton>
            }
          />
        </ImageListItem>
      ))}
      <Button color="secondary" onClick={()=>{
          setPage(page-1)
      }} disabled={page===1}>Previous</Button>
      <Button onClick={()=>{
          setPage(page+1)
      }} color="secondary" disabled={page===album_data.total_pages-1}>Next</Button>
    </ImageList>
  );
}
