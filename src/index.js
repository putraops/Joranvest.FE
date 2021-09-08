import React from 'react';
import ReactDOM from 'react-dom';
import Home from './home';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

class Root extends React.Component {

    render() {
        return(
            <React.Fragment>
                <BrowserRouter basename={'/'} >
                    <Switch>
                        <Route exact path={`${process.env.PUBLIC_URL}/`} component={Home}/>
                        {/* <Route path={`${process.env.PUBLIC_URL}/index-1`} component={Index1}/>   */}
                        <Route path={`${process.env.PUBLIC_URL}/login`} component={Login}/>  
                        <Route path={`${process.env.PUBLIC_URL}/register`} component={Register}/>
                        {/* <Route path={`${process.env.PUBLIC_URL}/index-2`} component={Index2}/>  
                        <Route path={`${process.env.PUBLIC_URL}/index-3`} component={Index3}/>  
                        <Route path={`${process.env.PUBLIC_URL}/index-4`} component={Index4}/>  
                        <Route path={`${process.env.PUBLIC_URL}/index-5`} component={Index5}/>  
                        <Route path={`${process.env.PUBLIC_URL}/index-6`} component={Index6}/>  
                        <Route path={`${process.env.PUBLIC_URL}/index-7`} component={Index7}/>  
                        <Route path={`${process.env.PUBLIC_URL}/index-8`} component={Index8}/>    */}
                    </Switch>
                </BrowserRouter>
            </React.Fragment>
        );
    }
   }

ReactDOM.render(<Root />, document.getElementById('root'));
serviceWorker.unregister();
