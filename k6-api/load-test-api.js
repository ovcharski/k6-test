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
};

export default function() {
  const apiUrl = 'https://ovcharski.com/shop/wp-json/wp/v2/posts';

  const params = {
    headers: {
      'Accept': 'application/json',
      'User-Agent': 'K6 Load Test'
    }
  };

  // Send GET request to WordPress REST API
  const res = http.get(apiUrl, params);

  // Check response status
  if (res.status !== 200) {
    console.error(`API request failed with status ${res.status}`);
  }

  // Optional: Parse and log response body for debugging
  // console.log(JSON.stringify(res.json()));

  // Random sleep between 1-3 seconds to simulate real user behavior
  sleep(1 + Math.random() * 2);
}
