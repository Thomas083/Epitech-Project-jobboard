const endpoints = {
    //CRUD advert
    CREATE_ADVERT: "/api/advert",
    GET_ALL_ADVERT: "/api/advert",
    UPDATE_ADVERT: "/api/advert/:id",
    DELETE_ADVERT: "/api/advert/:id",

    // Auth
    USER_SIGNUP: "api/auth/signup",
    USER_LOGIN: "api/auth/login",
    USER_LOGOUT: "api/auth/logout",

    //Image
    GET_ONE_IMAGE: "api/advert/image/",

    // RUD user
    GET_ONE_USER: "api/user/:id",
    GET_ALL: "api/user/",
    UPDATE_USER: "api/user/:id",
    DELETE_USER: "api/user/desactivate/:id",

    //Send Message
    SEND_MESSAGE: "api/message/:id",
    GET_ALL_MESSAGE: "api/message/allmessages",
    UPDATE_MESSAGE: "api/message/:id",
    DELETE_MESSAGE: "api/message/:id"
};

export default endpoints;