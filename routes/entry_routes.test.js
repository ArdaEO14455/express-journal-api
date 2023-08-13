import app from '../app.js'
import request from 'supertest'

const validNames = ['Food', 'Gaming', 'Coding', 'Other']

// POST TO ENTRIES TESTING
describe('POST /entries', () => { //testing the creation of a new entry document
        let res
        beforeAll( async () => {
            res = await request(app).post('/entries').send({ //simulate a post request, and send it to the server with the following body:
                category: 'Food',
                content: 'Ice Cream Rules!'
        })
    })
        
        test('Returns a JSON body with an _id', () => {
            expect(res.statusCode).toBe(201)
            expect(res.header['content-type']).toMatch('json')
            expect(res.body._id).toBeDefined()
        })
        
        test('Category has _id and correct name', () => {
            expect(res.body.category).toBeDefined()
            expect(res.body.category._id).toBeDefined()
            expect(res.body.category.name).toBeDefined()
            expect(res.body.category.name).toBe('Food')
          })
        test('Content is defined and is correct', () => {
            expect(res.body.content).toBeDefined()
            expect(res.body.content).toBe('Ice Cream Rules!')
        })
    })
        



    // CATEGORIES TESTING
describe('GET /categories', () => { 
        let res

        beforeAll(async () => {
            res = await request(app).get('/categories') // if I do a get request to the categories route ('/'):
        })
        test('Returns JSON', () => {
            expect(res.status).toBe(200)   // expect a 200 response
            expect(res.header['content-type']).toMatch('json') //expect a json response, specified in the content-type variable found in the header
        })   
        

        test('Returns an array of 4 elements', () => {
            expect(res.body).toBeInstanceOf(Array)
            expect(res.body).toHaveLength(4) //expect specific content
        })
        test('Each category has a "name" with and "_id"', () => {
            res.body.forEach(el => {
                expect(el._id).toBeDefined() //expect the first item in the array to have an name
                expect(el.name).toBeDefined() // expect the name of the first item in the array to be 'Food'
                expect(validNames).toContain(el.name)
            })
            
        })
    })

//Have a test URL defined as well