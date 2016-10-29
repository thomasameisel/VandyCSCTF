#!/bin/bash
cd login_in_source
node index.js &

cd ../login_in_robots
node index.js &

cd ../hidden_input
node index.js &

cd ../sql_injection
node index.js &

cd ../post_to_url
node index.js &

cd ../user_agent
node index.js &

cd ../xss
node index.js &
