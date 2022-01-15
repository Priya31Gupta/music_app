import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useHistory } from 'react-router-dom/';



export const Header = ()=>{
    const history=useHistory()
    const [value, setValue] = useState('one');

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
 
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
          }} sx={{margin:"0% 3%"}}  value="two" label="Edit Album" />
          
        </Tabs>
        
        <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
        <React.Fragment>
             <Avatar {...bindTrigger(popupState)} >
                 {localStorage.getItem('SignedIn')&&`${localStorage.getItem('SignedIn')?.user?.name[0]}`}
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
