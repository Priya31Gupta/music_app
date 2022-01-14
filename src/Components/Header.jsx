import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useState } from 'react';

export const Header = ()=>{
    const [value, setValue] = useState('one');

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
 
    return (
      <Box sx={{ width: '100%',backgroundColor:"#FFD39A",justifyContent:"space-even" }}>
        <Tabs
        sx={{margin:"0% 3%"}}
          value={value}
          onChange={handleChange}
          textColor="secondary"
          indicatorColor="secondary"
          aria-label="secondary tabs example"
        >
          <Tab sx={{margin:"0% 3%"}} value="one" label="Item One" />
          <Tab sx={{margin:"0% 3%"}}  value="two" label="Item Two" />
          <Tab sx={{margin:"0% 3%"}}  value="three" label="Item Three" />
        </Tabs>
      </Box>
    )
}
