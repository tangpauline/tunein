import { NextResponse } from 'next/server';

export const config = {
    runtime: 'edge',
  };

// remove access token from cookies
export async function POST(request) {
    const response = new NextResponse();

    response.cookies.set('access_token', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        expires: new Date(0),
        path: '/api/token',
    });

    // req
    request.cookies.set('access_token', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        expires: new Date(0),
        path: '/api/token',
    });

    return response;
};