const Futsal = require('../models/futsalModel');
const mongoose = require('mongoose');

const url = 'mongodb://localhost:27017/newfutsaldb';
beforeAll(async () => {
    await mongoose.connect(url, {
        useNewUrlParser: true,
        useCreateIndex: true
    });
});

afterAll(async () => {
    await mongoose.connection.close();
});


describe('Futsal schema test anything', () =>{
    it('Add futsal testing anything', () => {
        const futsal ={
            'name': 'Kathmandu Futsal',
            'address': 'Kathmandu'
        }
        return Futsal.create(futsal)
        .then((fut_ret) =>{
            expect(fut_ret.name).toEqual('Kathmandu Futsal');
        });
    });

    it('to test the delete futsal is working or not', async() =>{
        const status = await Futsal.deleteOne({_id: Object('607efbbf1da731c52ec80a83')});
        expect(status.ok).toBe(1)
    })


    it('to test update', async () =>{
        return Futsal.findOneAndUpdate({_id: Object('607eefa44ccecaaa418ff20e')},
        {$set: {name:'Koteshwor Futsal'}})
        .then((fut_ret)=>{
            expect(fut_ret.name).toEqual('Koteshwor Futsal')
        })
    });
});