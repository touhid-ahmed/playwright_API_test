import {test, expect} from '@playwright/test'


test('API POST request', async({request}) => {

    const authdata = {
            "username" : "admin",
            "password" : "password123"
        }

    const response = await request.post('https://restful-booker.herokuapp.com/auth', {
        headers:{'Content-Type': 'application/json'},
        data:authdata

    })
    expect(response.status()).toBe(200)
    console.log(response.status())
    const tokenData = await response.json()
    expect(tokenData).not.toBeNull()
    console.log(await response.json())
    

})


test('API POST request test to create Booking', async({request}) =>{

    const bookData = {
        "firstname": "Mark",
        "lastname": "Robinson",
        "totalprice": 111,
        "depositpaid": true,
        "bookingdates": {
            "checkin": "2020-01-01",
            "checkout": "2024-01-01"
        },
        "additionalneeds": "Dinner"
    }

    

    const response = await request.post('https://restful-booker.herokuapp.com/booking', {

        headers : {'Content-Type': 'application/json'},
        data: bookData
    })

    const text = await response.json()

    console.log(text.bookingid)
    expect(text.bookingid).not.toBeNull()
    expect(text.booking.firstname).toBe('Mark')


})




test('API GET request', async({request}) => {

    const response = await request.get('https://jsonplaceholder.typicode.com/posts')
    expect(response.status()).toBe(200)

    const text = await response.text()
    expect(text).toContain('sunt aut facere')

})
