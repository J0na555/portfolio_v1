import React, { useState, useEffect } from "react";

interface DevStatus {
    github: string | null;
    leetcode: string | null;
    codeforces: string | null;
}

const StatusCard = () => {
    const [time, setTime] = useState("");
    const [status, setStatus] = useState<DevStatus | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const updateTime = () => {
            setTime(
                new Intl.DateTimeFormat("en-GB", {
                    timeZone: "Africa/Addis_Ababa",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    hour12: false,
                }).format(new Date())
            );
        };
        updateTime();
        const timer = setInterval(updateTime, 1000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const fetchStatus = async () => {
            try {
                const res = await fetch("/api/status");
                if (!res.ok) throw new Error("non-ok response");
                const data: DevStatus = await res.json();
                setStatus(data);
            } catch {
                // fail silently — UI shows "—" for missing data
            } finally {
                setLoading(false);
            }
        };
        fetchStatus();
    }, []);

    return (
        <div className="flex flex-col gap-4 w-full max-w-sm mx-auto lg:mx-0">
            <div className="bg-[#ffffff05] backdrop-blur-md border border-[#ffffff10] rounded-2xl p-5 space-y-4 hover:border-[#ffffff20] transition-colors">

                {/* Time and Location */}
                <div className="flex justify-between items-start">
                    <div className="space-y-1">
                        <p className="text-[var(--white-icon)] text-xs uppercase tracking-wider font-medium">
                            Local Time
                        </p>
                        <p className="text-2xl font-mono font-medium text-[var(--white)] tabular-nums">
                            {time || "00:00:00"}
                        </p>
                    </div>
                    <div className="text-right space-y-1">
                        <p className="text-[var(--white-icon)] text-xs uppercase tracking-wider font-medium">
                            Location
                        </p>
                        <p className="text-[var(--white)] text-sm font-medium">Addis Ababa, ET</p>
                    </div>
                </div>

                <div className="h-px bg-gradient-to-r from-transparent via-[#ffffff10] to-transparent w-full" />

                {/* Availability status */}
                <div className="flex items-center gap-3">
                    <div className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#A9FF5B] opacity-75" />
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-[#A9FF5B]" />
                    </div>
                    <p className="text-[var(--white)] text-sm font-medium">
                        Open for freelance projects
                    </p>
                </div>

                {/* Terminal dev-activity block */}
                <div className="bg-[#0a0a0a] rounded-xl border border-[#ffffff10] overflow-hidden">
                    {/* Window chrome */}
                    <div className="flex items-center gap-2 px-3 py-2 border-b border-[#ffffff08] bg-[#111111]">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                        <span className="ml-2 text-[#555] text-[10px] font-mono">status</span>
                    </div>

                    {/* Terminal body */}
                    <div className="p-3 font-mono text-[11px] space-y-1.5">
                        {loading ? (
                            <p className="text-[#555] animate-pulse pl-1">loading...</p>
                        ) : (
                            <div className="space-y-1.5 pt-0.5">
                                <StatusLine
                                    label="Last Commit"
                                    value={status?.github ?? null}
                                    labelColor="text-[#a476ff]"
                                />
                                <StatusLine
                                    label="LeetCode"
                                    value={status?.leetcode ?? null}
                                    labelColor="text-[#f7a700]"
                                />
                                <StatusLine
                                    label="Codeforces"
                                    value={status?.codeforces ?? null}
                                    labelColor="text-[#4fc3f7]"
                                />
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
};

interface StatusLineProps {
    label: string;
    value: string | null;
    labelColor: string;
}

const StatusLine = ({ label, value, labelColor }: StatusLineProps) => (
    <p className="flex items-start gap-1 leading-relaxed">
        <span className={`shrink-0 ${labelColor}`}>{label}:</span>
        <span className="text-[#c0c0c0] break-all">{value ?? "—"}</span>
    </p>
);

export default StatusCard;
