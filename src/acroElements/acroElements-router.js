const express = require('express');
const AcroElementsService = require('./acroElements-service');
const path = require('path');
const xss = require('xss');

const acroElementsRouter = express.Router();

const sanitizeElement = element => ({
    elementId: element.element_id,
    elementSlugId: xss(element.element_slug_id),
    elementName: xss(element.element_name), 
    elementThumbUrl: xss(element.element_thumb_url)
})

acroElementsRouter
  .route('/')
  .get((req, res, next) => {
    AcroElementsService.getAllAcroElements(req.app.get('db'))
      .then(elements => res.json(elements.map(sanitizeElement)))
      .catch(next);
  })
  .post((req, res, next) => {
    // validate
    if(!req.body){
      return res
          .status(400)
          .json({
            error: { message: `Missing request body` }
          });
    }

    // destructure
    const { elementSlugId, elementName, elementThumbUrl } = req.body;
    
    let reqFields = { elementSlugId, elementName, elementThumbUrl };
    
    // validate
    for (const [key, value] of Object.entries(reqFields)) {
      if(value === null) {
        return res
          .status(400)
          .json({
            error: { message: `Missing ${key} in request body` }
          });
      }
    }

    let newAcroElement = {
        element_slug_id: elementSlugId,
        element_name: elementName,
        element_thumb_url: elementThumbUrl
    };

    AcroElementsService.insertAcroElement(
      req.app.get('db'),
      newAcroElement
    )
      .then(element => {
        res
          .status(201)
          .location(path.posix.join (req.originalUrl, `/${element.element_id}`))
          .json(sanitizeElement(element));
      })
      .catch(next);
  });

module.exports = acroElementsRouter;
