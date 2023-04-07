import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from "axios";
import './Search.css'
import Footer from "../../components/footer/Footer";
import InputField from "../../components/inputField/InputField";
import SubmitButton from "../../components/submitButton/SubmitButton";
import Loading from "../../components/loading/Loading";
import ErrorComponent from "../../components/error/Error";
import Button from "../../components/button/Button";

function Search() {
    const navigate = useNavigate()
    const [formValues, setFormValues] = useState({
        checkinDate: "",
        checkoutDate: "",
        numberOfGuest: ""
    })

    const [citySearch, setCitySearch] = useState('')
    const [cityList, setCityList] = useState([])
    const [selectedCityList, setSelectedCityList] = useState([])
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)

    function handleRemoveCityItem(index) {
        const temp = [...selectedCityList]
        temp.splice(index, 1)
        setSelectedCityList(temp)
    }


    useEffect(() => {
        searchCity(citySearch)
    }, [citySearch])


    async function searchCity(text) {
        if (!text) {
            return;
        }
        try {
            setError(false);
            setLoading(true);

            const response = await axios.get('https://booking-com.p.rapidapi.com/v1/hotels/locations',
                {
                    params: {
                        name: text,
                        locale: 'en-gb'
                    },

                    headers: {
                        'X-RapidAPI-Key': "3dc367959bmshe617c7f249a9921p131658jsnf0b16260c3b4",
                        'X-RapidAPI-Host': 'booking-com.p.rapidapi.com'
                    }
                });
            console.log('search', response.data)
            setCityList(response.data.map((record) => ({
                destId: record.dest_id,
                name: record.name

            })))
        } catch (e) {
            setError(true);

            if (axios.isCancel(e)) {
                console.log("The axios request was cancelled");
            } else {
                console.error(e.message); // toont alleen de foutmelding
            }
        }
        setLoading(false);

    }


    let handleInputChange;
    handleInputChange = (e) => {
        setFormValues({...formValues, [e.target.name]: e.target.value})
    }


    const handleFormSubmit = async (e) => {
        e.preventDefault()

        console.log(formValues)


        navigate('/results', {
            state: {
                checkin_date: formValues.checkinDate,
                checkout_date: formValues.checkoutDate,
                adults_number: formValues.numberOfGuest, dest_id: selectedCityList[0].destId
            }
        })

    }

    return (
        <>
            <main>
                {loading && <Loading />}
                {error && <ErrorComponent message="Could not fetch data!" />}


                <div className='search'>

                    <header>
                        <h1>Search Page</h1>
                    </header>


                    {selectedCityList.map((city) =>
                        <div className='city-list-item'
                             key={city.name}>

                            <p>{city.name}</p>


                            <Button
                            className="city-list-item-button"
                            onClick={() => handleRemoveCityItem(city.id)}
                            text="X"
                            />


                        </div>)}

                    <form onSubmit={handleFormSubmit}>
                        <div>
                            <InputField
                                label="City"
                                type="text"
                                name="city"
                                id="city"
                                value={citySearch}
                                onChange={(e) => setCitySearch(e.target.value)}
                            />
                            {cityList.map((city) => (
                                <p key={city.destId}
                                   onClick={() => {
                                       setSelectedCityList([...selectedCityList, {
                                           name: city.name,
                                           destId: city.destId
                                       }])
                                       setCitySearch('')
                                       setCityList([])
                                   }}>
                                    {city.name}
                                </p>
                            ))}
                        </div>
                        <div>
                            <InputField
                                label="Number of guest"
                                type="number"
                                name="numberOfGuest"
                                id="numberOfGuest"
                                value={formValues.numberOfGuest}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <InputField
                                label="Entry Date"
                                type="date"
                                name="checkinDate"
                                id="checkinDate"
                                value={formValues.checkinDate}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <InputField
                                label="Checkout Date"
                                type="date"
                                name="checkoutDate"
                                id="checkoutDate"
                                value={formValues.checkoutDate}
                                onChange={handleInputChange}
                            />
                        </div>

                        <SubmitButton label="Submit"/>

                    </form>


                    <p>Back to the <Link to="/">Homepage</Link></p>
                </div>

            </main>
            <Footer/>
        </>


    );
}

export default Search;