import { sleep } from 'k6';
import http from 'k6/http';

export let options = {
  stages: [
    { target: 10, duration: '10s' },
    { target: 0, duration: '10s' },
  ],
};

export default function() {
  let url = 'https://ovcharski.com/shop/wp-json/wp/v2/posts';
  let headers = {
    'accept': 'application/json',
  };

  let res = http.get(url, { headers: headers });

  // Check if the request was successful
  if (res.status !== 200) {
    console.log(`Error: ${res.status} ${res.statusText}`);
  }


  // Check if the response body contains a certain string
  if (!res.body.includes('Welcome to the shop')) {
    console.log('Error: Response body does not contain expected string');
  }

  // Pause the execution for a short duration to simulate user think time
  sleep(1);
}
