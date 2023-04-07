import axios from "axios";


// Get hotel detail by ID
export async function getHotelDetails(id) {
    try {
        const response = await axios.get('https://booking-com.p.rapidapi.com/v1/hotels/data', {
            params: {locale: 'en-gb', hotel_id: id},
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