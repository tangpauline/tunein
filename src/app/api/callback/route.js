import queryString from 'query-string';
import { redirect } from 'next/navigation';
import { NextResponse } from 'next/server';



var REDIRECT_URI = process.env.REDIRECT_URI;
var CLIENT_ID = process.env.CLIENT_ID;
var CLIENT_SECRET = process.env.CLIENT_SECRET;
var REFRESH_TOKEN = process.env.REFRESH_TOKEN;

"/api/callback"
export async function GET(request) {
  const response = NextResponse.redirect('http://localhost:3000/dashboard');
  const params = request.nextUrl.searchParams;
  var code = params.get("code");
  var state = params.get("state");

  if (state === null) {
    redirect('/#' +
      queryString.stringify({
        error: 'state_mismatch'
      }));
  } else {
    // get access token
    var authOptions = {
      method: "POST",
      body: new URLSearchParams({
        code: code,
        grant_type: "authorization_code",
        redirect_uri: REDIRECT_URI,
      }),
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + (new Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64'))
      },
      json: true
    };

    const res = await fetch("https://accounts.spotify.com/api/token", authOptions);
    const tokens = await res.json();

    response.cookies.set('access_token', tokens.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      maxAge: 60 * 60 * 24 * 7,
      path: '/api/token',
    });

    return response;
  }
}

