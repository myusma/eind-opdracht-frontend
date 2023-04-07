import axios from "axios";


// Get hotel detail by ID
export async function getHotelDetails(id) {
    try {
        const response = await axios.get('https://booking-com.p.rapidapi.com/v1/hotels/data', {
            params: {locale: 'en-gb', hotel_id: id},
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