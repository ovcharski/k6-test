import { sleep } from 'k6';
import http from 'k6/http';

export const options = {
    stages: [
        { duration: '2m', target: 100 },   // Ramp up
        { duration: '5m', target: 500 },   // Sudden high load
        { duration: '3m', target: 1000 },  // Extreme stress
        { duration: '2m', target: 0 }      // Ramp down
    ],
    thresholds: {
        http_req_duration: ['p(95)<1000'],  // 95% requests under 1 second
        http_req_failed: ['rate<0.05']      // Max 5% failure rate
    }
}

export default function() {
    const apiUrl = 'https://ovcharski.com/shop/wp-json/wp/v2/product_cat';
    
    const params = {
        headers: {
            'User-Agent': 'K6 Stress Test',
            'Accept': 'application/json'
        },
        // Adding post parameter
        searchParams: {
            post: '120'
        }
    };

    const res = http.get(apiUrl, params);
   
    if (res.status !== 200) {
        console.error(`Stress test: API request failed with status ${res.status}`);
    }

    // Random sleep to simulate variable user behavior
    sleep(Math.random() * 2);
}