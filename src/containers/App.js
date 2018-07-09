import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Router, Route } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';

import Dashboard from '../components/Dashboard';
import CustomerReporting from '../components/CustomerReporting';
import CarrierReporting from '../components/CarrierReporting';
import CustomerTransaction from '../components/CustomerTransaction';
import TemperatureTransaction from '../components/TemperatureTransaction';
import GPSTransaction from '../components/GPSTransaction';
import CustomerShipment from '../components/CustomerShipment';
import CarrierShipment from '../components/CarrierShipment';
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
        default:
        break
    }

  }


  componentDidMount() {
    this.props.getCardDetailsPing();
    this.props.getAllShipments();
  }
  render() {
    // const isCustomer = this.props.user.user.includes('Customer');  
    let userLoggedIn = this.props.user.userLoggedIn;
    let cardUploaded = this.props.user.user;
    return (
      <div>
        <ReduxToastr
          timeOut={5000}
          newestOnTop={false}
          preventDuplicates
          position="top-right"
          transitionIn="fadeIn"
          transitionOut="fadeOut"
          progressBar />
        <Router history={history}>
          <div>
            {/* {userLoggedIn && !cardUploaded &&
            <LoginModal {...this.props} showCard={true} history={history}/>  
          } */}
            {this.props.user.userLoggedIn && cardUploaded &&
              <UserEmulate setUserDetails={this.props.setUserDetails} history={history} currentUser={this.props.user.user} />
            }
            <Route exact path="/card-auth" component={() => cardUploaded ? <UserEmulate setUserDetails={this.props.setUserDetails} history={history} currentUser={this.props.user.user} setUserLogInDetails={this.props.setUserLogInDetails} userLoggedIn={this.props.user.userLoggedIn} />
              : <LoginModal {...this.props} showCard={true} history={history} />} />
            {(!userLoggedIn || !cardUploaded) &&
              <img alt="Not found" src={landingPageImage} style={{ height: 'auto', width: 100 + '%' }} />
            }
            <div className="w3-container" id="contact" style={{ marginTop: 75 + 'px', marginLeft: 380 + 'px' }}>
              {/*<Route exact path="/card-auth" component={() => <CardAuthentication {...this.props} history={history}/>} />*/}
              {/* <Redirect from="/" to={isCustomer ? 'create-shipment':'accept-shipment' } /> */}
              <img alt="Not found" src={coyoteLogo} style={{ height: 'auto', width: 160 + 'px', float: 'right', marginTop: -78 + 'px' }} />
              <Route exact path="/" component={() => <LoginModal history={history} />} />
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