import Button from '@mui/material/Button';
import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import axios from 'axios';
import { useHistory,useParams } from 'react-router-dom';
import TextField from '@mui/material/TextField';

export default  function Album() {
  const param = useParams();
  const history = useHistory()
  
    const [album_data,setAlbumData] = React.useState([]);
    const [page,setPage] = React.useState(1);
    const [artistData,setArtistData] = React.useState([]);
    const [filteredName,setFiltredName] = React.useState('');
    const [filtredGenre,setFiltredGenre] = React.useState('');
  const [totalPages,setTotalPages] = React.useState([]);
  const [loading,setLoading] = React.useState(true);
  const [ error,setError] = React.useState(false);
  const [sortOn, setSortOn] = React.useState(false);
    const getArtistId = async(name)=>{
     // setLoading(true);
      try{
        const {data} = await axios.get(`https://ancient-atoll-47915.herokuapp.com/artists/filteredByName/${name}`);
        console.log(data.artist_[0]._id)
        return data.artist_[0]._id
      }catch(err){
        setError(true);
        console.log(err)
      }finally{
        setLoading(false);
      }
      
    }
    const getFilteredData = async(name)=>{
      
     // setLoading(true);
        try{
          const id = await   getArtistId(name);
          console.log(id);
          const {data} = await axios.get(`https://ancient-atoll-47915.herokuapp.com/album/filterByName/${id}`);
          console.log(data,22);
         ;
          if(!data) {
            alert('No Data Found')
          }else{
            setFiltredName("")
            setAlbumData(data);
            let x = [];
         for(let i=1;i<=data?.total_pages;i++)
         x.push(i)
 
         setTotalPages(x)
          }
        }catch(err){
          setError(true);
          console.log(err)
        }finally{
         
          console.log(filteredName);

         
          setLoading(false);
          
          
        }

       
        
    }

    const getFilteredGenre = async(genre)=>{
     // setLoading(true);
     
      try{
        const {data} = await axios.get(`https://ancient-atoll-47915.herokuapp.com/album/filterByGenre/${genre}`);
        console.log(data);
        if(!data) {
          alert('No Data Found')
        }else{
          setAlbumData(data);
          let x = [];
         for(let i=1;i<=data?.total_pages;i++)
         x.push(i)
 
         setTotalPages(x)
        }
      }catch(err){
        setError(true);
        console.log(err)
      }finally{
        setLoading(false);
      }
      
  }


    const getName = async (id)=>{
      //setLoading(true);
        try{
          const {data}= await axios.get(`https://ancient-atoll-47915.herokuapp.com/artists?page=${page}&size=4`);
          // console.log(data,data.artist_)
           setArtistData(data.artist_);
           let x = [];
         for(let i=1;i<=data?.total_pages;i++)
         x.push(i)
 
         setTotalPages(x)

        }catch(err){
        setError(true);
        console.log(err)
      }finally{
        setLoading(false);
      }
       
    }
   
    const getData =async ()=>{
      //setLoading(true);
      try{
        const {data} = await axios.get(`https://ancient-atoll-47915.herokuapp.com/album?page=${page}&size=4`);
        //console.log(data);
         setAlbumData(data);
         let x = [];
         for(let i=1;i<=data?.total_pages;i++)
         x.push(i)
 
         setTotalPages(x)
      }catch(err){
        setError(true);
        console.log(err)
      }finally{
        setLoading(false);
      }
       
    }

    const getSorteddata = async()=>{
      try{
        const {data} = await axios.get(`https://ancient-atoll-47915.herokuapp.com/album?page=${page}&size=4`);
        console.log(data)
          let sortedData = data;
          sortedData.album.sort((a,b)=>{return a.year-b.year});
          console.log(sortedData)
         setAlbumData(sortedData);
         let x = [];
         for(let i=1;i<=data?.total_pages;i++)
         x.push(i)
 
         setTotalPages(x)
      }catch(err){
        setError(true);
        console.log(err)
      }finally{
        setLoading(false);
      }
      
    }

  
    React.useEffect(()=>{
      if(param.genre) getFilteredGenre(param.genre)
      else if(param.name) getFilteredData (param.name)
        getData();
        getName();
       // console.log(path,url,'Params')
    },[page,loading,error])
  return (
    <>
      {loading?<> <ListSubheader component="div" sx={{display:'flex'}}>Loading ...</ListSubheader></>:error?<> <ListSubheader component="div" sx={{display:'flex'}}>Something Went Wrong!</ListSubheader></>:<> 
      
      <ImageList sx={{ width: '80%', height: '100%',margin:"1% 5%" }}>


      <ImageListItem key="Subheader" cols={2}>
        <ListSubheader component="div" sx={{display:'flex'}}> 

        <Button color="secondary" variant="text" onClick={()=>{
          //console.log("sorted");
          // getSorteddata();
          setSortOn(true)
      }} >Sort By Year </Button>


      <TextField onChange={(e)=>{setFiltredName(e.target.value)}} label={'Name'} id="margin-none" sx={{ fontSize: 25,textAlign:"center",margin:"4% 5%" }} />
      <Button onClick={()=>{
        history.push(`/name/${filteredName}`)
       //setQueryParam
        getFilteredData(filteredName);
        }}>Filter By Name</Button>

      <TextField onChange={(e)=>{setFiltredGenre(e.target.value)}} label={'Genre'} id="margin-none" sx={{ fontSize: 25,textAlign:"center",margin:"4% 5%" }} />
      <Button onClick={()=>{
         history.push(`/genre/${filtredGenre}`)
        getFilteredGenre(filtredGenre);
        }}>Filter By Genre</Button>

      </ListSubheader>
      </ImageListItem>
      {album_data?.album?.sort((a,b)=>  sortOn&&  a.year - b.year).map((item,i) => (
        
        <ImageListItem key={item._id} sx={{cursor:'pointer'}} onClick={()=>{
          
            history.push({
                pathname:`/albumDetails/${item._id}`,
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
            title={item.artist_name}
            subtitle={`songs : ${item.songs.length} ----- Release Year : ${item.year}`}
            
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
      
      
    </ImageList>
    <Button color="secondary" onClick={()=>{
          setPage(page-1)
      }} disabled={page===1}>Previous</Button>
      {totalPages?.map((e,i)=>{
        return  <Button key={i} onClick={()=>{
            setPage(e)
          }}>
            {e}
          </Button>
      })}
      <Button onClick={()=>{
       // setQueryParam('page',page+1)
          setPage(page+1)
      }} color="secondary" disabled={page===album_data.total_pages}>Next</Button>
      </>
    }
  
    </>  
    
  );
}
