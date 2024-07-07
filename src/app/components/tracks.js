'use client'
import '../assets/statslist.css'
import {useState, useEffect} from 'react'
import {getTopNItems, createPlaylist, addToPlaylist} from '../utils/utils';

export default function Tracks(params) {
    const [tracks, setTracks] = useState({});

    const shBtn = document.getElementById("sh-btn-t");
    const meBtn = document.getElementById("me-btn-t");
    const loBtn = document.getElementById("lo-btn-t");

    // fetch top 10 tracks
    useEffect(() => {
        // default: top 10 of the month
        const fetchTopTracks = async () => {
            const topTracksF = await getTopNItems(params.access_token, "tracks", 10, "short_term");
            setTracks(topTracksF.items.map((track) => ({
                title: track.name,
                artist: track.artists.map((_artist) => _artist.name).join(", "),
                cover: track.album.images[1],
                uri: track.uri
            })));
        };
        fetchTopTracks();
    }, []);


    // 1 month clicked
    const fetchShort = async () => {
        const shortTracks = await getTopNItems(params.access_token, "tracks", 10, "short_term");
        setTracks(shortTracks.items.map((track) => ({
            title: track.name,
            artist: track.artists.map((_artist) => _artist.name).join(", "),
            cover: track.album.images[1],
            uri: track.uri
        })));

        shBtn.style.background = "#513e66";
        meBtn.style.background = "#81689D";
        loBtn.style.background = "#81689D";
    }

    // 6 months clicked
    const fetchMedium = async () => {
        const mediumTracks = await getTopNItems(params.access_token, "tracks", 10, "medium_term");
        setTracks(mediumTracks.items.map((track) => ({
            title: track.name,
            artist: track.artists.map((_artist) => _artist.name).join(", "),
            cover: track.album.images[1],
            uri: track.uri
        })));

        shBtn.style.background = "#81689D";
        meBtn.style.background = "#513e66";
        loBtn.style.background = "#81689D";
    }

    // 1 year clicked
    const fetchLong = async () => {
        const longTracks = await getTopNItems(params.access_token, "tracks", 10, "long_term");
        setTracks(longTracks.items.map((track) => ({
            title: track.name,
            artist: track.artists.map((_artist) => _artist.name).join(", "),
            cover: track.album.images[1],
            uri: track.uri
        })));

        shBtn.style.background = "#81689D";
        meBtn.style.background = "#81689D";
        loBtn.style.background = "#513e66";
    }

    // save as playlist
    const savePlaylist = async () => {
        // create new playlist
        const playlist_id = await createPlaylist(params.access_token, params.user_id);

        // save all songs to new playlist
        const uris = [];
        tracks.map((track) => {
            uris.push(track.uri);
        });

        if (playlist_id != undefined) {
            const snapshot_id = await addToPlaylist(params.access_token, playlist_id, uris);
            if (snapshot_id !== undefined) {
                // display "successfully created" text
                const saveBtn = document.getElementById("save-btn");
                saveBtn.innerText = "Successfully saved!";

                // reset back to orig text after 2 secs
                setTimeout(() => {saveBtn.innerText = "Save as Playlist"}, 2000);
            }
        }

    }

    return (
        <div className="tracks-container">
            <h2>Top Tracks</h2>

            <div className="time-ranges">
                <button className="time-btn" id="sh-btn-t" onClick={fetchShort}>1m</button>
                <button className="time-btn" id="me-btn-t" onClick={fetchMedium}>6m</button>
                <button className="time-btn" id="lo-btn-t" onClick={fetchLong}>1y</button>
            </div>

            <ol className="list-decimal list-inside">
                {Object.keys(tracks).length !== 0 && 
                tracks.map((track) => (
                    <li key={track.title}>
                        <img src={track.cover.url}></img>
                        <div className="item-info">
                            <p className="track-title">{track.title}</p>
                            <p className="track-artist">{track.artist}</p>
                        </div> 
                    </li>
                ))
                }
            </ol>
            
            <div className="playlist-div">
                <button className="save-playlist-btn" id="save-btn" onClick={savePlaylist}>Save as playlist</button>
            </div>
        </div>
    );
}