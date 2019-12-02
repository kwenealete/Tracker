import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ViewWeight from './ViewWeight';
import Header from './Header';
import AddWeight from './AddWeight';


class App extends React.Component {
  render() {
    return (
       
          <div className="center w85">
            <Header />
            <div className= "ph3 pv1 ">
                <Switch>
                  <Route exact path="/" component={ViewWeight} />
                  <Route exact path="/create" component={AddWeight} />
                </Switch>
            </div>
            
          </div>
     
            
    );
  }
}

export default App;
