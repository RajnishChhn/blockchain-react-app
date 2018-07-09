import React from 'react';
import personImage from './person-default.png'
import {Link} from 'react-router-dom'

const UserEmulate = (props) => {
    // const changeUser = (value) => {
    //     props.history.push("/");
    //     props.setUserDetails(value);
    // }
    if (props.setUserLogInDetails && !props.userLoggedIn) {
        props.setUserLogInDetails();
    }
    return (
        <div>
            <div>
                <nav className="w3-sidebar w3-red w3-collapse w3-top w3-large w3-padding" style={{ zIndex: 3, width: 300 + 'px', fontWeight: 'bold' }} id="mySidebar"><br />
                    {/* <a href="javascript:void(0)" className="w3-button w3-hide-large w3-display-topleft" style={{ width: 100 + '%', fontSize: 22 + 'px' }}>Close Menu</a> */}
                    <div className="w3-container" style={{ textAlign: 'left' }}>
                        <img alt="Not found" src={personImage} style={{ maxHeight: 170 + 'px' }} />
                        <h3><b>{props.currentUser.split('#')[1]}</b></h3>
                        <hr />
                    </div>
                    <div className="w3-bar-block">
                        {props.currentUser.includes("Customer") ?
                            <div>
                                <Link to={"/create-shipment"} className="w3-bar-item w3-button w3-hover-white">Shipments</Link>
                                <Link to={"/customer-transaction"} className="w3-bar-item w3-button w3-hover-white">Shipment Transactions</Link>
                                <Link to={"/customer-reporting"} className="w3-bar-item w3-button w3-hover-white">Reporting</Link>
                            </div>
                            :
                            <div>
                                <Link to={"/accept-shipment"} className="w3-bar-item w3-button w3-hover-white">Shipments</Link>
                                <Link to={"/temperature-transaction"} className="w3-bar-item w3-button w3-hover-white">Temperature Transactions</Link>
                                <Link to={"/gps-transaction"} className="w3-bar-item w3-button w3-hover-white">GPS Transactions</Link>
                                <Link to={"/carrier-reporting"} className="w3-bar-item w3-button w3-hover-white">Reporting</Link>
                            </div>
                        }
                        <a href='/' className="w3-bar-item w3-button w3-hover-white" style={{ marginTop: 100 + 'px' }}>Logout</a    >
                    </div>
                </nav>
            </div>>
        </div>
    );
};

export default UserEmulate;

