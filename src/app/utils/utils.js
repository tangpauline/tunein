// spotify api calls post-authorization
import queryString from 'query-string';

// fetch user's profile
export async function getUserProfile(access_token) {
    const headers = {
        headers: {
            Authorization: `Bearer ${access_token}`,
        }
    };

    const response = await fetch('https://api.spotify.com/v1/me', headers);

    if (response.status == 200) {
        const data = await response.json();
        return data;
    }
    
    console.log("err detected");
    return undefined;
};

// fetch user's top n items (type: tracks or artists)
export async function getTopNItems(access_token, type, n, term) {
    const headers = {
        headers: {
            Authorization: `Bearer ${access_token}`,
        }
    };

    const response = await fetch(`https://api.spotify.com/v1/me/top/${type}?` + 
    queryString.stringify({
        time_range: term,
        limit: n
    }),
    headers);

    if (response.status == 200) {
        const data = await response.json();
        return data;
    }

    console.log("err detected")
    return undefined;
};

// create new playlist, return new playlist_id
export async function createPlaylist(access_token, user_id) {
    const headers = {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${access_token}`,
            'content-type': 'application/json',
        },
        body: JSON.stringify({
            'name': 'TuneIn New Playlist',
            'description': 'New playlist created using TuneIn :)'
        })
    }

    const response = await fetch(`https://api.spotify.com/v1/users/${user_id}/playlists`, headers);
    if (response.status == 201) {
        // fetch id and return it
        const data = await response.json();
        return data.id;
    }

    console.log("err detected");
    return undefined;
}

// add tracks to new playlist, given playlist_id and array of spotify uris
export async function addToPlaylist(access_token, playlist_id, uris) {
    const headers = {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${access_token}`,
            'content-type': 'application/json',
        },
        body: JSON.stringify({
            'uris': uris
        })
    }

    const response = await fetch (`https://api.spotify.com/v1/playlists/${playlist_id}/tracks`, headers);
    if (response.status == 201) {
        const data = await response.json();
        return data.snapshot_id;
    }

    console.log("err detected");
    return undefined;
}
