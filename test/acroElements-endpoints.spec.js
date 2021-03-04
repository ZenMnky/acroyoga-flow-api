const { expect } = require('chai');
const knex = require('knex');
const supertest = require('supertest');
const app = require('../src/app');
const acroElements = require('./acroElements.fixtures');
// const { makeArticlesArray, makeMaliciousArticle } = require('./api/acroelements.fixtures');

describe('AcroElements endpoints', () => {
    let db;

      before('make knex instance', () => {
        db = knex({
        client: 'pg',
        connection: process.env.TEST_DATABASE_URL
        });
        app.set('db', db);
    });

    before('clean the table', () => db('acroyoga_elements').truncate());

    after('disconnect from db', () => db.destroy());

    afterEach('cleanup', () => db('acroyoga_elements').truncate());

    describe('GET /api/acroelements', () => {
            context(`Given no elements`, () => {
              it(`responds with 200 and an empty list`, () => {
                return supertest(app).get('/api/acroelements').expect(200, []);
              });
            });
        
            context('Given there are elements in the database', () => {
              const testElements = acroElements.acroElementsForInsert();
              const returnElements = acroElements.acroElementsForReturn();
        
              beforeEach('insert elements', () => {
                return db.into('acroyoga_elements').insert(testElements);
              });
        
              it('GET /api/acroelements responds with 200 and all acro elements', () => {
                return supertest(app).get('/api/acroelements').expect(200, returnElements);
              });
            });
        
          });
        


})
