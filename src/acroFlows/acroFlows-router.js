const express = require('express');
const path = require('path');
const xss = require('xss');
const AcroFlowsService = require('./acroFlows-service');

const acroFlowsRouter = express.Router();

const sanitizeFlow = flow => ({
    flowId: flow.flow_id,
    flowTitle: xss(flow.flow_title),
    flowSlugTitle: xss(flow.flow_slug_title),
    flowSequence: flow.flow_sequence
})

acroFlowsRouter
  .route('/')
  .get((req, res, next) => {
    AcroFlowsService.getAllFlows(req.app.get('db'))
      .then(flows => res.status(200).json(flows.map(sanitizeFlow)))
      .catch(next);
  })
  .post((req, res, next) => {

    // validate body
    if(!req.body) {
      return res.status(400).json({
        error: { message: `Missing request body` }
      });
    }

    // destructure
    const { flowTitle, flowSlugTitle, flowSequence } = req.body;
    
    // declare required fields
    let reqFields = { flowTitle, flowSlugTitle, flowSequence };

    
    // validate required fields
    for (const [key, value] of Object.entries(reqFields)) {
      if(!value) {
        return res.status(400).json({
          error: { message: `Missing ${key} in request body` }
        });
      }
    }

    // construct new flow object
    let newFlow = {
        flow_title: flowTitle,
        flow_slug_title: flowSlugTitle,
        flow_sequence: flowSequence
    };

    // insert new flow object into database
    AcroFlowsService.insertFlow(
      req.app.get('db'),
      newFlow
    )
      .then(flow => {
        res
          .status(201)
          .location(path.posix.join (req.originalUrl, `/${flow.flow_id}`))
          .json(sanitizeFlow(flow));
      })
      .catch(next);
  });

module.exports = acroFlowsRouter;
