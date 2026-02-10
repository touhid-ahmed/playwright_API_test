import {test, expect} from '@playwright/test'




test('First PUT Request', async({request})=>{

    const authdata = {
        "username": "admin",
        "password": "password123"
    }


    const response = await request.post('https://restful-booker.herokuapp.com/auth', {
        headers:{'Content-Type': 'application/json'},
        data:authdata

    })

    const responseData = await response.json()
    const token = responseData.token
    console.log(token)




    const bookData = {
        "firstname": "Sweet",
        "lastname": "Robinson",
        "totalprice": 111,
        "depositpaid": true,
        "bookingdates": {
            "checkin": "2020-01-01",
            "checkout": "2024-01-01"
        },
        "additionalneeds": "Dinner"
    }



    const bookingResponse = await request.post('https://restful-booker.herokuapp.com/booking', {

        headers: { 'Content-Type': 'application/json' },
        data: bookData
    })

    const bookingText = await bookingResponse.json()

    const bookingID = bookingText.bookingid

    console.log(bookingText.bookingid)
    console.log(bookingText)



    const updateData = {
        "firstname": "Spicy",
        "lastname": "Talia",
        "totalprice": 999,
        "depositpaid": true,
        "bookingdates": {
            "checkin": "2020-01-01",
            "checkout": "2024-01-01"
        },
        "additionalneeds": "Dinner"
    }


    const updateResponse = await request.put('https://restful-booker.herokuapp.com/booking/'+bookingID, {

        headers: {'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Cookie': 'token=' + token
                },
        data: updateData
    })

    const updatedResponseObject = await updateResponse.json()

    console.log(updatedResponseObject)


    const deleteResponse = await request.delete('https://restful-booker.herokuapp.com/booking/'+bookingID, {

        headers: {'Content-Type': 'application/json',
                'Cookie': 'token=' + token
                }
    })

    console.log(deleteResponse.status())
    console.log(deleteResponse.statusText())


    const getResponse = await request.get('https://restful-booker.herokuapp.com/booking/'+bookingID)
    console.log(getResponse.status())
    console.log(getResponse.statusText())


})