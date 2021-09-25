import React from 'react';
import {Fragment} from 'react';
import ReactDOM from 'react-dom';
import Home from './home';
import Login from './components/auth/Login';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Register from './components/auth/Register';
import Technical from './components/technical/Technical';
import Fundamental from './components/fundamental/Fundamental';
import Webinar from './components/webinar/Webinar';
import WebinarDetail from './components/webinar/WebinarDetail';
import Article from './components/article/Article';
import ArticleDetail from './components/article/ArticleDetail';
import Test from './components/test/Test';

import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { matchPath  } from "react-router-dom";


class Root extends React.Component {
    render() {
        return(
            <React.Fragment>
                <BrowserRouter >
                    <Fragment>
                        <Navbar />
                        <Route exact path={`${process.env.PUBLIC_URL}/`} component={Home}/>
                        {/* <Route path={`${process.env.PUBLIC_URL}/index-1`} component={Index1}/>   */}
                        <Route path={`${process.env.PUBLIC_URL}/login`} component={Login}/>  
                        <Route path={`${process.env.PUBLIC_URL}/register`} component={Register}/>
                        <Route path={`${process.env.PUBLIC_URL}/technical`} component={Technical}/>
                        <Route path={`${process.env.PUBLIC_URL}/fundamental`} component={Fundamental}/>
                        <Route exact path={`${process.env.PUBLIC_URL}/webinar`} component={Webinar}/>
                        {/* <Route path={`${process.env.PUBLIC_URL}/webinar/detail`} component={WebinarDetail}/> */}
                        <Route exact path={`${process.env.PUBLIC_URL}/webinar/detail/:id`} component={WebinarDetail}/>

                        <Route exact path={`${process.env.PUBLIC_URL}/article`} component={Article}/>
                        <Route exact path={`${process.env.PUBLIC_URL}/article-detail/:id`} component={ArticleDetail}/>
                    </Fragment>
                </BrowserRouter>
            </React.Fragment>
        );
    }
   }

ReactDOM.render(<Root />, document.getElementById('root'));
serviceWorker.unregister();
