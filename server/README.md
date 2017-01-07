# ExpressJS API server
API server built with ExpressJS including Socket.IO server connected to MongoDB instance and tested with Mocha.

***

## 1. Be sure you have your mongoDB service running, if not start it:
`npm run db`

***

## 2. Start up the server with one of the following commands:
* for *development* enviroment:
	+ `npm start`
* for *production* enviroment with pm2:
	+ `npm run startprod`
* for *development* enviroment with pm2:
	+ `npm run startdev`
* for *test* enviroment:
	+ `npm run starttest`


***

## 3. To run tests with mocha:
* At first run server in `test` mode with following command:
	+ `npm run starttest`
* Then run test suite:
	+ `npm test`


***

## 4. Debugging app in chrome
1. After app startup with `npm start` cmd generate link in form `chrome-devtools://devtools/remote/serve_file/...`
2. Copy generated link into new chrome tab and start debugging app the same way as you usually debug front-end javascript


***

## 5. Test the API in Postman
You can test out the API edpoints directly in Postman. Either import collection (`postman.postman_collection`) and enviroment (`postman-env.postman_environment`) files into your Postman desktop app or user following link:
[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/0b495ef1d1aff3f730e7#?env%5BExpressSocketIOAngularJSboilerplate%5D=W3sia2V5IjoicG9ydCIsInZhbHVlIjoiNTAwMCIsInR5cGUiOiJ0ZXh0IiwibmFtZSI6InBvcnQiLCJlbmFibGVkIjp0cnVlfSx7ImtleSI6InVybCIsInZhbHVlIjoibG9jYWxob3N0IiwidHlwZSI6InRleHQiLCJuYW1lIjoidXJsIiwiZW5hYmxlZCI6dHJ1ZX0seyJrZXkiOiJ0b2tlbiIsInZhbHVlIjoiZXlKaGJHY2lPaUpJVXpJMU5pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SmZhV1FpT2lJMU9EWTBOR1JqWmpFM1l6TmlaVEl6TldObE5UUTJabVlpTENKMWMyVnlibUZ0WlNJNkltcHZhRzVrYjJVaUxDSmpjbVZoZEdWa1FYUWlPaUl5TURFMkxURXlMVEk0VkRJek9qUXlPakEzTGpnM05sb2lMQ0p5YjJ4bElqb2lZV1J0YVc0aUxDSmxiV0ZwYkNJNkltRmtiV2x1UUdGa2JXbHVMbWx2SWl3aWMzVnlibUZ0WlNJNkltRmtiV2x1SWl3aVptbHljM1JPWVcxbElqb2lZV1J0YVc0aUxDSnBZWFFpT2pFME9ETTNPVEU0TURFc0ltVjRjQ0k2TVRRNE16ZzNPREl3TVgwLnJkZkNwN1RoZWRiMGZ1enFIWWdqaFM1d0hwbUNUYUVHQzZ3cUhCS19MMkEiLCJ0eXBlIjoidGV4dCIsImVuYWJsZWQiOnRydWV9XQ==)

(c) 2017 Jozef Butko


