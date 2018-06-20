## FaceBrain

Live version: https://my-facebrain.herokuapp.com/

This is a final project for "The Complete Web Developer in 2018: Zero to Mastery" on Udemy (https://www.udemy.com/the-complete-web-developer-in-2018/learn/v4/overview)

My-facebrain application uses Postgresql for storing users data, information of their entries.

User:
login: test@gmail.com password: 123

User can put URL of any image and try to count faces of people. If there is no any faces, you will see a message.
Uploading files from computer is in progress...

This application has frontend built on React.js, backend uses Node.js.
Face recognition is developed by Clarifai-API.
Both sides are deployed on heroku.


Backend uses this variables:

DATABASE_URL - url of postgresql database
API_CLARIFAI - key of Clarifai-api
