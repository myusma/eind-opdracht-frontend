import axios from "axios";

export async function getHotelFacilities(id) {
    try {
        const response = await axios.get('https://booking-com.p.rapidapi.com/v1/hotels/facilities', {
            params: {hotel_id: id, locale: 'en-gb'},
            headers: {
                'X-RapidAPI-Key': '3dc367959bmshe617c7f249a9921p131658jsnf0b16260c3b4',
                'X-RapidAPI-Host': 'booking-com.p.rapidapi.com'
            }
        })
        return response.data
    } catch (error) {
        console.error(error)
        return null
    }
}