import http from 'k6/http';
import {sleep} from 'k6';


export const options = {
    // A load test is not used to break the system. 
    // The test validates if the system’s performance and resource consumption stay stable during the period of full load,
    // as some systems may display erratic behavior in this period.
    // To run a load test, we need to define stages
    // We'll remove the vus as well
    // The idea is:
    // Ramp-up stage: we will ramp up to 100 users in the first 5m
    // Typical stage: we keeping 100 users for 30m to measure the system capability
    // Ramp-down stage: we will ramping down to 0 users for the last 5 minutes
    stages: [
        {
            duration: '5m',
            target: 100
        },
        {
            duration: '30m',
            target: 100
        },
        {
            duration: '5m',
            target: 0
        },
    ],
    // vus: 100,
    //duration: '30m'

};

export default function () {
    http.get('https://test-api.k6.io/public/crocodiles/1');
    sleep(1)
    http.get('https://test-api.k6.io/public/crocodiless/');
    sleep(2);
}