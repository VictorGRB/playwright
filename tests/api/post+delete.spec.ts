import { test, expect } from '@playwright/test';

test('api login success', async ({ request }) => {

    const response = await request.post('https://stage.helpdesk.hypertalk.net/api/auth/operator', {
        form: {
            email: 'victor.garbo@hpm.ro',
            password: 'Victor123!'

        }
    });
    expect(response.status()).toBe(200);
    await expect(response).toBeOK();
    //console.log(await response.statusText());
    const content = await response.json();
    console.log(content);
    let actualToken = content.jwt;
    
    console.log(actualToken);


    const { token } = content;
    const getResponse = await request.get('https://stage.helpdesk.hypertalk.net/api/me', {

        headers:{
            'content-type': 'application/json',
            'authorization':`Bearer ${actualToken}`,
        }

    });
    expect(getResponse.status()).toBe(200);

});
