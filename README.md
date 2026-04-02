Project Demo Tutorial: [Screencast from 02-02-2026 07:47:16 PM.webm](https://github.com/user-attachments/assets/fdf5ca04-1e00-4c54-82b6-65227782e7ae)

# AI Chatting App

A full-stack AI-powered chatting application built with the MERN stack (MongoDB, Express.js, React, Node.js). This app allows users to register, log in, and engage in conversations with an AI assistant powered by OpenAI and Google Generative AI.

## Demo

[Watch the project demo](https://github.com/user-attachments/assets/1d65a2f4-b19c-4df7-a0ae-f26b07742ed2)

## Features

- **User Authentication**: Secure registration and login with JWT tokens and Google OAuth integration.
- **Real-time Chat**: Interactive chat interface with AI responses.
- **Chat Management**: Create, view, and delete chat sessions and individual messages.
- **Responsive UI**: Modern, responsive design using React and Tailwind CSS.
- **AI Integration**: Powered by OpenAI GPT and Google Generative AI for intelligent responses.
- **Database**: MongoDB with Mongoose for data persistence.

## Tech Stack

### Frontend
- **React**: JavaScript library for building user interfaces.
- **React Router**: For client-side routing.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **FontAwesome**: Icon library for UI elements.
- **Google OAuth**: For social login.

### Backend
- **Node.js**: JavaScript runtime for server-side development.
- **Express.js**: Web application framework for Node.js.
- **MongoDB**: NoSQL database for data storage.
- **Mongoose**: ODM for MongoDB.
- **JWT**: For token-based authentication.
- **bcrypt**: For password hashing.
- **OpenAI API**: For AI chat responses.
- **Google Generative AI**: Additional AI integration.

### Development Tools
- **Nodemon**: For automatic server restarts during development.
- **Create React App**: For React app scaffolding.

## Project Structure

```
AI_CHATING_APP/
├── README.md
├── myapp/                          # Frontend React application
│   ├── package.json
│   ├── public/
│   │   ├── index.html
│   │   ├── manifest.json
│   │   └── robots.txt
│   ├── src/
│   │   ├── App.css
│   │   ├── App.js
│   │   ├── index.css
│   │   ├── index.js
│   │   ├── components/
│   │   │   ├── Chatbox.jsx
│   │   │   ├── ChatSidebar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Header.jsx
│   │   │   └── Message.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── pages/
│   │   │   ├── ChatPage.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   └── routes/
│   │       └── PrivateRoute.jsx
│   ├── tailwind.config.js
│   └── README.md
└── server/                         # Backend Node.js application
    ├── index.js
    ├── package.json
    ├── config/
    │   └── db.js
    ├── controllers/
    │   ├── authController.js
    │   ├── chatController.js
    │   └── userController.js
    ├── middlewares/
    │   └── authMiddleware.js
    ├── models/
    │   ├── ChatModel.js
    │   ├── Messagemodel.js
    │   └── UserModel.js
    ├── routes/
    │   ├── chatRoutes.js
    │   └── userRoutes.js
    └── utils/
        └── generateTokens.js
```

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Backend Setup
1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the server directory with the following variables:
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   OPENAI_API_KEY=your_openai_api_key
   GOOGLE_AI_API_KEY=your_google_ai_api_key
   ```

4. Start the server:
   ```bash
   npm run dev
   ```

### Frontend Setup
1. Navigate to the myapp directory:
   ```bash
   cd ../myapp
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the myapp directory (if needed for additional config).

4. Start the React app:
   ```bash
   npm start
   ```

The application will be running on:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## Usage

1. **Registration/Login**: Users can register a new account or log in using email/password or Google OAuth.
2. **Chat Interface**: After logging in, users can create new chat sessions and start conversations with the AI.
3. **Message Management**: Users can send messages, view chat history, and delete messages or entire chats.
4. **Responsive Design**: The app works on desktop and mobile devices.

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/google` - Google OAuth login

### Chat
- `POST /api/chat` - Send a message in a chat
- `GET /api/chat` - Get all chats for the user
- `GET /api/chat/:chatId` - Get chat history for a specific chat
- `POST /api/chat/new` - Create a new chat
- `DELETE /api/chat/:chatId` - Delete a chat
- `DELETE /api/message/:messageId` - Delete a specific message

All chat endpoints require authentication via JWT token in the Authorization header.

## Workflow

1. **User Onboarding**: New users register or log in.
2. **Authentication**: JWT tokens are issued upon successful login.
3. **Chat Creation**: Users create new chat sessions.
4. **AI Interaction**: Messages are sent to the backend, which processes them using AI APIs (OpenAI or Google Generative AI).
5. **Response Handling**: AI responses are stored in the database and sent back to the frontend.
6. **Data Persistence**: All chats, messages, and user data are stored in MongoDB.

## Contributing

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request.

## License

This project is licensed under the ISC License.

## Author

Muhammad Rabi
