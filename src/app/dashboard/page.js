'use client'

import '../assets/dashboard.css';
import {useState, useEffect} from 'react'
import {useRouter} from "next/navigation";
import {getUserProfile} from '../utils/utils';
import Tracks from '../components/tracks';
import Artists from '../components/artists';
import Footer from '../components/footer';
import { Work_Sans } from 'next/font/google';

const font = Work_Sans({ subsets: ['latin'] });

export default function Dashboard() {
    const [userProf, setUserProf] = useState({});
    const [access_token, setAccessToken] = useState("");

    const router = useRouter();

    const routeLogout = async () => {
        // remove access token from cookies
        const res = await fetch("/api/logout", {method: 'POST'});
        // document.cookie = 'access_token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/api/token;';

        setAccessToken("");
        setUserProf({});

        const url = 'https://accounts.spotify.com/en/logout';
        const spotifyLogoutWindow = window.open(url, 'Spotify Logout');
        setTimeout(() => {spotifyLogoutWindow.close(); router.push("/")}, 1500);
    };

    useEffect(() => {
        const fetchUserProfile = async () => {
            // fetch access token
            const res = await fetch("/api/token");
            const data = await res.json();

            // if no access token is fetched, re-route to home login page
            if (data.access_token == undefined) {
                router.push("/");
            } else {
                setAccessToken(data.access_token.value);
                // access user data
                const userProfile = await getUserProfile(data.access_token.value);
                if (userProfile === undefined) {
                    router.push("/");
                } else {
                    setUserProf(userProfile);
                }
            }            
        };
        fetchUserProfile();
    }, []);

    return (
        <main className={font.className}>
            <button className="logout-btn" onClick={routeLogout}>Log out</button>

            <div className="header">
                <h1>TuneIn</h1>
                <h2>Spotify Music Dashboard</h2>
            </div>

            <div className="user-header">
                {userProf && userProf.images &&
                    (<img className="user-img" src={userProf.images[1].url}></img>)
                }
                {userProf.display_name && 
                    (<h3>Welcome, {userProf.display_name}</h3>)
                }
                
            </div>
            
            {userProf && userProf.id && 
                (<div className="top-container">
                    <Tracks access_token={access_token} user_id={userProf.id}></Tracks>
                    <Artists access_token={access_token}></Artists>
                </div>)
            }

            <Footer></Footer>
            
        </main>
    );
};