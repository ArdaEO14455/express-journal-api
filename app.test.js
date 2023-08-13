import app from './app.js'
import request from 'supertest'



describe("App Test", () => {
    test('GET /', async () => { 
        const res = await request(app).get('/') // if I do a get request to the home route ('/'):
        expect(res.status).toBe(200)   // expect a 200 response
        expect(res.header['content-type']).toMatch('application/json') //expect a json response, specified in the content-type variable found in the header
        expect(res.body.info).toBeDefined() // expect for there to be data in the body in the 'info' parameter (defined in app.js)
        expect(res.body.info).toBe('Journal API!') //expect specific content
    })

})
