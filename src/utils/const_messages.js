// MESSAGES
module.exports = {
    MISSING_USER_ID: 'Missing user\'s id',
    VALIDATION_ERROR: 'Couldn\'t pass validation',
    SOMETHING_WENT_WRONG: 'Something went wrong',
    PASSWORDS_NOT_MATCH: 'Passwords must be the same',
    MISSING_TOKEN: 'Missing Auth token',
    CANNOT_FIND_USER: 'Can not find user',
    ALREADY_EXISTS: resource => `${resource} already exists`,
    NOT_EXISTS: resource => `${resource} doesn't exist!`,
    ALREADY_EXISTS_WITH_THIS_EMAIL: resource => `User already exists with this email address ${resource}`,
    CANNOT_FIND_USER_BY_ID: id => `Cannot find user by ${id} id`
};
