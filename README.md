# ChatApp - WhatsApp-like Real-time Chat Application

Modern, responsive, and feature-rich chat application built with Node.js, Socket.IO, and React.

## ✨ Features

- **Real-time Messaging**: Instant message delivery using Socket.IO
- **User Authentication**: Simple name-based login with custom avatars
- **Online Status**: Real-time user online/offline indicators
- **Typing Indicators**: See when others are typing
- **Responsive Design**: Works perfectly on desktop and mobile devices
- **Modern UI**: Beautiful animations and smooth transitions
- **Message Actions**: Reply, forward, and edit messages
- **User Search**: Find users quickly with search functionality
- **Custom Avatars**: Generate random colorful avatars

## 🚀 Tech Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **Socket.IO** - Real-time communication
- **CORS** - Cross-origin resource sharing

### Frontend
- **React 18** - UI library
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Socket.IO Client** - Real-time client
- **Lucide React** - Beautiful icons
- **React Hot Toast** - Toast notifications
- **Date-fns** - Date utility library

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Backend Setup
1. Install backend dependencies:
```bash
npm install
```

2. Start the server:
```bash
# Development mode
npm run dev

# Production mode
npm start
```

The backend will run on `http://localhost:5000`

### Frontend Setup
1. Navigate to the client directory:
```bash
cd client
```

2. Install frontend dependencies:
```bash
npm install
```

3. Start the React development server:
```bash
npm start
```

The frontend will run on `http://localhost:3000`

## 🌐 Usage

1. **Open the application** in your browser
2. **Enter your name** and optionally generate a custom avatar
3. **Join the chat** and start messaging
4. **See other users** in the sidebar
5. **Real-time updates** for messages and user status

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
PORT=5000
NODE_ENV=development
```

### Socket.IO Configuration
The application automatically connects to the backend Socket.IO server. You can customize the connection URL by setting:

```env
REACT_APP_SOCKET_URL=http://localhost:5000
```

## 📱 Responsive Design

- **Desktop**: Full sidebar and chat area layout
- **Tablet**: Adaptive layout with collapsible sidebar
- **Mobile**: Mobile-first design with touch-friendly controls

## 🎨 Customization

### Colors
Modify the color scheme in `client/tailwind.config.js`:

```javascript
colors: {
  primary: {
    500: '#0ea5e9', // Main brand color
    // ... other shades
  }
}
```

### Animations
Customize animations in `client/src/index.css` and `client/src/App.css`

## 🚀 Deployment

### Heroku
1. Create a Heroku app
2. Set environment variables
3. Deploy using Git:
```bash
git push heroku main
```

### Vercel/Netlify
1. Build the application:
```bash
npm run build
```
2. Deploy the `client/build` folder

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Socket.IO for real-time communication
- Tailwind CSS for beautiful styling
- Framer Motion for smooth animations
- Lucide for beautiful icons

## 📞 Support

If you have any questions or need help, please open an issue on GitHub.

---

**Happy Chatting! 💬✨**