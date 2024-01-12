// @ts-check
import { test, expect } from '@playwright/test';

test('get api examples', async ({ request }) => {

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
    console.log(content);
    let actualToken = content.jwt;
    console.log(actualToken);
    //{/GOLDEN CODE}

    const { token } = content;
    const getMeResponse = await request.get('https://stage.helpdesk.hypertalk.net/api/me', {

        headers:{
            'content-type': 'application/json',
            'authorization':`Bearer ${actualToken}`,
        }

    });
    expect(getMeResponse.status()).toBe(200);

    const getUsersResponse = await request.get('https://stage.helpdesk.hypertalk.net/api/users', {

        headers:{
            'content-type': 'application/json',
            'authorization':`Bearer ${actualToken}`,
        }

    });
    expect(getUsersResponse.status()).toBe(200);

    const getOperatorsResponse = await request.get('https://stage.helpdesk.hypertalk.net/api/operators', {

        headers:{
            'content-type': 'application/json',
            'authorization':`Bearer ${actualToken}`,
        }

    });
    expect(getOperatorsResponse.status()).toBe(200);

    const getOperatorResponse = await request.get('https://stage.helpdesk.hypertalk.net/api/operators/6281ff8b559e4e9cf08bcc0c', {

        headers:{
            'content-type': 'application/json',
            'authorization':`Bearer ${actualToken}`,
        }

    });
    expect(getOperatorResponse.status()).toBe(200);

    const getAppointmentsResponse = await request.get('https://stage.helpdesk.hypertalk.net/api/appointments', {

        headers:{
            'content-type': 'application/json',
            'authorization':`Bearer ${actualToken}`,
        }

    });
    expect(getAppointmentsResponse.status()).toBe(200);

    const getTransactionsResponse = await request.get('https://stage.helpdesk.hypertalk.net/api/transactions', {

        headers:{
            'content-type': 'application/json',
            'authorization':`Bearer ${actualToken}`,
        }

    });
    expect(getTransactionsResponse.status()).toBe(200);

    const getReportsResponse = await request.get('https://stage.helpdesk.hypertalk.net/api/reports', {

        headers:{
            'content-type': 'application/json',
            'authorization':`Bearer ${actualToken}`,
        }

    });
    expect(getReportsResponse.status()).toBe(200);
    
});
