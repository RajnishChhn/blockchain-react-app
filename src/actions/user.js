import axios from "axios";
import constants from "../common";

axios.defaults.withCredentials = true;

export const setUserDetails = details => {
    return {
        type: "CHANGE_USER",
        payload: details.participant
    };
}

export const getAllShipments = () => {
    return dispatch => {
        axios.request({
            method: 'get',
            url: `${constants.API_BASE_URL}${constants.GET_CREATE_SHIPMENTS}`
        }).then(response => {
            // localStorage.setItem("UserDetails", JSON.stringify(response.data));
            dispatch(receivedAllShipments(response.data));
        }).catch(err =>
            console.log(err)
        );
    }
}

const receivedAllShipments = shipments => {
    return {
        type: "RECEIVE_SHIPMENTS",
        payload: shipments
    }
}

export const createShipment = shipment => {
    return dispatch => {
        axios.request({
            method: 'post',
            url: `${constants.API_BASE_URL}${constants.GET_CREATE_SHIPMENTS}`,
            data: shipment
        }).catch(err =>
            console.log(err)
        );
    }
}

export const acceptShipment = shipmentId => {
    return dispatch => {
        axios.request({
            method: 'post',
            url: `${constants.API_BASE_URL}${constants.ACCEPT_SHIPMENT}`,
            data: {
                shipment: shipmentId
            }
        }).catch(err =>
            console.log(err)
        );
    }
}

export const getCardDetailsPing = () => {
    return dispatch => {
        axios.request({
            method: 'get',
            url: `${constants.API_BASE_URL}${constants.GET_CARD_PING}`
        }).then(response => {
            dispatch(setUserDetails(response.data));
        }).catch(err =>
            console.log("error", err.message)
        );
    }
}

// const cardUploaded=()=>{
//     return {
//         type: "CARD_UPLOADED",        
//         payload: true
//     }
// }

export const importCard = (cardDetails) => {
    return dispatch => {
        axios.request({
            method: 'post',
            url: `${constants.API_BASE_URL}${constants.CARD_IMPORT}?name=${cardDetails.get('name')}`,
            data: cardDetails,
            config: { headers: { 'Content-Type': 'multipart/form-data' } }
        }).then(response => {
            console.log(response)
            dispatch(setDefaultCard(cardDetails));
        }).catch(err =>
            console.log(err.message)
        );
    }
}

export const setDefaultCard = (cardDetails) => {
    return dispatch => {
        axios.request({
            method: 'post',
            url: `${constants.API_BASE_URL}wallet/${cardDetails.get('name')}/setDefault`,
        }).then(response => {
            // dispatch(cardUploaded(cardDetails));
            dispatch(getCardDetailsPing());
        }).catch(err =>
            console.log(err.message)
        );
    }
}

export const receiveShipment = (shipmentId) => {
    return dispatch => {
        axios.request({
            method: 'post',
            url: `${constants.API_BASE_URL}${constants.RECEIVE_SHIPMENT}`,
            data: {
                shipment: shipmentId
            }
        }).then(response => {
            console.log(response)
        }).catch(err =>
            console.log(err.message)
        );
    }
}

export const submitTemperature = (formData) => {
    return dispatch => {
        axios.request({
            method: 'post',
            url: `${constants.API_BASE_URL}${constants.SUBMIT_TEMPERATURE}`,
            data: formData
        }).then(response => {
            console.log(response)
        }).catch(err =>
            console.log(err.message)
        );
    }
}

export const submitGPS = (formData) => {
    return dispatch => {
        axios.request({
            method: 'post',
            url: `${constants.API_BASE_URL}${constants.SUBMIT_GPS}`,
            data: formData
        }).then(response => {
            console.log(response)
        }).catch(err =>
            console.log(err.message)
        );
    }
}

export const setUserLogInDetails = () => {
    return {
        type: "USER_LOGGEDIN",
        payload: true
    }
}

const setTemperatureQueryResult = (result) => {
    return {
        type: "TEMPERATURE_QUERY_FETCHED",
        payload: result
    }
}

const setShipmentStatusQueryResult = (result) => {
    return {
        type: "SHIPMENT_STATUS_QUERY_FETCHED",
        payload: result
    }
}

export const getCarrierTemperatureQueryResult = (inputTemperature) => {
    return dispatch => {
        axios.request({
            method: 'get',
            url: `${constants.API_BASE_URL}${constants.GET_TEMPERATURE}${inputTemperature}`
        }).then(response => {
            dispatch(setTemperatureQueryResult(response));
        }).catch(err =>
            console.log(err.message)
        );
    }
}

export const getCustShipmentStatusQueryResult =(inputStatus) =>{
    return dispatch => {
        axios.request({
            method: 'get',
            url: `${constants.API_BASE_URL}${constants.GET_SHIPMENTS_BY_STATUS}${inputStatus}`
        }).then(response => {
            dispatch(setShipmentStatusQueryResult(response));
        }).catch(err =>
            console.log(err.message)
        );
    }
}

export const changePath =(path)=>{
    return{
        type:"CHANGE_PATH",
        payload:path
    }
}