const LEADERBOARD_KEY_PREFIX = 'geoguessr_leaderboard_';

export function getLeaderboard(mapTitle) {
    const key = `${LEADERBOARD_KEY_PREFIX}${mapTitle.toLowerCase()}`;
    const dataStr = localStorage.getItem(key);
    if (!dataStr) return [];

    try {
        return JSON.parse(dataStr);
    } catch (e) {
        return [];
    }
}

export function saveScore(mapTitle, username, score, time) {
    const key = `${LEADERBOARD_KEY_PREFIX}${mapTitle.toLowerCase()}`;
    let leaderboard = getLeaderboard(mapTitle);

    const finalUsername = username || 'Guest';
    
    const existingIndex = leaderboard.findIndex(entry => entry.username === finalUsername);
    
    if (existingIndex !== -1) {
        const existing = leaderboard[existingIndex];
        if (score > existing.score || (score === existing.score && time < existing.time)) {
            leaderboard[existingIndex] = {
                username: finalUsername,
                score: score,
                time: time,
                date: new Date().toISOString()
            };
        }
    } else {
        leaderboard.push({
            username: finalUsername,
            score: score,
            time: time,
            date: new Date().toISOString()
        });
    }

    leaderboard.sort((a, b) => {
        if (b.score !== a.score) {
            return b.score - a.score;
        }
        return a.time - b.time;
    });

    leaderboard = leaderboard.slice(0, 10);

    localStorage.setItem(key, JSON.stringify(leaderboard));
    return leaderboard;
}
