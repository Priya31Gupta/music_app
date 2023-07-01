import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useHistory } from 'react-router-dom/';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';



export const Header = ()=>{
    const history=useHistory()
    const [value, setValue] = useState('one');
    const [userName, setUserName] = useState('')

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    useEffect(() => {
      const handleStorage = () => {
        if(JSON.parse(localStorage.getItem('SignedIn'))) {
          let user = JSON.parse(localStorage.getItem('SignedIn')).user.name[0];
          //console.log(user,"user")
          setUserName(user);
        }else{
          setUserName('');
        }
      }
    
      window.addEventListener('storage', handleStorage())
      return () => window.removeEventListener('storage', handleStorage())
    }, [])
 
    return (
      <Box sx={{ width: '100%',backgroundColor:"#FFD39A",justifyContent:"space-between",display:'flex' }}>
        <Tabs
        sx={{margin:"0% 3%"}}
          value={value}
          onChange={handleChange}
          textColor="secondary"
          indicatorColor="secondary"
          aria-label="secondary tabs example"
        >
          <Tab sx={{margin:"0% 3%"}}
          onClick={()=>{
              history.push('/')
          }}
           value="one" label="Album" />
          <Tab onClick={()=>{
              history.push('/EditPage')
          }} sx={{margin:"0% 1.5%"}}  value="two" label="Edit Album" />
          
        </Tabs>
        
        <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
        <React.Fragment>
             <Avatar {...bindTrigger(popupState)} >
                 {userName ? userName : <PermIdentityIcon />}
             </Avatar>
            <Menu {...bindMenu(popupState)}>

           
            <MenuItem onClick={()=>{
              popupState.close();
              history.push('/signIn')
              }}>
              Sign In</MenuItem>
              <MenuItem onClick={()=>{
                popupState.close();
                history.push('/signUp')
               }}>Sign Up</MenuItem>
              <MenuItem onClick={()=>{
                popupState.close();
                localStorage.setItem("SignedIn",null)
              }}>Logout</MenuItem> 
            </Menu>
          
        </React.Fragment>
      )}
    </PopupState>
      </Box>
    )
}
