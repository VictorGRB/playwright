// @ts-check
import { test, expect } from '@playwright/test';

test('appointments examples', async ({ request }) => {

    const response = await request.post('https://stage.helpdesk.hypertalk.net/api/auth/operator', {
        form: {
            email: 'victor.garbo@hpm.ro',
            password: 'Victor123!'

        }
    });
    expect(response.status()).toBe(200);
    await expect(response).toBeOK();
    //{GOLDEN CODE} - will store certain values from a response into a useable variable
    const content = await response.json();
    //console.log(content);
    let actualToken = content.jwt;
    //console.log(actualToken);
    //{/GOLDEN CODE}

    const { token } = content;
    const postAppointment = await request.post('https://stage.helpdesk.hypertalk.net/api/appointments', {

        headers: {
            'content-type': 'application/json',
            'authorization': `Bearer ${actualToken}`,
        },
        data: {

            "startTime": "2036-12-08T11:00:00.567Z",
            "endTime": "2036-12-08T11:30:00.567Z",
            "idOperator": "6281ff8b559e4e9cf08bcc0c",
            "idUser": "6282111e61944099d6488e24",
            "status": "available",
            "type": "online",
            "notes": "string"

        }

    });
    expect(postAppointment.status()).toBe(200);
    let header = await postAppointment.headers()["location"];
    console.log(header);

    const putAppointment = await request.put('https://stage.helpdesk.hypertalk.net/api/appointments/' + header, {

        headers: {
            'content-type': 'application/json',
            'authorization': `Bearer ${actualToken}`,
        },
        data: {

            "startTime": "2036-12-08T12:00:00.567Z",
            "endTime": "2036-12-08T12:30:00.567Z",
            "idOperator": "6281ff8b559e4e9cf08bcc0c",
            "idUser": "6282111e61944099d6488e24",
            "status": "available",
            "type": "online",
            "notes": "This is a note for testing purposes"

        }
    });
    expect(putAppointment.status()).toBe(200);

    const deleteAppointment = await request.delete('https://stage.helpdesk.hypertalk.net/api/appointments/' + header, {
        headers: {
            'content-type': 'application/json',
            'authorization': `Bearer ${actualToken}`,
        }
    });
    expect(deleteAppointment.status()).toBe(200);

    //NEGATIVE
    const deleteFalseAppointment = await request.delete('https://stage.helpdesk.hypertalk.net/api/appointments/' + header, {
        headers: {
            'content-type': 'application/json',
            'authorization': `Bearer ${actualToken}`,
        }
    });
    expect(deleteFalseAppointment.status()).toBe(404);

});

test('specializations examples', async ({ request }) => {

    const response = await request.post('https://stage.helpdesk.hypertalk.net/api/auth/operator', {
        form: {
            email: 'victor.garbo@hpm.ro',
            password: 'Victor123!'

        }
    });
    expect(response.status()).toBe(200);
    await expect(response).toBeOK();
    //GOLDEN CODE
    const content = await response.json();
    //console.log(content);
    let actualToken = content.jwt;
    //console.log(actualToken);
    //GOLDEN CODE

    //CREATE SPEC
    const postSpecialization = await request.post('https://stage.helpdesk.hypertalk.net/api/specializations', {

        headers: {
            'content-type': 'application/json',
            'authorization': `Bearer ${actualToken}`,
        },
        data: {
            "name": "TestSpecializationFromVictor",
            "disabled": false
        }
    });
    expect(postSpecialization.status()).toBe(200);
    let header = await postSpecialization.headers()["location"];
    console.log(header);

    // //EDIT SPEC
    // const putSpecialization = await request.put('https://stage.helpdesk.hypertalk.net/api/specializations/'+header, {

    //     headers: {
    //         'content-type': 'application/json',
    //         'authorization': `Bearer ${actualToken}`,
    //     },
    //     data: {
    //         "name": "Test Victorr"
    //     }
    // });
    //expect(putSpecialization.status()).toBe(200);

    //DELETE SPEC
    const deleteSpecialization = await request.delete('https://stage.helpdesk.hypertalk.net/api/specializations/'+header, {
        headers: {
            'content-type': 'application/json',
            'authorization': `Bearer ${actualToken}`,
        }
    });
    expect(deleteSpecialization.status()).toBe(200);


    // //NEGATIVE DELETE SPEC
    // const deleteFalseSpecialization = await request.delete('https://stage.helpdesk.hypertalk.net/api/specializations/'+header, {
    //     headers: {
    //         'content-type': 'application/json',
    //         'authorization': `Bearer ${actualToken}`,
    //     }
    // });
    // expect(deleteFalseSpecialization.status()).toBe(404);

});