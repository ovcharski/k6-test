import { sleep } from 'k6';
import http from 'k6/http';

export const options = {
    stages: [
        { duration: '5m', target: 100 },   // Baseline
        { duration: '5m', target: 250 },   // Scale up 2.5x
        { duration: '5m', target: 500 },   // Scale up 5x
        { duration: '5m', target: 1000 },  // Maximum scale
        { duration: '5m', target: 0 }      // Ramp down
    ],
    thresholds: {
        http_req_duration: ['p(95)<1500'],  // Response time
        http_req_failed: ['rate<0.1'],      // Failure tolerance
        iterations: ['count>10000']         // Iteration count
    }
}

const scalableEndpoints = [
    '/shop/',
    '/shop/product-category/clothing',
    '/shop/product-category/jenkins-artwork',
    '/shop/product/hoodie-with-zipper',
    '/shop/product/jenkins-superhero'
];

export default function() {
    const baseUrl = 'https://ovcharski.com';
    const randomEndpoint = scalableEndpoints[Math.floor(Math.random() * scalableEndpoints.length)];
    
    const params = {
        headers: {
            'User-Agent': 'K6 Scalability Test',
            'Accept': 'application/json'
        }
    };

    const res = http.get(`${baseUrl}${randomEndpoint}`, params);
    
    if (res.status !== 200) {
        console.error(`Scalability test: Request failed with status ${res.status}`);
    }

    sleep(Math.random() * 2);
}