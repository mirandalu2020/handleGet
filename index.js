const dynamoose = require('dynamoose');
const personSchema = new dynamoose.Schema({
  name: String,
  age: String,
  height: String
});
const PersonModel = dynamoose.model('People', personSchema);
exports.handler = async(event) => {
  console.log('READ Person EVENT: ', event);
  // TODO implement
  let params = event.pathParameters;
  let responseBody = null;
  if (params) {
    responseBody = await PersonModel.scan('id').eq(params['id']).exec();
  } else {
    responseBody = await PersonModel.scan().exec();
  }
  const response = {
    statusCode: 200,
    body: JSON.stringify(responseBody),
  };
  return response;
};