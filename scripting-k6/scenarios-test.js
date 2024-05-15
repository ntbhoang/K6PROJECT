import http from 'k6/http';
import { check, sleep } from 'k6';
import exec from 'k6/execution';
import { Counter, Trend } from 'k6/metrics';



export const options = {
    vus: 5,
    duration: '10s',
    thresholds: {
        http_req_duration: ['p(95)<1080', 'max<=2000'], // We don't want the lowest latency is above 2s
        http_req_failed: ['rate<0.1'],
        http_reqs: ['count>30', 'rate>3'], // Send at least 20 reqs , above 6.8 reqs per s
        vus: ['value>=1'], // I want 8 users all the time
        checks: ['rate>=0.98'],
        myCounter: ['count>=10'],
        response_time_news_page: ['p(90)<974']
    }
};

let myCounter = new Counter('myCounter');
let newsPageResponseTrend = new Trend('response_time_news_page');

export default function () {
    let res = http.get('https://test.k6.io' + (exec.scenario.iterationInTest === 1 ? 'foo' : ''));
    myCounter.add(1);
    check(res, {
        "response code was 200": (res) => res.status === 200,
        "page is displayed correctly": (res) => res.body.includes('Collection of simple web-pages suitable for load testing.'),
    });
    sleep(1);
    res = http.get('https://test.k6.io/news.php');
    newsPageResponseTrend.add(res.timings.duration);
    sleep(1);
}