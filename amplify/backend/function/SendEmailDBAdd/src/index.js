const aws = require('aws-sdk')
const ses = new aws.SES()

exports.handler = async (event) => {
  for (const streamedItem of event.Records) {
    if (streamedItem.eventName === 'INSERT') {
      //pull off items from stream
      const departureLocation = streamedItem.dynamodb.NewImage.departureLocation.S
      const departureDate = streamedItem.dynamodb.NewImage.departureDate.S
      const arrivalLocation = streamedItem.dynamodb.NewImage.arrivalLocation.S
      const returnDate = streamedItem.dynamodb.NewImage.returnDate.S
      const candidateEmail = streamedItem.dynamodb.NewImage.email.S

      await ses
          .sendEmail({
            Destination: {
              ToAddresses: [process.env.SES_EMAIL],
            },
            Source: process.env.SES_EMAIL,
            Message: {
              Subject: { Data: 'New Stopover Request' },
              Body: {
                Text: { Data: `Departure Location: ${departureLocation}\nArrival Location: ${arrivalLocation} Departure Date: ${departureDate}\nReturn date: ${returnDate}\nEmail: ${candidateEmail}` },
              },
            },
          })
          .promise()
    }
  }
  return { status: 'done' }
}
