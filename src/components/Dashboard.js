import React from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { userActions } from "../actions";

class Dashboard extends React.Component {

  componentDidMount() {
    // this.props.getAllShipments();
  }
  render() { 
      if(this.props.user === null) {
          return(
              <div/>
          )
      }   
    return (
      <div>
          hello          
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

export default connect(mapStateToProps, matchDispatchToProps)(Dashboard);