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

const criticalEndpoints = [
    '/shop/',
    '/shop/product-category/clothing',
    '/shop/product-category/jenkins-artwork',
    '/shop/product/hoodie-with-zipper',
    '/shop/product/jenkins-superhero'
];

export default function() {
    const baseUrl = 'https://ovcharski.com';
    const randomEndpoint = criticalEndpoints[Math.floor(Math.random() * criticalEndpoints.length)];
    
    const params = {
        headers: {
            'User-Agent': 'K6 Spike Test',
            'Accept': 'application/json'
        }
    };

    const res = http.get(`${baseUrl}${randomEndpoint}`, params);
    
    if (res.status !== 200) {
        console.error(`Spike test: Request failed with status ${res.status}`);
    }

    sleep(Math.random());
}