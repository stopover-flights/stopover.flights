const aws = require('aws-sdk')
const ses = new aws.SES()

exports.handler = async (event) => {
  for (const streamedItem of event.Records) {
    if (streamedItem.eventName === 'INSERT') {
      //pull off items from stream
      const departureLocation = streamedItem.dynamodb.NewImage.departureLocation.S
      const destination = streamedItem.dynamodb.NewImage.arrivalLocation.S
      const departureDate = streamedItem.dynamodb.NewImage.departureDate.S
      const returnDate = streamedItem.dynamodb.NewImage.returnDate.S
      const oneWay = streamedItem.dynamodb.NewImage.oneWay.S
      const userEmail = streamedItem.dynamodb.NewImage.email.S

      await ses
          .sendEmail({
            Destination: {
              ToAddresses: [process.env.SES_EMAIL],
            },
            Source: 'carter.r.madsen@gmail.com',
            Message: {
              Subject: { Data: 'Candidate Submission' },
              Body: {
                Text: { Data: `Start location: ${departureLocation}\nStart date: ${departureDate}\nDestination: ${destination}\nTrip End Date: ${returnDate}\nEmail: ${userEmail}` },
              },
            },
          })
          .promise()
    }
  }
  return { status: 'done' }
}