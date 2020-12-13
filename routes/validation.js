// validation
const Joi =require('@hapi/joi');

//Register validation
const RegisterValidation = (newUser) => {
    const Schema = Joi.object({
        name: Joi.string().min(5).required(),
        type: Joi.string().min(4).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required(),
    });
    
   return Schema.validate(newUser);
}
//Register validation
const LoginValidation = (newUser) => {
    const Schema = Joi.object({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required(),
    });
    
   return Schema.validate(newUser);
}
module.exports.RegisterValidation = RegisterValidation;
module.exports.LoginValidation = LoginValidation;
