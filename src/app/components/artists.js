'use client'
import '../assets/statslist.css'
import {useState, useEffect} from 'react'
import {getTopNItems} from '../utils/utils';

export default function Artists(access_token) {
    const [artists, setArtists] = useState({});

    const shBtn = document.getElementById("sh-btn-a");
    const meBtn = document.getElementById("me-btn-a");
    const loBtn = document.getElementById("lo-btn-a");

    // fetch top 10 tracks
    useEffect(() => {
        // default: top 10
        const fetchTopArtists = async () => {
            const topArtistsF = await getTopNItems(access_token.access_token, "artists", 10, "short_term");
            setArtists(topArtistsF.items.map((artist) => ({
                name: artist.name,
                img: artist.images[0].url
            })));
        };
        fetchTopArtists();
    }, []);

    // 1 month clicked
    const fetchShort = async () => {
        const shortArtists = await getTopNItems(access_token.access_token, "artists", 10, "short_term");
        setArtists(shortArtists.items.map((artist) => ({
            name: artist.name,
            img: artist.images[0].url
        })));

        shBtn.style.background = "#513e66";
        meBtn.style.background = "#81689D";
        loBtn.style.background = "#81689D";
    }

    // 6 months clicked
    const fetchMedium = async () => {
        const mediumArtists = await getTopNItems(access_token.access_token, "artists", 10, "medium_term");
        setArtists(mediumArtists.items.map((artist) => ({
            name: artist.name,
            img: artist.images[0].url
        })));

        shBtn.style.background = "#81689D";
        meBtn.style.background = "#513e66";
        loBtn.style.background = "#81689D";
    }

    // 1 year clicked
    const fetchLong = async () => {
        const longArtists = await getTopNItems(access_token.access_token, "artists", 10, "long_term");
        setArtists(longArtists.items.map((artist) => ({
            name: artist.name,
            img: artist.images[0].url
        })));

        shBtn.style.background = "#81689D";
        meBtn.style.background = "#81689D";
        loBtn.style.background = "#513e66";
    }

    return (
        <div className="tracks-container">
            <h2>Top Artists</h2>

            <div className="time-ranges">
                <button className="time-btn" id="sh-btn-a" onClick={fetchShort}>1m</button>
                <button className="time-btn" id="me-btn-a" onClick={fetchMedium}>6m</button>
                <button className="time-btn" id="lo-btn-a" onClick={fetchLong}>1y</button>
            </div>

            <ol className="list-decimal list-inside">
                {Object.keys(artists).length !== 0 && 
                artists.map((artist) => (
                    <li key={artist.name}>
                        <img src={artist.img}></img>
                        <div className="item-info">
                            <p className="track-title">{artist.name}</p>
                        </div>
                    </li>
                ))
                }
            </ol>            
        </div>
    );
}