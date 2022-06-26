const Authentication = require('./authentication/authentication');
const User  = require('./user/user')

const indexRoutes = (app) => {
    app.use('/api/v1/auth', Authentication);
    app.use('/api/v1/users', User);
};
 
module.exports = indexRoutes;