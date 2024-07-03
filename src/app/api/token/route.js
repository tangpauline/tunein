import { NextRequest, NextResponse } from 'next/server';

export async function GET(request) {
    const access_token = request.cookies.get("access_token")
    return NextResponse.json({access_token: access_token}, { status: 200 });
};