import { sleep } from 'k6';
import http from 'k6/http';

export const options = {
    stages: [
        { duration: '2m', target: 50 },    // Normal load
        { duration: '1m', target: 500 },   // Sudden spike
        { duration: '30s', target: 1500 }, // Extreme spike
        { duration: '1m', target: 50 },    // Quick recovery
        { duration: '2m', target: 0 }      // Ramp down
    ],
    thresholds: {
        http_req_duration: ['p(95)<2000'],  // 95% requests under 2 seconds
        http_req_failed: ['rate<0.1']       // Max 10% failure rate
    }
}

export default function() {
    const apiUrl = 'https://ovcharski.com/shop/wp-json/wp/v2/users';
   
    const params = {
        headers: {
            'User-Agent': 'K6 Spike Test',
            'Accept': 'application/json'
        },
        // Adding query parameters
        searchParams: {
            order: 'asc',
            orderby: 'name',
            who: 'authors'
        }
    };

    const res = http.get(apiUrl, params);
   
    if (res.status !== 200) {
        console.error(`Spike test: API request failed with status ${res.status}`);
    }

    // Random sleep to simulate variable user behavior
    sleep(Math.random() * 2);
}