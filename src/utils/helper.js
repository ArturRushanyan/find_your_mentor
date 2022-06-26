
// This function return updated and validated data for request body
const prepareUserData = (body, updated_data, registrationFlow=true) => {
    body.name = updated_data.name;
    body.surname = updated_data.surname;
    body.user_type = updated_data.user_type;
    body.position = updated_data.position;
    body.working_field = updated_data.working_field;
    body.plans = updated_data.plans;
    body.email = updated_data.email;
    body.education = updated_data.education;
    body.experience = updated_data.experience;
    body.about = updated_data.about;
    
    // registrationFlow is "true" when user trying to register in system
    // registrationFlow is "false" when user is updating his personal information
    if (registrationFlow) {
        body.password = updated_data.password;
    }   

    return body;
};

// This function prepare new user information to save in db 
const prepareUserInstance = (data, hashedPassword) => {
    return {
        name: data.name,
        surname: data.surname,
        type: data.type,
        position: data.position,
        working_field: data.working_field,
        plans: data.plans,
        email: data.email,
        education: data.education,
        experience: data.experience,
        about: data.about,
        password: hashedPassword,
    };
};

// This function returns valid query parameter fields
const filterQueryParameters = (accessibleQueryKeys, reqQuery) => {
    let tmp = {}

    accessibleQueryKeys.forEach(key => {
        if (reqQuery.hasOwnProperty(key)) {
            tmp[key] = reqQuery[key]
        }
    });
    
    return tmp;
};

module.exports = {
    prepareUserData,
    filterQueryParameters,
    prepareUserInstance
};
