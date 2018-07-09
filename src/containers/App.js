import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Router, Route, Redirect } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';

import Dashboard from '../components/Dashboard';
import CustomerReporting from '../components/CustomerReporting';
import CarrierReporting from '../components/CarrierReporting';
import CustomerTransaction from '../components/CustomerTransaction';
import TemperatureTransaction from '../components/TemperatureTransaction';
import GPSTransaction from '../components/GPSTransaction';
import CustomerShipment from '../components/CustomerShipment';
import CarrierShipment from '../components/CarrierShipment';
import Login from '../components/Login';
import CardAuthentication from '../components/CardAuthentication';
import UserEmulate from "../components/UserEmulate";
import LoginModal from "../components/LoginModal";
import { userActions } from "../actions";
import landingPageImage from '../components/carrier-landing-hero.jpg'
import coyoteLogo from '../components/coyote_logo.jpg'
import ReduxToastr from 'react-redux-toastr'
import { toastr } from 'react-redux-toastr'
import constants from '../common';

const history = createBrowserHistory();

class App extends Component {
  constructor(props) {
    super(props);
    this.ShowNotification = this.ShowNotification.bind(this);
    var websocket = new WebSocket(constants.WEB_SOCKET_ENDPOINT);
    websocket.onclose = function (evt) { console.log("close : " + JSON.stringify(evt)); };
    websocket.onopen = function (evt) { console.log("open : " + JSON.stringify(evt)); };
    websocket.onmessage = (evt) => this.ShowNotification(evt.data);
    websocket.onerror = function (evt) { console.log("error : " + JSON.stringify(evt)); };
    console.log("now state : " + websocket.readyState)
  }

  ShowNotification(event) {
    var namespace = "org.acme.shipping.perishable.";
    var eventData = JSON.parse(event);
    var message = "";

    switch (eventData["$class"]) {
      case namespace + "TemperatureThresholdEvent":
        console.log(eventData)
        toastr.error(`Shipment : ${eventData.shipment.split('#')[1]}`, `Temperature threshold violated. Temperature was ${eventData.temperature}`);

        break;
      case namespace + "ShipmentAcceptedError":
        toastr.error(`Shipment : ${eventData.shipment.split('#')[1]}`, `The shipment is already accepted`);

        break;
      case namespace + "ShipmentHasArrived":
        toastr.success(`Shipment : ${eventData.shipment.split('#')[1]}`, `Shipment has arrived. Shipment Amount : ${eventData.shipmentAmount}. Penalty : ${eventData.penalty}`);

        break;
      case namespace + "ShipmentInPortEvent":
        toastr.success(`Shipment : ${eventData.shipment.split('#')[1]}`, `Shipment Location updated`);
        break;
    }

  }


  componentDidMount() {
    this.props.getCardDetailsPing();
    this.props.getAllShipments();
    if (sessionStorage.userLoggedIn) {
      // document.body.style.maxWidth='1400px';
    }
  }
  render() {
    // const isCustomer = this.props.user.user.includes('Customer');  
    let userLoggedIn = sessionStorage.userLoggedIn;
    let cardUploaded = true//this.props.user.user;
    return (
      <div>
        {/* {(!userLoggedIn || !cardUploaded) &&
          <img src={landingPageImage} style={{ height: 'auto', width: 100 + '%' }} />
        } */}
        <ReduxToastr
          timeOut={10000}
          newestOnTop={false}
          preventDuplicates
          position="top-right"
          transitionIn="fadeIn"
          transitionOut="fadeOut"
          progressBar />
        <Router history={history}>
          <div class="w3-row-padding">
            {(!userLoggedIn || !cardUploaded) &&
              <img src={landingPageImage} style={{ height: 'auto', width: 100 + '%' }} />
            }
            <div class="w3-third">
              {userLoggedIn && cardUploaded &&
                <UserEmulate setUserDetails={this.props.setUserDetails} history={history} currentUser={this.props.user.user} />
              }
            </div>

            <div className={userLoggedIn && cardUploaded ? "w3-twothird w3-card w3-white right-div" : ''} id="contact">
              <div className="w3-container w3-margin-bottom">
                <Route exact path="/card-auth" component={() => cardUploaded ? <Dashboard />
                  : <LoginModal {...this.props} showCard={true} history={history} />} />
                {userLoggedIn && cardUploaded &&
                  <div className="w3-container w3-margin">
                    <img src={coyoteLogo} style={{ height: 'auto', width: 160 + 'px', float: 'right' }} />
                  </div>

                }

                <Route exact path="/" component={() =>
                  userLoggedIn && cardUploaded ?
                    <Dashboard />
                    :
                    <LoginModal history={history} />} />
                <Route exact path='/dashboard' component={Dashboard} />
                <Route exact path='/create-shipment' component={() => <CustomerShipment {...this.props} />} />
                <Route exact path='/accept-shipment' component={() => <CarrierShipment {...this.props} />} />
                <Route exact path='/customer-transaction' component={() => <CustomerTransaction {...this.props} />} />
                <Route exact path='/temperature-transaction' component={() => <TemperatureTransaction {...this.props} />} />
                <Route exact path='/gps-transaction' component={() => <GPSTransaction {...this.props} />} />
                <Route exact path='/customer-reporting' component={() => <CustomerReporting {...this.props} />} />
                <Route exact path='/carrier-reporting' component={() => <CarrierReporting {...this.props} />} />
              </div>
            </div>
          </div>
        </Router>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.User,
  };
}

function matchDispatchToProps(dispatch) {
  return {
    ...bindActionCreators(Object.assign({}, userActions), dispatch),
    dispatch
  };
}

export default connect(mapStateToProps, matchDispatchToProps)(App);