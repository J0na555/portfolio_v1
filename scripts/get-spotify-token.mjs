import http from 'http';
import { exec } from 'child_process';
import { URLSearchParams } from 'url';


const [clientId, clientSecret] = process.argv.slice(2);

if (!clientId || !clientSecret) {
    console.error('Error: Please provide CLIENT_ID and CLIENT_SECRET as arguments.');
    console.log('Usage: node scripts/get-spotify-token.mjs <ID> <SECRET>');
    process.exit(1);
}

const REDIRECT_URI = 'http://127.0.0.1:8888/callback';
const SCOPES = 'user-read-currently-playing user-read-recently-played';

const server = http.createServer(async (req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`);

    if (url.pathname === '/callback') {
        const code = url.searchParams.get('code');

        if (code) {
            try {
                const response = await fetch('https://accounts.spotify.com/api/token', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        Authorization: 'Basic ' + Buffer.from(clientId + ':' + clientSecret).toString('base64'),
                    },
                    body: new URLSearchParams({
                        grant_type: 'authorization_code',
                        code: code,
                        redirect_uri: REDIRECT_URI,
                    }),
                });

                const data = await response.json();

                if (data.refresh_token) {
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.end(`
            <div style="font-family: sans-serif; padding: 40px; text-align: center;">
              <h1 style="color: #1DB954;">Success!</h1>
              <p>Your Spotify Refresh Token is:</p>
              <code style="background: #f4f4f4; padding: 10px; border-radius: 5px; display: block; word-break: break-all;">${data.refresh_token}</code>
              <p style="margin-top: 20px;">Copy this and add it to your <b>.env</b> file.</p>
              <p style="color: #666;">You can now close this tab and stop the script.</p>
            </div>
          `);
                    console.log('\n✅ REFRESH TOKEN OBTAINED:');
                    console.log(data.refresh_token);
                    process.exit(0);
                } else {
                    throw new Error(JSON.stringify(data));
                }
            } catch (err) {
                res.end('Error exchanging code for token: ' + err.message);
                console.error('Error:', err);
            }
        } else {
            res.end('No code found in callback');
        }
    }
});

server.listen(8888, () => {
    const authUrl = `https://accounts.spotify.com/authorize?` + new URLSearchParams({
        response_type: 'code',
        client_id: clientId,
        scope: SCOPES,
        redirect_uri: REDIRECT_URI,
    }).toString();

    console.log('\n--- SPOTIFY AUTHENTICATION ---');
    console.log('1. Ensure you added http://127.0.0.1:8888/callback to your Spotify App Redirect URIs.');
    console.log('2. Opening your browser for authentication...');
    console.log('\nIf the browser does not open automatically, visit this URL:');
    console.log(authUrl);
    console.log('\nWaiting for your approval...');

    // Attempt to open the browser
    const start = process.platform === 'darwin' ? 'open' : process.platform === 'win32' ? 'start' : 'xdg-open';
    exec(`${start} "${authUrl}"`);
});
