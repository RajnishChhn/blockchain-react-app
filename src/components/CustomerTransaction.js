import React from 'react';

class CustomerTransaction extends React.Component {
    constructor(props) {
        super(props)

        this.handleChange = this.handlechange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handlechange(event) {
        this.setState({
            [event.target.id]: event.target.value
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.receiveShipment(this.state.shipmentId);
    }
    render() {
        return (
            <div className="row">
                <div className="col-5">
                    <h4>Confirm arrival of a Shipment</h4>
                    <form>
                        <div className="form-group">
                            <label htmlFor="shipmentId">Shipment Id</label>
                            <select className="form-control" id="shipmentId" onChange={this.handleChange}>
                                <option defaultValue>Select Shipment...</option>
                                {this.props.user.shipments && this.props.user.shipments.map(shipment =>
                                    <option value={shipment.shipmentId} key={shipment.shipmentId}>{shipment.shipmentId}</option>
                                )}
                            </select>

                            {/* <input type="text" className="form-control" id="shipmentId" onChange={(event) => this.handlechange(event)} /> */}
                        </div>
                        <button className="btn btn-primary" onClick={(event) => this.handleSubmit(event)}>Shipment Arrived</button>
                    </form>
                </div>
            </div>
        )
    }

}

export default CustomerTransaction