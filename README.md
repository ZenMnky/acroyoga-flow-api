# AcroYoga Flow API

_API & PostgreSQL DB for AcroYoga Flow client_

- [Live App](https://acroyoga-flow.vercel.app/)


### Summary
- 🎯 Primary goal of the app:
    - Help AcroYoga practitioners develop a flow by allowing users to Create, Save, and Share (via url) an AcroYoga sequence that is comprised of position images and the position names (aka 'acroyoga elements')

- 🎯 Other goals of this project:
    - Quickly satisfy the project requirements provided by Thinkful and thereby fully complete the coursework
        - This goal was achieved by separating desired features from minimum viable product features, and focusing on the core essence of the project idea.
    - Have an [interactive flow creation feature](https://acroyoga-flow.vercel.app/create/flow) - something that feels more physically engaging than just clicking on a list of items
        - This goal was achieved by using [React-Beautiful-DnD](https://www.npmjs.com/package/react-beautiful-dnd), a library designed specifically for adding a sense of natural movement to lists of items
    - Learn some new things
        - This project was developed in a time crunch, so I had to be very thoughtful about choosing what I wanted to learn.
        - I chose to go with: 
            - [React Hooks](https://reactjs.org/docs/hooks-intro.html) for history, state, context, and component lifecycle functions
                - // So much cleaner and easier to work with, compared to stateful class components and with deeply nested consumers
            - [Styled Components](https://styled-components.com/)
                - // Allows the use of vanilla css in a very simple, clean way. No more css modules, no more messy class names.

- A note on design
    - I chose to focus on learning to use [React-Beautiful-DnD](https://www.npmjs.com/package/react-beautiful-dnd), [React Hooks](https://reactjs.org/docs/hooks-intro.html), and [Styled Components](https://styled-components.com/) rather than spend a bunch of time focusing on flashy styling.
            
### Technology used

- PERN Stack: 
    - PostgreSQL, Express, React, Node

### API Endpoints
- `/api/flows`
    - GET request
        - Example response:
        ```json
        [
            {
                "flowId": 1,
                "flowTitle": "My First Flow",
                "flowSlugTitle": "my-first-flow",
                "flowSequence": [
                "front-bird",
                "vishnus-couch",
                "front-bird",
                "star-open-straddle",
                "front-bird"
                ]
            },
            {
                "flowId": 2,
                "flowTitle": "My Second Flow",
                "flowSlugTitle": "my-second-flow",
                "flowSequence": [
                "front-bird",
                "vishnus-couch",
                "front-bird",
                "star-open-straddle",
                "front-bird",
                "vishnus-couch",
                "throne"
                ]
            }
        ]
        ```
- `/api/acroelements`
    - GET request
         - Example response:
         ```json
         [
            {
                "elementId": 1,
                "elementSlugId": "straddle-bat",
                "elementName": "Straddle Bat",
                "elementThumbUrl": "https://i.ibb.co/0Bh1W9K/Straddle-Bat.png"
            },
            {
                "elementId": 2,
                "elementSlugId": "bat",
                "elementName": "Bat",
                "elementThumbUrl": "https://i.ibb.co/gSzQS0L/Bat.png"
            },
            {
                "elementId": 3,
                "elementSlugId": "front-bird",
                "elementName": "Front Bird",
                "elementThumbUrl": "https://i.ibb.co/0K3404P/Front-Bird.png"
            },
            ...
        ]
         ```
    - POST request
        - required fields:
            - `flowTitle` - string
            - `flowSlugTitle` - string
            - `flowSequence` - array of `elementSlugId`'s
        - Example request: 
            ```json
            {
                "flowTitle" : "testing flow title",
                "flowSlugTitle" : "testing-flow-title",
                "flowSequence": ["front-bird","throne"]
            }
            ```
        - Example response: 
            ```json
            {
                "flowId": 5,
                "flowTitle": "testing flow title",
                "flowSlugTitle": "testing-flow-title",
                "flowSequence": [
                    "front-bird",
                    "throne"
                ]
            }
            ```

## Screenshots
| View |Image |
|:----:|:------:|
| Landing Page | ![landing page mockup](https://i.ibb.co/SQFV7wp/acroyogaflows-mockup-view-landing-page.png)| 
| Flows | ![view flows page mockup](https://i.ibb.co/Qr3Vr87/acroyogaflows-mockup-view-flows.png)| 
| Create Flow | ![create flow page mockup](https://i.ibb.co/3kSJM38/acroyogaflows-mockup-create-flow.png) | 
