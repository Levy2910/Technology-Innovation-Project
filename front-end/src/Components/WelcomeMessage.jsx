/**
 * Name: Tung Le
 * Student ID: 4936809
 */

import axios from "axios";
import { useEffect, useState } from "react"
import "../Css/WelcomeMessage.css";

function WelcomeMessage() {
    const [message, setMessage] = useState('');   

    useEffect(() => {     
        axios.get('https://api.ipify.org?format=json') // get ip address from website api.ipity.org in json
            .then(response => {
                // send the returned ip address to the backend
                return axios.post('http://127.0.0.1:8000/api/trackAnonymousUser', {ip_address: response.data.ip});
            })
            .catch(error => {
                console.error("Error in fetching IP: ", error);
                // send 'unavailable' to the backend
                return axios.post('http://127.0.0.1:8000/api/trackAnonymousUser', {ip_address: 'unavailable'});
            })
            .then(response => {
                // set the message received from the backend
                setMessage(response.data.message);
            })
            .catch(error => {
                console.error("Error sending data to backend:", error);
                // Default message in case of any error
                setMessage('Welcome to HIV Support Community'); 
            });
    }, [])

    return (
        <div className="welcome-message"> {message} </div>
    )
}

export default WelcomeMessage;