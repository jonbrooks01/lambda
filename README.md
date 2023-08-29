# lambda

Lambda is used by tracking what objects get saved into the bucket. The function pulls out the name of the object, its file and size type. Then it is displayed in a json file separating each object contents in an array format.

The hardest part of using lambda was getting the function to work correctly and display the information regarding what the object was and to save it correctly in the json file. The function will get a trigger from the bucket when a file is uploaded. That trigger will then run the function and save the json format of that file to a combined file that will have all the information of every file that triggered the function.

[images.json](https://401n23.s3.us-west-2.amazonaws.com/images.json)

