import type { APIRoute } from 'astro';

const GITHUB_USERNAME = import.meta.env.GITHUB_USERNAME ;
const LEETCODE_USERNAME = import.meta.env.LEETCODE_USERNAME;
const CODEFORCES_HANDLE = import.meta.env.CODEFORCES_HANDLE;

async function getGitHubLastCommit(): Promise<string | null> {
    try {
        const res = await fetch(
            `https://api.github.com/users/${GITHUB_USERNAME}/events`,
            {
                headers: {
                    Accept: 'application/vnd.github+json',
                    'X-GitHub-Api-Version': '2022-11-28',
                    'User-Agent': 'portfolio-status-widget',
                },
            }
        );
        if (!res.ok) return null;

        const events: any[] = await res.json();
        const pushEvent = events.find((e) => e.type === 'PushEvent');
        if (!pushEvent) return null;

        const repoName = (pushEvent.repo?.name as string).split('/')[1] ?? pushEvent.repo?.name;

        return repoName;
    } catch {
        return null;
    }
}

async function getLeetCodeLastSubmission(): Promise<string | null> {
    try {
        const query = `
            query recentAcSubmissions($username: String!, $limit: Int!) {
                recentAcSubmissionList(username: $username, limit: $limit) {
                    title
                }
            }
        `;
        const res = await fetch('https://leetcode.com/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'User-Agent': 'portfolio-status-widget',
                Referer: 'https://leetcode.com',
            },
            body: JSON.stringify({
                query,
                variables: { username: LEETCODE_USERNAME, limit: 1 },
            }),
        });
        if (!res.ok) return null;

        const data = await res.json();
        return data?.data?.recentAcSubmissionList?.[0]?.title ?? null;
    } catch {
        return null;
    }
}

async function getCodeforcesLastSubmission(): Promise<string | null> {
    try {
        const res = await fetch(
            `https://codeforces.com/api/user.status?handle=${CODEFORCES_HANDLE}&from=1&count=1`
        );
        if (!res.ok) return null;

        const data = await res.json();
        if (data.status !== 'OK') return null;

        const problem = data?.result?.[0]?.problem;
        if (!problem) return null;

        return `${problem.index}. ${problem.name}`;
    } catch {
        return null;
    }
}

export const GET: APIRoute = async () => {
    const [github, leetcode, codeforces] = await Promise.allSettled([
        getGitHubLastCommit(),
        getLeetCodeLastSubmission(),
        getCodeforcesLastSubmission(),
    ]);

    const payload = {
        github: github.status === 'fulfilled' ? github.value : null,
        leetcode: leetcode.status === 'fulfilled' ? leetcode.value : null,
        codeforces: codeforces.status === 'fulfilled' ? codeforces.value : null,
    };

    return new Response(JSON.stringify(payload), {
        headers: { 'Content-Type': 'application/json' },
    });
};
