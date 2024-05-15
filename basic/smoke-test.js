import http from 'k6/http';
import {sleep} from 'k6';

export const options = {
    vus: 1,
    duration: '30s'

};

export default function () {
    http.get('https://test-api.k6.io/public/crocodiles/1');
    sleep(1)
    http.get('https://test-api.k6.io/public/crocodiless/');
    sleep(2);
}