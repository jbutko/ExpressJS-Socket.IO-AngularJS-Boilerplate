# ExpressJS API server
API server running on ExpressJS connected to MongoDB instance and tested with Mocha.

There are 3 enviroments:
* development
* production
* test

***

## 1. Start up mongoDB instance run:
`npm run db`

***

## 2. To start up the server run following commands:
* for *development* enviroment:
	+ `npm start`
* for *production* enviroment with pm2:
	+ `npm run startprod`
* for *development* enviroment with pm2:
	+ `npm run startdev`
* for *test* enviroment:
	+ `npm run starttest`
***

***

## 4. To run tests with mocha:
* At first run server in `test` mode with following command:
	+ `npm run starttest`
* Then run test suite:
	+ `npm test`


***

## 5. Debugging with node-inspector
1. Install node-inspector
	`npm i node-inspector -g`
2. Run node-inspector:
	`node-inspector`
3. Copy the link from node-inspector cmd and open it in browser:
	`http://127.0.0.1:8080/?ws=127.0.0.1:8080&port=5858`

(c) 2016 Jozef Butko


