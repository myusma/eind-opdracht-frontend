import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from "axios";
import './Search.css'
import Footer from "../../components/footer/Footer";
import InputField from "../../components/inputField/InputField";
import SubmitButton from "../../components/button/SubmitButton";

function Search() {
    const navigate = useNavigate()
    const [formValues, setFormValues] = useState({})
    const [citySearch, setCitySearch] = useState('')
    const [cityList, setCityList] = useState([])
    const [selectedCityList, setSelectedCityList] = useState([])

    function handleRemoveCityItem (index){
        const temp = [...selectedCityList]
        temp.splice(index,1)
        setSelectedCityList(temp)
    }


    useEffect(() => {
        searchCity(citySearch)
    }, [citySearch])


    const searchCity = async (text) => {
        const response = await axios.get('https://booking-com.p.rapidapi.com/v1/hotels/locations', {
            params: {name: text, locale: 'en-gb'},
            headers: {
                'X-RapidAPI-Key': '0cc531a7a2msh8cbb54b572e8654p1cbd69jsn55287375b7d4',
                'X-RapidAPI-Host': 'booking-com.p.rapidapi.com'
            }
        });
        console.log('search', response.data)
        setCityList(response.data.map((record) => ({
            destId: record.dest_id,
            name: record.name
        })))
    }

    const handleInputChange = (e) => {
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
            <div className='search'>

                <h1>Search Page</h1>


                {selectedCityList.map((city,index) =>
                    <div className='city-list-item' key={index}>
                        <p>{city.name}</p>
                        <button className='city-list-item-button' onClick={()=>handleRemoveCityItem(index)}>X</button>
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

                    <SubmitButton label="Submit" />

                </form>


                <p>Back to the <Link to="/">Homepage</Link></p>
            </div>

            <Footer/>
        </>


    );
}

export default Search;