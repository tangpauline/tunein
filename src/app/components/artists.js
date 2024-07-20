'use client'
import '../assets/statslist.css'
import {useState, useEffect} from 'react'
import {getTopNItems} from '../utils/utils';
import html2canvas from 'html2canvas';

export default function Artists(params) {
    const [artists, setArtists] = useState({});
    const [timeClicked, setTimeClicked] = useState("sh");

    const shBtn = document.getElementById("sh-btn-a");
    const meBtn = document.getElementById("me-btn-a");
    const loBtn = document.getElementById("lo-btn-a");

    // fetch top 10 artists
    useEffect(() => {
        // default: top 10
        const fetchTopArtists = async () => {
            const topArtistsF = await getTopNItems(params.access_token, "artists", 10, "short_term");
            setArtists(topArtistsF.items.map((artist) => ({
                name: artist.name,
                img: artist.images[0].url
            })));
        };
        fetchTopArtists();
    }, []);

    // 1 month clicked
    const fetchShort = async () => {
        const shortArtists = await getTopNItems(params.access_token, "artists", 10, "short_term");
        setArtists(shortArtists.items.map((artist) => ({
            name: artist.name,
            img: artist.images[0].url
        })));

        shBtn.style.background = "#513e66";
        meBtn.style.background = "#81689D";
        loBtn.style.background = "#81689D";

        setTimeClicked("sh");
    }

    // 6 months clicked
    const fetchMedium = async () => {
        const mediumArtists = await getTopNItems(params.access_token, "artists", 10, "medium_term");
        setArtists(mediumArtists.items.map((artist) => ({
            name: artist.name,
            img: artist.images[0].url
        })));

        shBtn.style.background = "#81689D";
        meBtn.style.background = "#513e66";
        loBtn.style.background = "#81689D";

        setTimeClicked("me");
    }

    // 1 year clicked
    const fetchLong = async () => {
        const longArtists = await getTopNItems(params.access_token, "artists", 10, "long_term");
        setArtists(longArtists.items.map((artist) => ({
            name: artist.name,
            img: artist.images[0].url
        })));

        shBtn.style.background = "#81689D";
        meBtn.style.background = "#81689D";
        loBtn.style.background = "#513e66";

        setTimeClicked("lo");
    }

    // save top artists as PNG image
    const saveImage = () => {
        const compClone = document.querySelector('#top-artists').cloneNode(true);
        
        // remove times buttons
        const times = compClone.childNodes[1];
        compClone.removeChild(times);
        
        // remove artist cover images
        const artists = compClone.getElementsByTagName("li");
        for (let t = 0; t < artists.length; t++) {
            const coverImg = artists[t].childNodes[0];
            artists[t].removeChild(coverImg);
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
        h2.innerText = params.user_name + "'s Top Artists";
        h2.style.fontSize = "30px";
        h2.style.color="#C09FCD";
        const p2 = document.createElement("p");
        if (timeClicked == "sh") {
            p2.innerText = "This Past Month";
        } else if (timeClicked == "me") {
            p2.innerText = "The Past 6 Months";
        } else {
            p2.innerText = "This Past Year";
        }
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
            link.download = 'tunein-artists.png';
            link.click();
        });

        document.body.removeChild(compClone);
    }

    return (
        <div className="stats-container">
            <div className="top-stats" id="top-artists">
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

            <div className="save-btns-div">
                <button className="save-btn" onClick={saveImage}>Save as PNG</button>
            </div>
        </div>
    );
}