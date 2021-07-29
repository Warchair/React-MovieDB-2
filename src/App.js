import {Switch, Route, Redirect } from 'react-router-dom';
import Home from './View/Home';
import Details from './View/Details';
import Genres from './View/Genres';
import Search from './View/Search';

function App() {
  return(
    <Switch>
      <Route path="/React-MovieDB-2/" exact component={Home}/>
      <Route path="/React-MovieDB-2/:type/:id" exact component={Details} />
      <Route path="/React-MovieDB-2/genres/:type/:id-:name/page=:page" exact component={Genres} />
      <Route path="/React-MovieDB-2/search/:type/q=:id/page=:page" exact component={Search}/>
      <Redirect from="*" to="/React-MovieDB-2/" />
    </Switch>
  )
}

export default App;
