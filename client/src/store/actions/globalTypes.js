export const GLOBALTYPES = {
    LOGIN_START: "LOGIN_START",
    LOGIN_SUCCESS: "LOGIN_SUCCESS",
    LOGIN_FAILURE: "LOGIN_FAILURE",
    LOGOUT: "LOGOUT",
    GET_TOKEN: "GET_TOKEN",
    ALERT: "ALERT",
};

export const EditData = (data, id, post) => {
    const newData = data.map((item) => (item._id === id ? post : item));
    return newData;
};

export const DeleteData = (data, id) => {
    const newData = data.filter((item) => item._id !== id);
    return newData;
};
