import type { APIRoute } from 'astro';

const client_id = import.meta.env.SPOTIFY_CLIENT_ID;
const client_secret = import.meta.env.SPOTIFY_CLIENT_SECRET;
const refresh_token = import.meta.env.SPOTIFY_REFRESH_TOKEN;

const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;
const RECENTLY_PLAYED_ENDPOINT = `https://api.spotify.com/v1/me/player/recently-played`;
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

const getAccessToken = async () => {
    const response = await fetch(TOKEN_ENDPOINT, {
        method: 'POST',
        headers: {
            Authorization: `Basic ${basic}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            grant_type: 'refresh_token',
            refresh_token,
        }),
    });

    return response.json();
};

export const GET: APIRoute = async () => {
    if (!client_id || !client_secret || !refresh_token || refresh_token === 'your_refresh_token') {
        return new Response(JSON.stringify({ isPlaying: false, title: 'Not Integrated' }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    try {
        const { access_token } = await getAccessToken();

        // Check Now Playing
        const nowPlayingResponse = await fetch(NOW_PLAYING_ENDPOINT, {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });

        if (nowPlayingResponse.status === 204 || nowPlayingResponse.status > 400) {
            // Not playing anything, get recently played
            const recentlyPlayedResponse = await fetch(`${RECENTLY_PLAYED_ENDPOINT}?limit=1`, {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            });

            const recentlyPlayed = await recentlyPlayedResponse.json();
            const track = recentlyPlayed.items[0].track;

            return new Response(
                JSON.stringify({
                    isPlaying: false,
                    title: track.name,
                    artist: track.artists.map((_artist: any) => _artist.name).join(', '),
                    albumImageUrl: track.album.images[0].url,
                    songUrl: track.external_urls.spotify,
                }),
                {
                    status: 200,
                    headers: { 'Content-Type': 'application/json' },
                }
            );
        }

        const song = await nowPlayingResponse.json();
        const isPlaying = song.is_playing;
        const title = song.item.name;
        const artist = song.item.artists.map((_artist: any) => _artist.name).join(', ');
        const albumImageUrl = song.item.album.images[0].url;
        const songUrl = song.item.external_urls.spotify;

        return new Response(
            JSON.stringify({
                isPlaying,
                title,
                artist,
                albumImageUrl,
                songUrl,
            }),
            {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            }
        );
    } catch (error) {
        console.error('Spotify API Error:', error);
        return new Response(JSON.stringify({ isPlaying: false, title: 'Error fetching Spotify' }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    }
};
