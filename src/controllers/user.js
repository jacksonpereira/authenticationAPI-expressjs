module.exports = (app) => {
    return {
        login: app.post("/login", app.business.user.login),

        logout: app.get('/logout', app.business.user.logout),

        verify: app.get('/verify', app.business.user.verify)
    }
}