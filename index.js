const AWS = require("aws-sdk");
const S3 = new AWS.S3();

exports.handler = async (event) => {
  console.log(event.Records[0].s3.object);
  const newImageRecord = {
    name: event.Records[0].s3.object.key,
    type: ".jpeg",
    size: event.Records[0].s3.object.size,
  };
  let Bucket = "401n23";
  let Key = "images.json";
  // console.log(Bucket, Key)
  //   // console.log("this is the event", event.Records[0].s3.object.key, event.Records[0].s3.object.size )
  try {
    let imagesDictionary = await S3.getObject({ Bucket, Key }).promise();
    // turn buffer to a string, and then the string to a json
    console.log(imagesDictionary);
    const stringifiedImages = imagesDictionary.Body.toString();
    console.log(imagesDictionary);
    let parsedImg = JSON.parse(stringifiedImages);

    const filterForDupes = parsedImg.filter(
      (rec) => rec.name !== event.Records[0].s3.object.key
    );
    filterForDupes.push(newImageRecord);

    const body = JSON.stringify(filterForDupes);
    const command = {
      Bucket,
      Key: "images.json",
      Body: body,
      ContentType: "application/json",
    };
    await uploadFileOnS3(command);
  } catch (e) {
    console.error(e);
    const body = JSON.stringify([newImageRecord]);
    const command = {
      Bucket,
      Key: "images.json",
      Body: body,
      ContentType: "application/json",
    };
    await uploadFileOnS3(command);
  }
};

async function uploadFileOnS3(command) {
  try {
    const response = await S3.upload(command).promise();
    console.log("Response: ", response);
    return response;
  } catch (err) {
    console.log(err);
  }
}
