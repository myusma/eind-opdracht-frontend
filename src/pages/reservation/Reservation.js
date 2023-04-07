import './Reservation.css'
import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";
import SubmitButton from "../../components/submitButton/SubmitButton";
import Footer from "../../components/footer/Footer";
import Loading from "../../components/loading/Loading";
import ErrorComponent from "../../components/error/Error";



const Reservation = () => {

    const {id} = useParams()
    const [hotelData, setHotelData] = useState({})
    const [errorBankAccount, setErrorBankAccount] = useState(false)
    const [bankAccountNumber, setBankAccountNumber] = useState(false)
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
                        "X-RapidAPI-Key": "3dc367959bmshe617c7f249a9921p131658jsnf0b16260c3b4",
                        "X-RapidAPI-Host": "booking-com.p.rapidapi.com",
                    },
                });

                const data = await response.json();
                setHotelData(data);
                console.log("hotel data", data);

            } catch (e) {
                setError(true);

                if (axios.isCancel(e)) {
                    console.log('The axios request was cancelled')
                } else {
                    console.error(e)
                }
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
                setErrorBankAccount(false)
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

            {loading && <Loading />}
            {error && <ErrorComponent message="Could not fetch data!" />}


        <main className='payment-container'>

            <div>
                <h2>{hotelData?.name}</h2>
                Bank Account Number :

                <input
                    type='text'
                    onChange={(e) => setBankAccountNumber(e.target.value)}>
                </input>

                <br/>
                <br/>

                <SubmitButton
                    label="Pay"
                    onClick={() => pay()}
                />

                {errorBankAccount && <h4 style={{color: 'red'}}>{errorBankAccount}</h4>}

            </div>

            <Footer/>

        </main>

        </>
    );
};

export default Reservation;