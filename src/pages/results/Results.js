import React, {useEffect, useState} from 'react';
import {Link, useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
import './Results.css'
import Footer from "../../components/footer/Footer";
import Loading from "../../components/loading/Loading";
import ErrorComponent from "../../components/error/Error";
import Button from "../../components/button/Button";


function Results() {
    const navigate = useNavigate()
    const {state} = useLocation()
    const {checkin_date, checkout_date, adults_number, dest_id} = state
    const [hotelList, setHotelList] = useState([])
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [priceLowToHigh, setPriceLowToHigh] = useState(true)


    useEffect(() => {
        const getData = async () => {
            try {
                setError(false);
                setLoading(true);

                const response = await axios.get('https://booking-com.p.rapidapi.com/v1/hotels/search', {
                    params: {
                        checkin_date: checkin_date,
                        checkout_date: checkout_date,
                        adults_number: adults_number,
                        room_number: '1',
                        locale: 'en-gb',
                        order_by: 'price',
                        filter_by_currency: 'EUR',
                        units: 'metric',
                        dest_type: 'city',
                        dest_id: dest_id,
                        page_number: '0',


                    },
                    headers: {
                        'X-RapidAPI-Key': '3dc367959bmshe617c7f249a9921p131658jsnf0b16260c3b4',
                        'X-RapidAPI-Host': 'booking-com.p.rapidapi.com'
                    }

                });
                console.log("acd", response.data.result)
                setHotelList(response.data.result)
            } catch (e) {
                setError(true)

                if (axios.isCancel(e)) {
                    console.log('The axios request was cancelled')
                } else {
                    console.error(e)
                }
            } finally {
                setLoading(false)
            }

        }

        void getData()
    }, [])


    function selectByPrice() {
        let hotels = [...hotelList]
        setHotelList([])
        if (priceLowToHigh) {
            hotels.sort((a, b) => {
                return a.min_total_price - b.min_total_price
            })
            setPriceLowToHigh(false)
        } else {
            hotels.sort((a, b) => {
                return b.min_total_price - a.min_total_price
            })
            setPriceLowToHigh(true)
        }
        setHotelList(hotels)
    }

    return (
        <main>
            <section>

                <Button
                onClick={selectByPrice}
                text="Select by price"
                />

            </section>

            <section>

                {loading && <Loading />}
                {error && <ErrorComponent message="Could not fetch data!" />}

                {hotelList.map((hotel) => {
                    return (
                        <article
                            className='container'
                            onClick={() => {
                                navigate('/details/' + hotel.hotel_id);
                            }}
                            key={hotel.hotel_id}
                        >
                            <div className='foto-container'>
                                <img className='foto' src={hotel.max_photo_url} alt='photos' />
                            </div>

                            <div className='content-container'>
                                <h2>{hotel.hotel_name}</h2>
                                <h3>{hotel.address}</h3>
                                <h3>{hotel.city_trans}</h3>
                                <h2>Total Price : {hotel.min_total_price.toFixed(2)}{hotel.currencycode}</h2>
                                <h3>Score: {hotel.review_score}</h3>
                            </div>
                        </article>
                    );
                })}
            </section>

            <nav>
                <p>
                    Back to the <Link to='/'>Homepage</Link>
                </p>
            </nav>

            <Footer />
        </main>
    );
}

export default Results;