import http from "k6/http";
import { sleep } from "k6";
import { randomString } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';

export const options = {
    vus: 5,
    duration: '3s',
    ext: {
        cloud: {
            projectID: 3694742
        }
    }
};

export default function () {
    const credentials = {
        username: 'test_' + randomString(8),
        password: 'secret_' + randomString(8),
    };

    console.log(credentials);
    
    http.get(`https://test-api.k6.io/`);

}