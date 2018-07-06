import React from 'react';

class ReportingComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputStatus: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit() {
        this.props.getCustShipmentStatusQueryResult(this.state.inputStatus);
    }

    handleChange(event) {
        this.setState({ inputStatus: event.target.value })
    }

    render() {
        return (
            <div>
                <h4>Select all shipments for a specific status</h4>
                <div className="input-group mt-4">
                    <select className="custom-select col-4" id="inputGroupSelect01" onChange={this.handleChange}>
                        <option defaultValue>Select status...</option>
                        <option value="CREATED">CREATED</option>
                        <option value="IN_TRANSIT">IN TRANSIT</option>
                        <option value="ARRIVED">ARRIVED</option>
                    </select>
                    <div className="input-group-append">
                        <button className="btn btn-outline-secondary" type="button" onClick={this.handleSubmit}>Get</button>
                    </div>
                </div>

                <table className="table table-hover mt-4">
                    <thead >
                        <tr>
                            <th scope="col">Shipment Id</th>
                            <th scope="col">Commodity</th>
                            <th scope="col">Status</th>
                            <th scope="col">Unit Count</th>
                            <th scope="col">Contract</th>
                            {/* <th scope="col">Temperature Readings</th> */}
                            {/* <th scope="col">GPS Readings</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.user.shipmentStatusQueryResult &&
                            this.props.user.shipmentStatusQueryResult.data.map((shipment) =>
                                <tr key={shipment.shipmentId}>
                                    <th scope="row">{shipment.shipmentId}</th>
                                    <td>{shipment.type}</td>
                                    <td>{shipment.status}</td>
                                    <td>{shipment.unitCount}</td>
                                    <td>{shipment.contract.substring(shipment.contract.lastIndexOf("#") + 1)}</td>
                                    {/* <td>{shipment.temperatureReadings.map((temperature) => temperature.centigrade + ", ")}</td> */}
                                    {/* <td>{shipment.gpsReadings.map((gps) => gps + ", ")}</td> */}
                                </tr>
                            )}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default ReportingComponent