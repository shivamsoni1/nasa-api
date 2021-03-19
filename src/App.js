import React from 'react';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import Home from './components/Home'
import Search from './components/Search'
function App() {
  return (
    <Router>
      <Route path="/" exact component={Home} />
      <Route path="/search/go" exact component={Search} />
    </Router>
  );
}

export default App;
