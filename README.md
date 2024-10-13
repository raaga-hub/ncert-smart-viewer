# NCERT Smart Viewer

NCERT Smart Viewer is a web application that allows users to view PDFs of chapters from NCERT textbooks, ask questions related to the chapter, and get answers tailored to specific grade levels using AI.

## Screenshots
Explanation with same student level (7) and textbook grade (7)
![alt text](http://url/to/img.png)

Search response with student level (4) less than the textbook grade (7)
![alt text](http://url/to/img.png)

## Features

- Upload and view chapter PDFs by grade and subject.
- Select a grade level and ask AI-powered questions related to the chapters.
- AI-powered responses based on the context of the selected chapter's PDF.
- Frontend built with **React.js** and **Ant Design**.
- Backend powered by **Node.js/Express** and **LangChain** with **OpenAI** integration.
- PDF storage and retrieval using **MongoDB**.

## Project Structure

```plaintext
|-- client          # React frontend application
|   |-- src
|   |   |-- components
|   |   |   |-- PdfViewer.js         # Displays chapter PDFs
|   |   |   |-- QuestionPanel.js     # Handles grade selection, question input, and result display
|   |   |-- App.js                   # Main React app
|   |-- public
|   |   |-- index.html               # Main HTML file
|   |-- package.json                 # Frontend dependencies and scripts
|
|-- server          # Node.js/Express backend application
|   |-- models
|   |   |-- Chapter.js               # MongoDB schema for storing chapter data
|   |-- routes
|   |   |-- question.js              # Handles API requests for answering questions
|   |-- app.js                       # Express application entry point
|   |-- package.json                 # Backend dependencies and scripts
|
|-- README.md                         # Project documentation
```

## Requirements
Node.js (v14+)
MongoDB (for storing chapters and PDFs)
OpenAI API Key (for AI-powered question answering)
Vercel/Netlify (for frontend deployment, optional)
Render/Heroku (for backend deployment, optional)

## Getting Started
1. Clone the Repository
```plain text
git clone https://github.com/yourusername/ncert-smart-viewer.git
cd ncert-smart-viewer
```
2. Set Up the Backend (Express.js)
Navigate to the server directory:

```plain text
cd server
npm install
```

Create a .env file in the server directory:

```plaintext
MONGO_URI=mongodb://localhost:27017/ncert_smart_viewer
OPENAI_API_KEY=your-openai-api-key
```

Start the backend server:
```plaintext
npm start
```

The backend should now be running at http://localhost:3030.

3. Set Up the Frontend (React.js)
```plaintext
cd ../client
npm install
```

Create a .env file in the client directory:
```plaintext
REACT_APP_API_URL=http://localhost:3030
```

Start the frontend app:
```plaintext
npm start
```

The frontend should now be running at http://localhost:3000.

4. Upload Chapter PDFs
You will need to upload your chapter PDFs to MongoDB using the backend API. You can use a tool like MongoDB Compass to insert the PDF files into the database.

5. Deploy the App
Frontend: You can deploy the React app to Vercel or Netlify.
Backend: You can deploy the Express app to Heroku or Render.
Frontend Deployment (Vercel)
Login to Vercel and connect your GitHub repository.
Select the client directory and deploy the frontend.
Update the REACT_APP_API_URL in your .env file with the live backend URL once deployed.
Backend Deployment (Render)
Login to Render and create a new web service.
Connect your GitHub repository and deploy the backend.
Update your MongoDB connection string and OpenAI API key in the Render environment variables.
Usage
Select a chapter and view the PDF.
Choose a grade level using the slider.
Ask a question related to the chapter.
Get AI-powered responses tailored to the selected grade level.

License
This project is licensed under the MIT License.
