import React from 'react';
import {Fragment} from 'react';
import ReactDOM from 'react-dom';
import Home from './home';
import Login from './components/auth/Login';
import Navbar from './components/Navbar';

import Register from './components/auth/Register';
import ResetPassword from './components/auth/ResetPassword';
import RecoverPassword from './components/auth/RecoverPassword';
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
// import WebinarPayment from './components/payment/Webinar';
import FreeWebinarRegistrationSuccess from './components/checkout/FreeWebinarRegistrationSuccess';
import SpeakerReview from './components/speaker/review/SpeakerReview';

import Article from './components/article/Article';
import ArticleDetail from './components/article/ArticleDetail';

import CheckoutPage from './components/checkout/CheckoutPage'
import CheckoutMembership from './components/checkout/Membership'
import CheckoutConfirmation from './components/checkout/PaymentGateway/Confirmation'
import MembershipPayment from './components/payment/MembershipPayment'
import PaymentPage from './components/payment/PaymentPage'

import EducationPage from './components/education/module/EducationPage';
import EducationDetailPage from './components/education/module/EducationDetailPage';
import WebinarRecordingPage from './components/education/webinar-recording/WebinarRecordingPage';
import WebinarRecordingDetailPage from './components/education/webinar-recording/WebinarRecordingDetailPage';

import Transaction from './components/transaction/Transaction';

// import JoranPlayer from './components/demo/JoranPlayer';

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
                        <Route exact path={`${process.env.PUBLIC_URL}/login`} component={Login}/>  
                        <Route exact path={`${process.env.PUBLIC_URL}/register`} component={Register}/>
                        <Route exact path={`${process.env.PUBLIC_URL}/reset-password`} component={ResetPassword}/>
                        <Route exact path={`${process.env.PUBLIC_URL}/recover-password/:user_id/:email`} component={RecoverPassword}/>

                        
                        <Route path={`${process.env.PUBLIC_URL}/j/:id/:profile_name`} component={Profile}/>

                        <Route path={`${process.env.PUBLIC_URL}/technical`} component={Technical}/>
                        <Route path={`${process.env.PUBLIC_URL}/fundamental`} component={Fundamental}/>
                        <Route path={`${process.env.PUBLIC_URL}/fundamental-review/:emiten_code/:id/:filemaster_id`} component={FundamentalAnalysis}/>


                        <Route path={`${process.env.PUBLIC_URL}/profile`} component={MyProfile}/>
                        <Route exact path={`${process.env.PUBLIC_URL}/webinar`} component={Webinar}/>
                        <Route exact path={`${process.env.PUBLIC_URL}/webinar/detail/:id`} component={WebinarDetail}/>
                        <Route exact path={`${process.env.PUBLIC_URL}/my-webinar`} component={WebinarHistory}/>
                        <Route exact path={`${process.env.PUBLIC_URL}/webinar/review/:id`} component={WebinarReview}/>

                        <Route exact path={`${process.env.PUBLIC_URL}/edukasi/modul-pembelajaran`} component={EducationPage}/>
                        <Route exact path={`${process.env.PUBLIC_URL}/edukasi/modul-pembelajaran/:path_url`} component={EducationDetailPage}/>
                        <Route exact path={`${process.env.PUBLIC_URL}/edukasi/webinar-recording`} component={WebinarRecordingPage}/>
                        <Route exact path={`${process.env.PUBLIC_URL}/edukasi/webinar-recording/:path_url`} component={WebinarRecordingDetailPage}/>

                        <Route exact path={`${process.env.PUBLIC_URL}/article`} component={Article}/>
                        <Route exact path={`${process.env.PUBLIC_URL}/article/detail/:id`} component={ArticleDetail}/>

                        <Route exact path={`${process.env.PUBLIC_URL}/checkout/:product_category/:product_id`} component={CheckoutPage}/>
                        <Route exact path={`${process.env.PUBLIC_URL}/payment/status/:payment_id`} component={CheckoutConfirmation}/>
                        
                        <Route exact path={`${process.env.PUBLIC_URL}/membership/payment/:status/:id`} component={MembershipPayment}/>
                        <Route exact path={`${process.env.PUBLIC_URL}/payment/:status/:id`} component={PaymentPage}/>
                        <Route exact path={`${process.env.PUBLIC_URL}/registrasi/webinar-gratis/:id`} component={FreeWebinarRegistrationSuccess}/>
                        <Route exact path={`${process.env.PUBLIC_URL}/speaker/review/:id`} component={SpeakerReview}/>
                        
                        <Route exact path={`${process.env.PUBLIC_URL}/transaction`} component={Transaction}/>
                        
                        {/* <Route exact path={`${process.env.PUBLIC_URL}/demo-player`} component={JoranPlayer}/> */}
                        
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
