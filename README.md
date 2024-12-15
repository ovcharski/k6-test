# K6

[![N|Solid](https://raw.githubusercontent.com/grafana/k6/master/assets/logo.svg)](https://k6.io/)

[K6](https://k6.io/) is a a modern load testing tool, using Go and JavaScript

# K6 Performance Testing

In this demo repo are located a few performance tests. In the **k6** folder are located load, stress, spike and soak tests of a WordPress front-end. 
In the **api** folder are located load, stress and spike tests of APIs. The examples are for **get** requests.
A Swagger documentation of the Wordpress RESTful APIs is located  [here](https://ovcharski.com/shop/rest-api/docs/)

In the future more api tests will be added. K6 documentation has a lot of usage examples [docs/k6/latest/examples/](https://grafana.com/docs/k6/latest/examples/)

Playwright end-2-end testing framework of the same WordPress website is available at [ovcharski/playwright-e2e](https://github.com/ovcharski/playwright-e2e/),

# How to Install K6

To install K6, follow the instructions on the [K6 installation page](https://k6.io/docs/getting-started/installation/).

# How to Run the Tests

To run the tests, navigate to the project directory and use the following commands:

```sh
k6 run k6/load-test.js
k6 run k6/stress-test.js
k6 run k6/spike-test.js
k6 run k6/soak-test.js
```
```sh
k6 run k6-api/load-test-api.js
k6 run k6-api/stress-test-api.js
k6 run k6-api/spike-test-api.js
```

# Performance Tesing

Performance testing is a type of software testing that evaluates system behavior under various load conditions.

Performance testing helps validate a system's speed, reliability, and scalability under different operational conditions.

## Types of Performance Testing

- Load Testing - Checks system behavior under expected normal load
- Stress Testing - Pushes system beyond normal operational capacity
- Spike Testing - Suddenly increases load to extreme levels
- Soak Testing - Runs system under sustained load for extended periods
- Volume Testing - Tests system with large amounts of data
- Scalability Testing - Measures system's ability to scale up/down

## Load Testing
- Gradual load increase (50 → 100 → 200 users)
- 20-minute stable period at 200 users
- Gentle ramp-down
- Random site paths
- Basic performance thresholds (95% under 500ms)

## Stress Testing
- More aggressive load increase (100 → 500 → 1000 users)
- Shorter stages
- Goal of finding system breaking points
- Same random path selection
- Stricter thresholds (95% under 1000ms)

## Spike Testing
- Sudden, extreme jumps (50 → 500 → 1500 users)
- Short, rapid transitions
- Critical/sensitive endpoints
- Broader failure tolerance: 2000ms max response, <10% failure rate

## Soak Testing

- Long-duration test: 6 hours
- Steady 100-user load
- Checks system stability over time
- Detects memory leaks, performance degradation

## Scalability Testing

- Incremental load stages
- Wide performance threshold
- Endpoints testing system scaling
- Verifies performance under growth

## API Testing

When using K6 to test a website, it's generally recommended to focus on individual API calls rather than the whole web pages. 

- API calls are the backbone of your application: By testing individual API calls, you can ensure that the core functionality of your application is working correctly.
- API calls are more stable and less prone to changes
- API calls are easier to test: focus on specific scenarios, inputs, and outputs
- API calls can be tested independently
- API calls can be tested under load

That being said, there are some scenarios where testing the whole web pages might be more relevant: End-to-end testing and/or Complex workflows.
