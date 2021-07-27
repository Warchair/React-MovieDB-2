import {Switch, Route, Redirect } from 'react-router-dom';
import Home from './View/Home';
import Details from './View/Details';
import TVDetails from './View/TVDetails';
import Genres from './View/Genres';
import Search from './View/Search';

function App() {
  return(
    <Switch>
      <Route path="/react-moviedb-part3/" exact component={Home}/>
      <Route path="/react-moviedb-part3/:type/:id" exact component={Details} />
      {/* <Route path="/react-moviedb-part3/tv/:id" exact={true} component={TVDetails} /> */}
      <Route path="/react-moviedb-part3/genres/:type/:id/page=:page" exact component={Genres} />
      <Route path="/react-moviedb-part3/search/:type/q=:id/page=:page" exact component={Search}/>
      <Redirect from="*" to="/react-moviedb-part3/" />
    </Switch>
  )
}

export default App;
