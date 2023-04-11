export const getLocalAccessToken = () => {
    const token = JSON.parse(localStorage.getItem("token"))
    return token;
}

export const getLocalRefreshToken = () => {
    const refreshToken = JSON.parse(localStorage.getItem("refreshToken"))
    return refreshToken;
}