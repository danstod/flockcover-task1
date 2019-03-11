# flockcover-task1

https://github.com/flockcover/tech-screen-instructions/blob/master/Task1.md

#Assumptions

1. No authentication is required
2. The data is fairly static and gets updated approx. once a day (and hence this will dictate the cache expiry value)

#Technology choices

I chose to use 'express' for it's performance and maturity and flexibility as a framework as well as being something that I've used in previous projects.
For the caching choices, although memcache will likely perform better for small/simple data sets, 
Redis was chosen as a longer term solution due to it's flexibility and it's support of a variety of data structures.    

#Technology compromises

I used javascript to build a solution quickly but if many features were requested in future I would consider rewriting 
in Typescript or another statically typed solution like FlowJS.

Also, the retry logic is simplistic and there may be better solutions for this so this is something that should be reviewed.

#How to run

- Download Redis here: `http://download.redis.io/redis-stable.tar.gz`
- Start redis by running: `redis-server`
    (To clear the redis cache run: `redis-cli FLUSHALL`)
- git clone the repo and run `npm install`
- Start the server with: `npm start`
- And run the tests using: `npm test`

#Future features

- Pre-population of the cache on start up / periodically to improve performance
- Stats on when the API is used most frequently to determine a cache pre-population frequency model
- Stats on how often the data is updated to determine the optimum cache expiry value
- Comprehensive stress testing 
