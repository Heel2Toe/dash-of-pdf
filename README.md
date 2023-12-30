# Dash of Pdf (Vidyalai full stack developer task)

This is a Next.js project that allows users to create new PDFs from existing ones by rearranging and deleting pages.

### Instructions to run

## Backend Setup

- Clone or download the backend repository from https://github.com/Heel2Toe/pdf-api
- Navigate to the cloned folder and run `npm install` to install dependencies
- Start the server by running `node app.js`

## Frontend Setup

- The frontend is hosted on Vercel.
- After running the nodejs server, access the app at https://dash-of-pdf.vercel.app

### Storage

The app uses Cloudinary and Firebase to enable each users to store their own PDFs.

### Authentication

The app uses google provider from firebase to authenticate users

### Screenshots

Screenshots of the app can be found in the `screenshots` folder.

### Global State Management

The app utilizes zustand to manage global states, such as user email.

