# ImageProcessingAPI

This app resizes images in the folder assets/full and outputs to folder assets/thumbnails

To start the app:
1 - npm install
2 - npm run build
3 - npm run start

To start the app in development mode:
1 - npm install
2 - npm run watch
3 - npm run dev (in another terminal window)

To test the app:
npm run test

To use this app you should call the endpoint /image with the method GET providing the following query parameters:
name: the image name
width: the required width to resize to (default: 200)
height: the required height to resize to (default: 200)
ext: which is the extension of the image (default: jpg)
