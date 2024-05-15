import http from "k6/http";
import { sleep } from "k6";
import { randomInBetween } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';

export const options = {
    vus: 5,
    duration: '20s'
};

export default function () {
    console.log(__ENV.BASE_URL);
    http.get(`${__ENV.BASE_URL}/public/crocodiles/`);

    console.log("VU stage");
    sleep(randomInBetween(1, 5));
}