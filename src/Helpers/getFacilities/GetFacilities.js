import axios from "axios";

export async function getHotelFacilities(id) {
    try {
        const response = await axios.get('https://booking-com.p.rapidapi.com/v1/hotels/facilities', {
            params: {hotel_id: id, locale: 'en-gb'},
            headers: {
                'X-RapidAPI-Key': '0cc531a7a2msh8cbb54b572e8654p1cbd69jsn55287375b7d4',
                'X-RapidAPI-Host': 'booking-com.p.rapidapi.com'
            }
        })
        return response.data
    } catch (error) {
        console.error(error)
        return null
    }
}