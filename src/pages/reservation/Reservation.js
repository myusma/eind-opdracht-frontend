import './Reservation.css'
import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";
import SubmitButton from "../../components/button/SubmitButton";
import Footer from "../../components/footer/Footer";


const Reservation = () => {

    const {id} = useParams()
    const [hotelData, setHotelData] = useState({})
    const [errorBankAccount, setErrorBankAccount] = useState(null)
    const [bankAccountNumber, setBankAccountNumber] = useState(null)
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const getReservation = async () => {
            try {
                setError(false);
                setLoading(true);

                const url = `https://booking-com.p.rapidapi.com/v1/hotels/data?locale=en-gb&hotel_id=${id}`;

                const response = await fetch(url, {
                    method: "GET",
                    headers: {
                        "X-RapidAPI-Key": "0cc531a7a2msh8cbb54b572e8654p1cbd69jsn55287375b7d4",
                        "X-RapidAPI-Host": "booking-com.p.rapidapi.com",
                    },
                });

                const data = await response.json();
                setHotelData(data);
                console.log("hotel data", data);
            } catch (error) {
                console.error(error);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        void getReservation();
    }, [id]);

    useEffect(()=>{
        function validation(){
            let expression = /[a-zA-Z0-9]{18}/;
            if(!expression.test(bankAccountNumber)){
                setErrorBankAccount('Bankaccount number should have 18 digits')
            }else {
                setErrorBankAccount(null)
            }

        }
        validation()
    },[bankAccountNumber])

    function pay(){
        if(!errorBankAccount && bankAccountNumber){
            alert("payment received successfully !")
        }
    }

    return (
        <>

            {loading && <p>Loading...</p>}
            {error && <p>Error: Could not fetch data!</p>}


        <div className='payment-container'>

            <div>
                <h2>{hotelData?.name}</h2>
                Bank Account Number :
                <input
                    type='text' onChange={(e) => setBankAccountNumber(e.target.value)}>
                </input>
                <br/>
                <br/>
                <SubmitButton label="Pay" onClick={() => pay()} />

                {errorBankAccount && <h4 style={{color: 'red'}}>{errorBankAccount}</h4>}

            </div>

            <Footer/>

        </div>

        </>
    );
};

export default Reservation;