import { sleep } from 'k6';
import http from 'k6/http';

export const options = {
    stages: [
        { duration: '2m', target: 50 },   // Gradual ramp-up
        { duration: '5m', target: 100 },  // Increase load
        { duration: '10m', target: 200 }, // Peak load
        { duration: '5m', target: 100 },  // Gradual decrease
        { duration: '2m', target: 0 }     // Ramp down
    ],
    thresholds: {
        http_req_duration: ['p(95)<500'], // 95% of requests should complete under 500ms
        http_req_failed: ['rate<0.01']    // Less than 1% of requests should fail
    },
    summaryTimeUnit: 'ms',
    summaryTrendStats: ['avg', 'min', 'med', 'max', 'p(95)', 'p(99)']
}

function getRandomUser() {
    const users = [
        '/shop/',
        '/shop/product-category/clothing',
        '/shop/product-category/jenkins-artwork',
        '/shop/product/hoodie-with-zipper',
        '/shop/product/jenkins-superhero'
    ];
    return users[Math.floor(Math.random() * users.length)];
}

export default function() {
    const baseUrl = 'https://ovcharski.com';
    const randomPath = getRandomUser();
    
    const params = {
        headers: {
            'User-Agent': 'K6 Load Test',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8'
        }
    };

    const res = http.get(`${baseUrl}${randomPath}`, params);
    
    // Check response status
    if (res.status !== 200) {
        console.error(`Request failed with status ${res.status}`);
    }

    // Random sleep between 1-3 seconds to simulate real user behavior
    sleep(1 + Math.random() * 2);
}