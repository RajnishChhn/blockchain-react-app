import React from 'react';

class CustomerShipment extends React.Component {
    constructor(props) {
        super(props)

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.id]: event.target.value
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        const formData = {
            unitCount: this.state.unitCount,
            type: this.state.type,
            status: this.state.status,
            contract: this.state.contract,
            shipmentId: this.state.shipmentId
        }
        this.props.createShipment(formData);
    }
    render() {
        // if(!this.props.user || !this.props.user.shipments) {
        //     return(
        //         <div/>
        //     )
        // }
        return (
            <div>
                <h2 class="w3-text-grey w3-padding-16"><i class="fa fa-truck fa-fw w3-margin-right w3-xxlarge w3-text-teal"></i>Shipment Management</h2>
                {/* <div className="row"> */}
                <div className="w3-container jumbotron">
                    <h4>Create Shipment</h4>
                    <form>
                        <div className="form-group">
                            <label htmlFor="shipmentId">Shipment</label>
                            <input type="text" className="form-control" id="shipmentId" onChange={event => this.handleChange(event)} />
                        </div>
                        <div className="row">
                            <div className="col">
                                <div className="form-group">
                                    <label htmlFor="unitCount">Units</label>
                                    <input type="text" className="form-control" id="unitCount" onChange={event => this.handleChange(event)} />
                                </div>
                            </div>
                            <div className="col">
                                <div className="form-group">
                                    <label htmlFor="type">Commodity</label>
                                    <select className="form-control" id="type" onChange={this.handleChange}>
                                        <option defaultValue>Select Commodity...</option>
                                        <option value="APPLES">APPLES</option>
                                        <option value="BANANAS">BANANAS</option>
                                        <option value="PEACHES">PEACHES</option>
                                    </select>

                                    {/* <input type="text" className="form-control" id="type" onChange={event => this.handleChange(event)} /> */}
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <div className="form-group">
                                    <label htmlFor="status" >Status</label>
                                    <select className="form-control" id="status" onChange={this.handleChange}>
                                        <option defaultValue>Select status...</option>
                                        <option value="CREATED">CREATED</option>
                                        <option value="IN_TRANSIT">IN TRANSIT</option>
                                        <option value="ARRIVED">ARRIVED</option>
                                    </select>

                                    {/* <input type="text" className="form-control" id="status" onChange={event => this.handleChange(event)} /> */}
                                </div>
                            </div>
                            <div className="col">
                                <div className="form-group">
                                    <label htmlFor="contract" >Contract</label>
                                    <input type="text" className="form-control" id="contract" onChange={event => this.handleChange(event)} />
                                </div>
                            </div>
                        </div>
                        <button type="submit" className="btn w3-teal" onClick={event => this.handleSubmit(event)}>Create Shipment</button>
                    </form>
                    <hr />
                </div>
                {/* </div> */}

                <div className="w3-container">
                    <div>
                        <h4>Shipments</h4>
                        <table className="table table-hover">
                            <thead  className="w3-teal">
                                <tr>
                                    <th scope="col">Shipment Id</th>
                                    <th scope="col">Commodity</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Unit Count</th>
                                    <th scope="col">Contract</th>
                                    <th scope="col">Temperature Readings</th>
                                    <th scope="col">GPS Readings</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.props.user.shipments &&
                                    this.props.user.shipments.map((shipment) =>
                                        <tr key={shipment.shipmentId}>
                                            <th scope="row">{shipment.shipmentId}</th>
                                            <td>{shipment.type}</td>
                                            <td>{shipment.status}</td>
                                            <td>{shipment.unitCount}</td>
                                            <td>{shipment.contract.substring(shipment.contract.lastIndexOf("#") + 1)}</td>
                                            <td>{shipment.temperatureReadings.map((temperature) => temperature.centigrade + ", ")}</td>
                                            <td>{shipment.gpsReadings.map((gps) => gps + ", ")}</td>
                                        </tr>
                                    )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}

export default CustomerShipment