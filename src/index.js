import React from 'react';
import {Fragment} from 'react';
import ReactDOM from 'react-dom';
import Home from './home';
import Login from './components/auth/Login';
import Navbar from './components/Navbar';

import Register from './components/auth/Register';
import MyProfile from './components/profile/Profile';
import RegisterVerification from './components/auth/RegisterVerification';

import Technical from './components/technical/Technical';
import Fundamental from './components/fundamental/Fundamental';
import FundamentalAnalysis from './components/fundamental/Analysis';

import Profile from './components/main/Profile';

import Webinar from './components/webinar/Webinar';
import WebinarDetail from './components/webinar/WebinarDetail';
import WebinarHistory from './components/webinar/WebinarHistory';
import WebinarReview from './components/webinar/WebinarReview';
import WebinarPayment from './components/payment/Webinar';
import SpeakerReview from './components/speaker/review/SpeakerReview';

import Article from './components/article/Article';
import ArticleDetail from './components/article/ArticleDetail';

import CheckoutMembership from './components/checkout/Membership'
import MembershipPayment from './components/payment/MembershipPayment'
import WebinarPaymentStatus from './components/payment/WebinarPayment'

import Transaction from './components/transaction/Transaction';

import Privacy from './components/Privacy';
import ContactUs from './components/ContactUs';
import Disclaimer from './components/Disclaimer';
import AboutUs from './components/AboutUs';

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

                        
                        <Route path={`${process.env.PUBLIC_URL}/j/:id/:profile_name`} component={Profile}/>

                        <Route path={`${process.env.PUBLIC_URL}/technical`} component={Technical}/>
                        <Route path={`${process.env.PUBLIC_URL}/fundamental`} component={Fundamental}/>
                        <Route path={`${process.env.PUBLIC_URL}/fundamental-review/:emiten_code/:id/:filemaster_id`} component={FundamentalAnalysis}/>


                        <Route path={`${process.env.PUBLIC_URL}/profile`} component={MyProfile}/>
                        <Route exact path={`${process.env.PUBLIC_URL}/webinar`} component={Webinar}/>
                        <Route exact path={`${process.env.PUBLIC_URL}/webinar/detail/:id`} component={WebinarDetail}/>
                        <Route exact path={`${process.env.PUBLIC_URL}/my-webinar`} component={WebinarHistory}/>
                        <Route exact path={`${process.env.PUBLIC_URL}/webinar/review/:id`} component={WebinarReview}/>

                        <Route exact path={`${process.env.PUBLIC_URL}/article`} component={Article}/>
                        <Route exact path={`${process.env.PUBLIC_URL}/article/detail/:id`} component={ArticleDetail}/>

                        <Route path={`${process.env.PUBLIC_URL}/checkout/membership/:id`} component={CheckoutMembership}/>
                        <Route path={`${process.env.PUBLIC_URL}/membership/payment/:status/:id`} component={MembershipPayment}/>
                        <Route exact path={`${process.env.PUBLIC_URL}/webinar/payment/:status/:id`} component={WebinarPaymentStatus}/>
                        <Route exact path={`${process.env.PUBLIC_URL}/webinar/payment/:id`} component={WebinarPayment}/>
                        <Route exact path={`${process.env.PUBLIC_URL}/speaker/review/:id`} component={SpeakerReview}/>
                        
                        <Route exact path={`${process.env.PUBLIC_URL}/transaction`} component={Transaction}/>
                        
                        <Route exact path={`${process.env.PUBLIC_URL}/privacy`} component={Privacy}/>
                        <Route exact path={`${process.env.PUBLIC_URL}/disclaimer`} component={Disclaimer}/>
                        <Route exact path={`${process.env.PUBLIC_URL}/about-us`} component={AboutUs}/>
                        <Route exact path={`${process.env.PUBLIC_URL}/contact-us`} component={ContactUs}/>
                        
                        <Route exact path={`${process.env.PUBLIC_URL}/register-verification/:id`} component={RegisterVerification}/>
                        
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
