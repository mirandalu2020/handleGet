const dynamoose = require('dynamoose');
const plantSchema = new dynamoose.Schema({
  id: {
    type: String,
    required: true,
  },
  soilMoisture: {
    type: Number,
  },
  temperature: {
    type: Number,
  },
  humidity: {
    type: Number,
  },
  timestamp: {
    type: String,
    required: true,
  },
  plantId: {
    type: String,
  },
  
});
const plantModel = dynamoose.model('caterpillar-plant-status', plantSchema);
exports.handler = async(event) => {
  console.log('READ PLANT EVENT: ', event);
  // TODO implement
  let params = event.pathParameters;
  let responseBody = null;
  if (params) {
    responseBody = await plantModel.scan('id').eq(params['id']).exec();
  } else {
    responseBody = await plantModel.scan().exec();
  }
  const response = {
    statusCode: 200,
    body: JSON.stringify(responseBody),
  };
  return response;
};