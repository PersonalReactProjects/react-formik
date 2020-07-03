import React from 'react';
import YoutubeForm from './components/YoutubeForm'
import { Switch, Route } from 'react-router-dom'
import Form from './components/FormikMaterialUI'

function App() {

  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Form} />
        <Route exact path="/forms" component={YoutubeForm} />
      </Switch>
    </div>
  );
}

export default App;