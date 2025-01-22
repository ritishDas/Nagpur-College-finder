const express=require("express");
const {removeCollege,addCollege,allCollege,fetchCollege,saveCollege} 
    = require("../controllers/college.js");
const multer=require("../middlewares/multer.js"); 
const authCheck = require("../middlewares/auth.js");

const router = express.Router();

router.route('/addCollege').post(multer.array("photos",5),authCheck,addCollege);
router.route('/allCollege').get(allCollege);
router.route('/:id').get(fetchCollege);
router.route('/save/:id').put(authCheck,saveCollege);
router.route('/remove/:id').put(authCheck,removeCollege);

router.route('/dialogflow').post((req,res,next)=>{
  const data = req.body;
res.json({person:data.parameters.person.name,
  data.parameters.year[0]});
});
module.exports=router;
  
  /*
   curl -X POST -H 'Content-Type: application/json' -d '{"responseId":"e8526749-b084-4a97-bda2-85ace3ebc3ac-acd8d9b5","queryResult":{"queryText":"myself ritish das from 1st year","action":"Responding","parameters":{"person":{"name":"ritish das"},"year":[1]},"allRequiredParamsPresent":true,"fulfillmentText":"Welcome ritish das! Can I provide resources for 1 year?","fulfillmentMessages":[{"text":{"text":["Welcome ritish das! Can I provide resources for 1 year?"]}}],"intent":{"name":"projects/first-gbqi/agent/intents/58c06fe3-7e8d-490c-af7a-c91d87e0a066","displayName":"john is in his final 4th year"},"intentDetectionConfidence":0.84779793,"languageCode":"en"},"originalDetectIntentRequest":{"source":"DIALOGFLOW_CONSOLE","payload":{}},"session":"projects/first-gbqi/agent/sessions/d94a1ea5-4ce0-bc9d-b3be-47e0796ef4bc"}' https://jsonplaceholder.typicode.com/
   * */
