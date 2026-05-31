async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

function getUsers() {
    const usersStr = localStorage.getItem('geoguessr_users');
    return usersStr ? JSON.parse(usersStr) : [];
}

export async function registerUser(username, password) {
    if (password.length < 8) {
        return { success: false, error: 'Password must be at least 8 characters long.' };
    }
    
    if (!username || username.trim().length === 0) {
        return { success: false, error: 'Username cannot be empty.' };
    }

    const users = getUsers();
    const existingUser = users.find(u => u.username.toLowerCase() === username.toLowerCase());
    
    if (existingUser) {
        return { success: false, error: 'Username already taken. Please choose another one.' };
    }

    const passwordHash = await hashPassword(password);
    users.push({ username, passwordHash });
    localStorage.setItem('geoguessr_users', JSON.stringify(users));
    
    localStorage.setItem('geoguessr_current_user', JSON.stringify({ username }));
    return { success: true, username };
}

export async function loginUser(username, password) {
    const users = getUsers();
    const user = users.find(u => u.username.toLowerCase() === username.toLowerCase());

    if (!user) {
        return { success: false, error: 'User not found.' };
    }

    const passwordHash = await hashPassword(password);
    if (user.passwordHash !== passwordHash) {
        return { success: false, error: 'Incorrect password.' };
    }

    localStorage.setItem('geoguessr_current_user', JSON.stringify({ username: user.username }));
    return { success: true, username: user.username };
}

export function getCurrentUser() {
    const userStr = localStorage.getItem('geoguessr_current_user');
    return userStr ? JSON.parse(userStr) : null;
}

export function logoutUser() {
    localStorage.removeItem('geoguessr_current_user');
}
