import queryString from 'query-string';
import { NextRequest, NextResponse } from 'next/server';

var REDIRECT_URI = process.env.REDIRECT_URI;
var CLIENT_ID = process.env.CLIENT_ID;

function generateRandomString(num) {
    return Math.random().toString(num).substring(3,9);
}

"/api/login"
export async function GET(request) {
    console.log("get request, login");
    var state = generateRandomString(16);
    var scope =
        'user-read-private user-read-email user-top-read playlist-modify-public';
    const response = NextResponse.redirect(
        'https://accounts.spotify.com/authorize?' +
        queryString.stringify({
            response_type: 'code',
            client_id: CLIENT_ID,
            scope: scope,
            redirect_uri: REDIRECT_URI,
            state: state,
            show_dialog: true,
        })
    );

    response.headers.set("Cache-Control", "no-cache");

    return response;
}