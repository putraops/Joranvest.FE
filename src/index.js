import React from 'react';
import {Fragment} from 'react';
import ReactDOM from 'react-dom';
import Home from './home';
import Login from './components/auth/Login';
import Navbar from './components/Navbar';
import Register from './components/auth/Register';
import Profile from './components/profile/Profile';
import Technical from './components/technical/Technical';
import Fundamental from './components/fundamental/Fundamental';
import Webinar from './components/webinar/Webinar';
import WebinarDetail from './components/webinar/WebinarDetail';
import Article from './components/article/Article';
import ArticleDetail from './components/article/ArticleDetail';
import CheckoutMembership from './components/checkout/Membership'
import MembershipPaymentSuccess from './components/checkout/MembershipPaymentSuccess'
import WebinarPaymentSuccess from './components/payment/WebinarPaymentSuccess'

import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Route } from 'react-router-dom'
import { store } from './config/redux/index'
import { Provider } from 'react-redux';

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
                        <Route path={`${process.env.PUBLIC_URL}/profile`} component={Profile}/>
                        <Route exact path={`${process.env.PUBLIC_URL}/webinar`} component={Webinar}/>
                        <Route exact path={`${process.env.PUBLIC_URL}/webinar/detail/:id`} component={WebinarDetail}/>

                        <Route exact path={`${process.env.PUBLIC_URL}/article`} component={Article}/>
                        <Route exact path={`${process.env.PUBLIC_URL}/article/detail/:id`} component={ArticleDetail}/>

                        <Route path={`${process.env.PUBLIC_URL}/checkout/membership/:id`} component={CheckoutMembership}/>
                        <Route path={`${process.env.PUBLIC_URL}/membership/payment-success`} component={MembershipPaymentSuccess}/>
                        <Route exact path={`${process.env.PUBLIC_URL}/webinar/payment-success/:id`} component={WebinarPaymentSuccess}/>

                        
                    </Fragment>
                </BrowserRouter>
            </React.Fragment>
        );
    }
   }

ReactDOM.render(
    <Provider store={store}>
        <Root />
    </Provider>, document.getElementById('root'));
serviceWorker.unregister();
