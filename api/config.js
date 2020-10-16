module.exports = {
    bcryptSalt: process.env.BCRYPT_SALT || 6,
    jwtSecret: process.env.JWT_SECRET || 'websprintsecret'
}