//https://music-backend-k9aq.onrender.com/artists

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
              <Route exact path={`/`}>
                 <Album />
              </Route>
              <Route  path={`/genre/:genre`}>
                 <Album />
              </Route>
              <Route  path={`/name/:name`}>
                 <Album />
              </Route>
              <Route  path={`/sort/:status`}>
                 <Album />
              </Route>
              <Route  path={`?page=`}>
                 <Album />
              </Route>
              <Route exact path={`/albumDetails/:id`}>
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
              <Route>
                <h1>404 Page not found</h1>
            </Route>
          </Switch>
        </div>
    </div>
  );
}

export default App;
