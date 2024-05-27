const supertest = require('supertest');
const User = require('../model/userModel');
const { generateToken } = require('../../auth/auth')

jest.mock('../../db/db',()=>({
    connectDB : jest.fn()
}))

jest.mock('../model/userModel')
jest.mock('../../auth/auth')


const app = require('../../app')

const url = '/api/user';


describe('user',()=>{
    let body;
    let request;

    beforeAll(()=>{
        request = supertest(app)
    })
    beforeEach(()=>{
        body = {
            name : 'test',
            email : 'test@example.com',
            password : 'test@12345'
        }
    })


    //REGISTER USER
    it('should throw error with 400 bcz all fileds are mandatory',async()=>{
        body = {
            name : 'test',
            email : 'test@example.com'
        }
        const response = await request
            .post(`${url}`)
            .send(body)

        
        expect(response.statusCode).toBe(400);
        expect(response.error).toBeDefined();

    })
    it('should throw error with 400 if user already exists ',async()=>{
        User.findOne.mockResolvedValueOnce({ _id: '123', email: 'test@example.com' });

        const response = await request
            .post(`${url}`)
            .send(body)
        expect(response.statusCode).toBe(400);
        expect(response.error).toBeDefined();
    })

    it('should get the resposne with success',async ()=>{
        User.findOne.mockResolvedValueOnce(null);
        User.create.mockResolvedValue({
            _id: '123',
            name: 'test',
            email: 'test@example.com',
            password: 'test@12345'
          });
        generateToken.mockReturnValueOnce('mocktoken')
        const response = await request
            .post(`${url}`)
            .send(body)
        expect(response.statusCode).toBe(201);
        expect(response.body.token).toBe('mocktoken')
        
    })
   

    //LOGIN
    it('should give unauthorized',async()=>{
        User.findOne.mockResolvedValueOnce(null);
        body = {
            email : 'test@example.com',
            password: 'test@12345'
        }
        const response = await request
        .post(`${url}/login`)
        .send(body)
        expect(response.statusCode).toBe(401);
        expect(response.body.message).toBe('Unauthorized');
    })

    it('should login',async()=>{
        User.findOne.mockResolvedValueOnce({ _id: '123', email: 'test@example.com', matchPassword: jest.fn().mockResolvedValue(true) });
        body = {
            email : 'test@example.com',
            password: 'test@12345'
        }
        const response = await request
        .post(`${url}/login`)
        .send(body)
        expect(response.statusCode).toBe(200);
        // expect(response.body.message).toBe('Unauthorized');
    })

})