import React from 'react';
import personImage from './person-default.png'
import { Link } from 'react-router-dom'

class UserEmulate extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        sessionStorage.userLoggedIn = true;
    }
    render() {
        // const changeUser = (value) => {
        //     this.props.history.push("/");
        //     this.props.setUserDetails(value);
        // }
        // if (this.props.setUserLogInDetails && !this.props.userLoggedIn) {
        //     this.props.setUserLogInDetails();
        // }
        return (
            <div className="w3-white w3-text-grey w3-card-4">
                <div className="w3-display-container">
                    {/* <a href="javascript:void(0)" className="w3-button w3-hide-large w3-display-topleft" style={{ width: 100 + '%', fontSize: 22 + 'px' }}>Close Menu</a> */}
                    {/* <div className="w3-container" style={{ textAlign: 'left' }}> */}
                    <img src={personImage} style={{ width: 100 + '%' }} alt="Avatar" />
                    {/* <i class="fa fa-user-circle fa-5x w3-margin-right w3-xxlarge w3-text-teal"></i> */}
                    <div class="w3-display-bottomleft w3-container w3-text-black">
                        <h2><b>{this.props.currentUser.split('#')[1]}</b></h2>
                        {/* <hr /> */}
                    </div>
                </div>
                <div>
                    <div className="w3-container">
                        <nav id="mySidebar">

                            {this.props.currentUser.includes("Customer") ?
                                <div>
                                    <p className="w3-hover-teal"><Link to={"/create-shipment"} className="w3-bar-item w3-button w3-hover-teal">Shipments</Link></p>
                                    <p className="w3-hover-teal"><Link to={"/customer-transaction"} className="w3-bar-item w3-button w3-hover-teal">Shipment Transactions</Link></p>
                                    <p className="w3-hover-teal"><Link to={"/customer-reporting"} className="w3-bar-item w3-button w3-hover-teal">Reporting</Link></p>
                                </div>
                                :
                                <div>
                                    <p className="w3-hover-teal"><Link to={"/accept-shipment"} className="w3-bar-item w3-button w3-hover-teal">Shipments</Link></p>
                                    <p className="w3-hover-teal"><Link to={"/temperature-transaction"} className="w3-bar-item w3-button w3-hover-teal">Temperature Transactions</Link></p>
                                    <p className="w3-hover-teal"><Link to={"/gps-transaction"} className="w3-bar-item w3-button w3-hover-teal">GPS Transactions</Link></p>
                                    <p className="w3-hover-teal"><Link to={"/carrier-reporting"} className="w3-bar-item w3-button w3-hover-teal">Reporting</Link></p>
                                </div>
                            }
                            <a href='/' className="w3-bar-item w3-button" style={{ marginTop: 100 + 'px' }}>Logout</a>
                        </nav>
                    </div>
                </div>
            </div>
        );
    };
}
export default UserEmulate;

