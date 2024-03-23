import { NextResponse } from 'next/server';

export function middleware(req) {
  // retrieve the current response
  const res = NextResponse.next();
  // // if the incoming is for the desired API endpoint
  res.headers.append('Access-Control-Allow-Credentials', 'true');
  res.headers.append('Access-Control-Allow-Origin', 'http://localhost:3001');
  res.headers.append(
    'Access-Control-Allow-Methods',
    'GET,DELETE,PATCH,POST,PUT'
  );
  res.headers.append(
    'Access-Control-Allow-Headers',
    'Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date'
  );
  return res;
}
