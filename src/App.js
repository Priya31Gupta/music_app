//https://ancient-atoll-47915.herokuapp.com/artists

import { Route,Switch } from 'react-router-dom';
import './App.css';
import Album from './Components/Album';
import AlbumSongs from './Components/AlbumSongs';
import { Edit } from './Components/EditPage';
import { Header } from './Components/Header';
import { SignIn } from './Components/SignIn';
import { SignUp } from './Components/SignUp';

if(!localStorage.getItem('SignedIn'))
localStorage.setItem('SignedIn',null)
function App() {
  return (
    <div className="App">
        <Header />
       
        <div>
          <Switch>
              <Route exact path='/'>
                 <Album />
              </Route>
              <Route exact path='/albumDetails'>
                  <AlbumSongs />
              </Route>
              <Route exact path='/signIn'>
                 <SignIn />
              </Route>
              <Route exact path='/signUp'>
                 <SignUp />
              </Route>
              <Route exact path='/EditPage'>
                  <Edit />
              </Route>
          </Switch>
        </div>
    </div>
  );
}

export default App;
