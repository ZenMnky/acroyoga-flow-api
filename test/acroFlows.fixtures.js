const acroElementsData = [
  {
    "flow_id": 1,
    "flow_title": "My First Flow",
    "flow_slug_title": "my-first-flow",
    "flow_sequence": ["front-bird","vishnus-couch","front-bird","star-open-straddle","front-bird"]
  },
  {
    "flow_id": 2,
    "flow_title": "My Second Flow",
    "flow_slug_title": "my-second-flow",
    "flow_sequence": ["front-bird","vishnus-couch","front-bird","star-open-straddle","front-bird","vishnus-couch", "throne"]
  }
];

const acroFlowsReturnData = [
  {
    "flowId": 1,
    "flowTitle": "My First Flow",
    "flowSlugTitle": "my-first-flow",
    "flowSequence": [
      'front-bird',
      'vishnus-couch',
      'front-bird',
      'star-open-straddle',
      'front-bird'
    ]
  },
  {
    "flowId": 2,
    "flowTitle": "My Second Flow",
    "flowSlugTitle": "my-second-flow",
    "flowSequence": [
      'front-bird',
      'vishnus-couch',
      'front-bird',
      'star-open-straddle',
      'front-bird',
      'vishnus-couch',
      'throne'
    ]
  }
];



const acroElementsForInsert = () => {
  return acroElementsData
}

const acroFlowsForReturn = () => {
  return acroFlowsReturnData
}

module.exports = {acroElementsForInsert, acroFlowsForReturn};