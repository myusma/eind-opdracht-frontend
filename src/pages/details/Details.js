import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import './Details.css'
import {Slide} from "react-slideshow-image";
import 'react-slideshow-image/dist/styles.css'
import SubmitButton from "../../components/button/SubmitButton";
import {getHotelDetails} from "../../Helpers/getDetails/GetDetails";
import {getHotelPhotos} from "../../Helpers/getPhotos/GetPhotos";
import {getHotelDescription} from "../../Helpers/getDescription/GetDescription";
import {getHotelFacilities} from "../../Helpers/getFacilities/GetFacilities";


function Details() {
    const navigate = useNavigate()
    const {id} = useParams()
    const [hotelDetail, setHotelDetail] = useState({})
    const [hotelPhotos, setHotelPhotos] = useState([])
    const [hotelDescription, setHotelDescription] = useState({})
    const [hotelFacilities, setHotelFacilities] = useState([])
    const [dialogOpen, setDialogOpen] = useState(false)
    const [dialogImageSrc, setDialogImageSrc] = useState(null)
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        async function getDetails() {
            setLoading(true);
            try {
                setError(false);
                const details = await getHotelDetails(id)
                setHotelDetail(details)

                const photos = await getHotelPhotos(id)
                setHotelPhotos(photos)

                const description = await getHotelDescription(id)
                setHotelDescription(description)

                const facilities = await getHotelFacilities(id)
                setHotelFacilities(facilities)

            } catch (e) {
                setError(true)

                if (axios.isCancel(e)) {
                    console.log('The axios request was cancelled')
                } else {
                    console.error(e)
                }
            }
            setLoading(false);

        }

        void getDetails()

    }, [])

    return (

        <div>
            {loading && <p>Loading...</p>}
            {error && <p>Error: Could not fetch data!</p>}

            {hotelPhotos.length > 0 &&
                <div>
                    <Slide
                        nextArrow={
                        <button type="button" className='arrowButton nextArrow'>⮕</button>
                    }
                        prevArrow={
                        <button type="button" className='arrowButton prevArrow'>⬅</button>
                    }
                    >

                        {hotelPhotos.map((slideImage, index) => {
                            return<div className='div-style' key={index}
                                       style={{'backgroundImage': `url(${slideImage?.url_1440})`}}></div>
                        })}

                    </Slide>

                </div>}


            <div className='item-container'>
                {hotelPhotos?.map((f, index) => {
                    return (

                        <img
                            key={index}
                            onClick={() => {
                            setDialogOpen(true)
                            setDialogImageSrc(f?.url_1440)
                        }}
                            className='photo-items'
                            src={f.url_1440}
                            alt="kamers"/>
                    )
                })}
            </div>


            <p>{hotelDescription?.description}</p>

            <p><b>Score: {hotelDetail.review_score}</b></p>

            <div>
                <b>Facilities:</b>
                <ul className='facilities'>
                    {hotelFacilities?.map((item, index) => {
                        return (
                            <li key={index}>{item.facility_name}</li>

                        )
                    })}
                </ul>
            </div>

            <dialog className='dialog' open={dialogOpen}>

                <div className='dialog-content'>
                    <div className= 'dialog-top-area'>

                        <button
                            type="button"
                            onClick={()=>{setDialogOpen(false)}}>
                            X
                        </button>

                    </div>

                    <div className='dialog-bottom-area'>

                        <img
                            className='hotel-big-image'
                            src={dialogImageSrc}
                            alt="hotel-big"
                        />

                    </div>
                </div>

            </dialog>

            <div className="reservation-area">
                <div className="reservation-button-container">

                    <SubmitButton
                        label="Book now"
                        className="reservation-button" onClick={() => {
                        navigate('/reservation/' + id)
                    }}/>

                </div>
            </div>

        </div>
    );
}

export default Details;