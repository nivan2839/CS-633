var request = require('supertest');
const { expect } = require('chai');
const createApp = require('./createServer')

describe('Our application', function () {
    var app;
    before(function(done) {
        app = createApp();
        app.listen(3002, () => {
            console.log(`Server listening on 3002`);
            done();
        });
    });

    it('should send back a JSON object of the menu items', function(done) {
        request(app)
            .get('/menu')
            .set('Content-Type', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, function(err, res) {
                if (err) return done(err);
                done();
            });
    });
    it('should send back a JSON object with the time to pick up the food', function(done) {
        request(app)
            .post('/order')
            .set('Content-Type', 'application/json')
            .send({items: [{food_name: 'Pancakes', count: '1'}]})
            .expect('Content-Type', /json/)
            .expect(200, function (err, res) {
                if (err) return done(err);
                time = res.body.time;
                expect(time).to.equal('30 minutes');
                done();
            });
    });
    it('should send back a JSON object of all of the orders place', function(done) {
        request(app)
            .get('/orderedItems')
            .set('Content-Type', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, function(err, res) {
                if (err) return done(err);
                done();
            });
    })
});
