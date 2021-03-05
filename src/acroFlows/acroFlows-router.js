const express = require('express');
const path = require('path');
const xss = require('xss');
const AcroFlowsService = require('./acroFlows-service');

const acroFlowsRouter = express.Router();

const sanitizeFlow = flow => ({
    flowId: flow.flow_id,
    flowTitle: xss(flow.flow_title),
    flowSlugTitle: xss(flow.flow_slug_title),
    flowSequence: xss(flow.flow_sequence)
})

acroFlowsRouter
  .route('/')
  .get((req, res, next) => {
    AcroFlowsService.getAllFlows(req.app.get('db'))
      .then(flows => res.status(200).json(flows.map(sanitizeFlow)))
      .catch(next);
  })
//   .post((req, res, next) => {
//     const { content, attribution, source, tags } = req.body;
    
//     let reqFields = { content }
//     let optionalFileds = { attribution, source, tags }
    
//     // validate
//     for (const [key, value] of Object.entries(reqFields)) {
//       if(value === null) {
//         return res.status(400).json({
//           error: { message: `Missing ${key} in request body` }
//         });
//       }
//     }

//     let newFlow = {
//         ...reqFields,
//         ...optionalFileds
//     }

//     FavoriteFlowsServices.insertFlow(
//       req.app.get('db'),
//       newFlow
//     )
//       .then(flow => {
//         res
//           .status(201)
//           .location(path.posix.join (req.originalUrl, `/${flow.id}`))
//           .json(sanitizeFlow(flow));
//       })
//       .catch(next);
//   });

// acroFlowsRouter
//   .route('/:flow_id')
//   .all((req, res, next) => {
//     FavoriteFlowsServices.getById(
//       req.app.get('db'),
//       req.params.flow_id
//     )
//       .then(flow => {
//         if (!flow) {
//           return res.status(404).json({
//             error: { message: `Flow doesn't exist` }
//           });
//         };
//         res.flow = flow;
//         next();
//       })
//       .catch(next);
//   })
//   .get((req, res, next) => {
//     return res.json(sanitizeFlow(res.flow));
//   })
//   .patch(bodyParser, (req,res,next) => {
//     const { content, attribution, source, tags } = req.body;
    
//     let reqFields = { content }
//     let optionalFileds = { attribution, source, tags }
    
//     // validate
//     for (const [key, value] of Object.entries(reqFields)) {
//       if(value === null) {
//         return res.status(400).json({
//           error: { message: `Missing ${key} in request body` }
//         });
//       }
//     }

//     let updatedFlow = {
//         ...reqFields,
//         ...optionalFileds
//     }

//     FavoriteFlowsServices.updateFlow(
//         req.app.get('db'),
//         req.params.flow_id,
//         updatedFlow
//     )
//     .then(numRowsAffected => {
//         return res.status(204).end()
//     })
//     .catch(next)        
// })
//   .delete((req, res, next) => {
//     FavoriteFlowsServices.deleteArticle(
//       req.app.get('db'),
//       req.params.flow_id
//     )
//       .then(() => {
//         return res.status(204).end();
//       })
//       .catch(next);
//   });

module.exports = acroFlowsRouter;
