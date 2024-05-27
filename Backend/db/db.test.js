const mongoose = require('mongoose');
const connectDB = require("./db")

jest.mock('mongoose',()=>({
    connect : jest.fn().mockResolvedValueOnce({
        connection : {
            host : 'testhost'
        }
    }).mockRejectedValueOnce(new Error('mock error'))
}))
describe('db-handler',()=>{

    beforeEach(() => {
        jest.clearAllMocks();
    });
    
    test('should initialize database',async ()=>{
        const conn = await connectDB();
        expect(mongoose.connect).toHaveBeenCalledWith(process.env.MONGO_URI);    
    })
    test('should not initialize database',async ()=>{
        const exitSpy = jest.spyOn(process, 'exit').mockImplementation(() => {});
        const conn = await connectDB();
        expect(mongoose.connect).toHaveBeenCalledWith(process.env.MONGO_URI);   
        expect(exitSpy).toHaveBeenCalled(); 
        exitSpy.mockRestore();
    })
})