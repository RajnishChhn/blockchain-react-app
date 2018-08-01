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

    pathChange(path) {
        this.props.changePath(path)
    }
    render() {

        return (
            <div className="w3-white w3-text-grey w3-card-4" style={{ minHeight: 800 + 'px' }}>
                <div className="w3-display-container" style={{ textAlign: 'center', marginBottom: 20 + 'px' }}>
                    <img src={personImage} style={{ width: 50 + '%' }} alt="Avatar" />
                    <div className="w3-display-bottomleft w3-container w3-text-black">
                        <h4><b>{this.props.currentUser.split('#')[1]}</b></h4>
                    </div>
                </div>
                <div>
                    <div className="w3-container">
                        <nav id="mySidebar">
                            {this.props.currentUser.includes("Customer") ?
                                <div>
                                    <p className="w3-hover-teal"><a onClick={() => this.pathChange("/create-shipment")} className="w3-bar-item w3-button w3-hover-teal">Shipments</a></p>
                                    <p className="w3-hover-teal"><a onClick={() => this.pathChange("/customer-transaction")} className="w3-bar-item w3-button w3-hover-teal">Shipment Transactions</a></p>
                                    <p className="w3-hover-teal"><a onClick={() => this.pathChange("/customer-reporting")} className="w3-bar-item w3-button w3-hover-teal">Reporting</a></p>
                                </div>
                                :
                                <div>
                                    <p className="w3-hover-teal"><a onClick={() => this.pathChange("/accept-shipment")} className="w3-bar-item w3-button w3-hover-teal">Shipments</a></p>
                                    <p className="w3-hover-teal"><a onClick={() => this.pathChange("/temperature-transaction")} className="w3-bar-item w3-button w3-hover-teal">Temperature Transactions</a></p>
                                    <p className="w3-hover-teal"><a onClick={() => this.pathChange("/gps-transaction")} className="w3-bar-item w3-button w3-hover-teal">GPS Transactions</a></p>
                                    <p className="w3-hover-teal"><a onClick={() => this.pathChange("/carrier-reporting")} className="w3-bar-item w3-button w3-hover-teal">Reporting</a></p>
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

