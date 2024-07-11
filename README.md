# TuneIn
TuneIn is a web application that utilizes the Spotify Web API to provide users with insightful listening statistics and personalized playlist creation. This project showcases the integration of modern web technologies to deliver a seamless user experience. Demo (development mode): https://tunein-music.vercel.app/

## Features
- **User Listening Statistics**: Displays a user's top tracks and top artists based on their Spotify listening history.
- **Playlist Creation**: Allows users to save their top tracks into a new playlist directly within their Spotify account.
- **OAuth Authentication**: Implements OAuth to enable secure user login and data fetching from Spotify.
- **Access Token Management**: Stores the access token as a cookie for secure and efficient API requests.

## Technologies Used
- **Next.js**: Server-side rendering and static site generation framework.
- **React**: Front-end JavaScript library for building user interfaces.
- **JavaScript**: Core programming language used for application logic.

## Installation
### Clone the Repository:
```
git clone https://github.com/your-username/tunein.git
cd tunein
```

### Install Dependencies:
```
npm install
```

### Set Up Environment Variables:
Create a `.env.local` file in the root directory and add your Spotify API credentials:
```
CLIENT_ID=your_spotify_client_id
CLIENT_SECRET=your_spotify_client_secret
REDIRECT_URI=http://localhost:3000/api/callback
```

### Run the Development Server:
```
npm run dev
```

Open http://localhost:3000 with your browser to see the application in action.
