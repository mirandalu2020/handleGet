const dynamoose = require('dynamoose');
const personSchema = new dynamoose.Schema({
  id: String,
  name: String, 
  age: String, 
  height: String,
})

const PersonModel = dynamoose.model('People', personSchema);

export const handler = async(event) => {

  let id = event.pathParameters;
  let responseBody;

  if(id){
    responseBody = await PersonModel.query('id').eq(id['id']).exec();
  } else{
    responseBody = await PersonModel.scan().exec();
  }

  console.log('PERSON REQUESTED: ', responseBody);

    const response = {
        statusCode: 200,
        body: JSON.stringify(responseBody),
    };
    return response;
};
