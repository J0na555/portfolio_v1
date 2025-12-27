import React, { useState, useEffect } from "react";

const StatusCard = () => {
    const [time, setTime] = useState("");
    const [spotify, setSpotify] = useState<any>(null);

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const options: Intl.DateTimeFormatOptions = {
                timeZone: "Africa/Addis_Ababa",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: false,
            };
            setTime(new Intl.DateTimeFormat("en-GB", options).format(now));
        };

        updateTime();
        const timer = setInterval(updateTime, 1000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const fetchSpotify = async () => {
            try {
                const res = await fetch("/api/spotify");
                const data = await res.json();
                setSpotify(data);
            } catch (e) {
                console.error("Failed to fetch Spotify status");
            }
        };

        fetchSpotify();
        const timer = setInterval(fetchSpotify, 30000); // Update every 30s
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="flex flex-col gap-4 w-full max-w-sm mx-auto lg:mx-0">
            <div className="bg-[#ffffff05] backdrop-blur-md border border-[#ffffff10] rounded-2xl p-5 space-y-4 hover:border-[#ffffff20] transition-colors group">
                {/* Time and Location */}
                <div className="flex justify-between items-start">
                    <div className="space-y-1">
                        <p className="text-[var(--white-icon)] text-xs uppercase tracking-wider font-medium">Local Time</p>
                        <p className="text-2xl font-mono font-medium text-[var(--white)] tabular-nums">
                            {time || "00:00:00"}
                        </p>
                    </div>
                    <div className="text-right space-y-1">
                        <p className="text-[var(--white-icon)] text-xs uppercase tracking-wider font-medium">Location</p>
                        <p className="text-[var(--white)] text-sm font-medium">Addis Ababa, ET</p>
                    </div>
                </div>

                <div className="h-px bg-gradient-to-r from-transparent via-[#ffffff10] to-transparent w-full" />

                {/* Status */}
                <div className="flex items-center gap-3">
                    <div className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#A9FF5B] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-[#A9FF5B]"></span>
                    </div>
                    <p className="text-[var(--white)] text-sm font-medium">
                        Open for freelance projects
                    </p>
                </div>

                {/* Current Vibe / Spotify */}
                <div className="bg-[#a476ff10] rounded-xl p-3 border border-[#a476ff20]">
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className={`w-4 h-4 ${spotify?.isPlaying ? "text-[#1DB954] animate-pulse" : "text-[#a476ff]"}`}
                            >
                                <path d="M12 3V13.55C11.41 13.21 10.73 13 10 13C7.79 13 6 14.79 6 17C6 19.21 7.79 21 10 21C12.21 21 14 19.21 14 17V7H18V3H12Z" />
                            </svg>
                            <span className="text-[var(--white-icon)] text-[10px] uppercase tracking-widest font-bold">
                                {spotify?.isPlaying ? "Now Playing" : "Last Played"}
                            </span>
                        </div>
                        {spotify?.isPlaying && (
                            <div className="flex gap-1 items-end h-3">
                                <div className="w-0.5 bg-[#1DB954] animate-[music-bar_0.8s_ease-in-out_infinite]"></div>
                                <div className="w-0.5 bg-[#1DB954] animate-[music-bar_1.2s_ease-in-out_infinite]"></div>
                                <div className="w-0.5 bg-[#1DB954] animate-[music-bar_1.0s_ease-in-out_infinite]"></div>
                            </div>
                        )}
                    </div>

                    {spotify && spotify.title !== 'Not Integrated' ? (
                        <a
                            href={spotify.songUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 group/song"
                        >
                            {spotify.albumImageUrl && (
                                <img
                                    src={spotify.albumImageUrl}
                                    alt={spotify.title}
                                    className={`w-10 h-10 rounded-lg shadow-lg ${spotify.isPlaying ? "animate-[spin_10s_linear_infinite]" : ""}`}
                                />
                            )}
                            <div className="min-w-0">
                                <p className="text-white text-xs font-bold truncate group-hover/song:text-[#a476ff] transition-colors">
                                    {spotify.title}
                                </p>
                                <p className="text-[var(--white-icon)] text-[10px] truncate">
                                    {spotify.artist}
                                </p>
                            </div>
                        </a>
                    ) : (
                        <div className="flex items-center justify-between">
                            <span className="text-[var(--white-icon)] text-xs font-medium">Current Vibe</span>
                            <span className="text-white text-[10px] font-bold px-2 py-1 rounded-lg bg-[#a476ff] shadow-[0_0_10px_rgba(164,118,255,0.3)] uppercase tracking-wider">
                                Anime OSTs 🎧
                            </span>
                        </div>
                    )}
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
        @keyframes music-bar {
          0%, 100% { height: 4px; }
          50% { height: 12px; }
        }
      `}} />
        </div>
    );
};

export default StatusCard;
