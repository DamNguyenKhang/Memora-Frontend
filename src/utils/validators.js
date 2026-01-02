export const isValidEmail = (email) => {
    if (!email) return false;

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    return regex.test(email);
};

export const isValidUsername = (username) => {
    if (!username) return false;
    const regex = /^[a-zA-Z0-9_]{6,20}$/;
    return regex.test(username);
}

export const isValidPassword = (password) => {
    if (!password) return false;
    const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;
    return regex.test(password);
}
