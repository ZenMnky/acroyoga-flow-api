const { expect } = require('chai');
const knex = require('knex');
const supertest = require('supertest');
const app = require('../src/app');
const { acroElementsForInsert, acroFlowsForReturn } = require('./acroFlows.fixtures');



describe('AcroFlows endpoints', () => {
    let db;

    before('make knex instance', () => {
      db = knex({
        client: 'pg',
        connection: process.env.TEST_DATABASE_URL
      });
      app.set('db', db);
    });

    before('clean the table', () => db('acroyoga_flows').truncate());

    after('disconnect from db', () => db.destroy());

    afterEach('cleanup', () => db('acroyoga_flows').truncate());

    describe('GET /api/flows', () => {
      context(`Given no flows`, () => {
        it(`responds with 200 and an empty list`, () => {
          return supertest(app)
            .get('/api/flows')
            .expect(200, []);
        });
      });

      context('Given there are flows in the database', () => {
        const testFlows = acroElementsForInsert();
        const returnFlows = acroFlowsForReturn();

        beforeEach('insert flows', () => {
          return db
            .into('acroyoga_flows')
            .insert(testFlows);
        });

        it('GET /api/flows responds with 200 and all flows', () => {
          return supertest(app)
            .get('/api/flows')
            .expect(200, returnFlows);
        });
      });
        
    });
    
    describe('POST /api/flows', () => {

      it('creates a flow, responds with 201 and the new flow', () => {

        const newFlow = {
          flowTitle: 'My New Flow',
          flowSlugTitle: 'my-new-flow',
          flowSequence: ['front-bird', 'throne', 'front-bird']
        };

        return supertest(app)
          .post('/api/flows')
          .send(newFlow)
          .expect(201)
          .expect((res) => {
            expect(res.body.flowTitle).to.eql(newFlow.flowTitle);
            expect(res.body.flowSlugTitle).to.eql(newFlow.flowSlugTitle);
            expect(res.body.flowSequence).to.eql(newFlow.flowSequence);
            expect(res.body).to.have.property('flowId');
            expect(res.headers.location).to.eql(`/api/flows/${res.body.flowId}`);
          })
        
      });
      
   
      
         
    });


})
