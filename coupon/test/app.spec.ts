require('dotenv').config();
import chai from 'chai';
import chaiHttp from 'chai-http';
//App
import app from '../app/app';
//Connect database
import { sequelize } from '../app/database/database';

chai.should();
chai.use(chaiHttp);

const user = {
    email: 'karailfokus@gmail.com',
    name: 'Ilkara',
    password: 'Ilkara'
}
let token: string;

describe('Auth', () => {
    describe('/POST register', () => {
        it('it should POST user register', (done) => {
            chai.request(app)
                .post('/auth/register')
                .send(user)
                .end((err, res) => {
                    if (err) done(err)
                    res.should.have.status(200);
                    res.body.should.be.a('string');
                    token = res.body
                    done();
                });
        });
    });
    // describe('/POST login', () => {
    //     it('it should POST user login', (done) => {
    //         chai.request(app)
    //             .post('/auth/login')
    //             .send({
    //                 email: user.email,
    //                 password: user.password
    //             })
    //             .end((err, res) => {
    //                 if (err) done(err)
    //                 res.should.have.status(200);
    //                 res.body.should.be.a('string');
    //                 token = res.body
    //                 done();
    //             });
    //     });
    // });
});

// describe('Coupon', () => {
//     describe('/GET coupon', () => {
//         it('it should GET all the coupons', (done) => {
//             chai.request(app)
//                 .get('/coupon/')
//                 .set({ Authorization: `Bearer ${token}` })
//                 .end((err, res) => {
//                     if (err) done(err)
//                     res.should.have.status(200);
//                     res.body.should.be.a('array');
//                     res.body.length.should.be.eql(0);
//                     done();
//                 });
//         });
//     });
// });