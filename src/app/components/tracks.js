'use client'
import '../assets/statslist.css'
import {useState, useEffect} from 'react'
import {getTopNItems, createPlaylist, addToPlaylist} from '../utils/utils';
import html2canvas from 'html2canvas';

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

    const saveImage = () => {
        const compClone = document.querySelector('#top-tracks').cloneNode(true);
        
        // remove times buttons
        const times = compClone.childNodes[1];
        compClone.removeChild(times);
        
        // remove album cover images
        const tracks = compClone.getElementsByTagName("li");
        console.log(tracks);
        for (let t = 0; t < tracks.length; t++) {
            console.log(tracks[t]);
            const albumImg = tracks[t].childNodes[0];
            console.log(albumImg);
            tracks[t].removeChild(albumImg);
        }

        // adjust header
        const h1 = document.createElement("h1");
        h1.innerText = "TuneIn";
        h1.style.textAlign = "center";
        const p1 = document.createElement("p");
        p1.innerText = "Spotify Music Dashboard";
        p1.style.textAlign = "center";
        p1.style.color = "#FFD0EC";
        const br0 = document.createElement("br");
        const h2 = compClone.childNodes[0];
        h2.innerText = params.user_name + "'s Top Tracks";
        h2.style.fontSize = "30px";
        h2.style.color="#C09FCD";
        const p2 = document.createElement("p");
        p2.innerText = "This Past Month";
        p2.style.textAlign = "center";
        p2.style.color = "#C09FCD"
        compClone.insertBefore(h1, h2);
        compClone.insertBefore(p1, h2);
        compClone.insertBefore(br0, h2);
        const ol = compClone.getElementsByTagName("ol")[0];
        compClone.insertBefore(p2, ol);

        // add website name in footer
        const tunein = document.createElement("p");
        tunein.innerHTML = "Created using TuneIn<br>tunein-music.vercel.app";
        tunein.style.textAlign = "center";
        tunein.style.color = "#FFD0EC";
        compClone.appendChild(tunein);

        //  resize component
        compClone.setAttribute("style", "width: 500px");
        const br = document.createElement("br");
        const br1 = document.createElement("br");
        const br2 = document.createElement("br");
        const br3 = document.createElement("br");
        const br4 = document.createElement("br");
        const ch = compClone.childNodes[0];
        compClone.insertBefore(br, ch);
        compClone.insertBefore(br1, br);
        compClone.insertBefore(br2, br1);
        compClone.insertBefore(br3, br2);
        compClone.insertBefore(br4, br3);

        document.body.appendChild(compClone);

        // create image
        window.scrollTo(0,0);
        html2canvas(compClone, {
            scrollX: -window.scrollX,
            scrollY: -window.scrollY,
            windowWidth: compClone.offsetWidth,
            windowHeight: compClone.scrollHeight
        }).then(canvas => {
            const link = document.createElement('a');
            link.href = canvas.toDataURL('image/png');
            link.download = 'tunein-tracks.png';
            link.click();
        });

        document.body.removeChild(compClone);
    }

    return (
        <div className="stats-container">
            <div className="top-stats" id="top-tracks">
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
            </div>
            
            <div className="save-btns-div">
                <button className="save-btn" id="save-btn" onClick={savePlaylist}>Save as playlist</button>
                <button className="save-btn" onClick={saveImage}>Save as PNG</button>
            </div>
        </div>
    );
}