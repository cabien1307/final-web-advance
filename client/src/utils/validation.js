export const isEmpty = (value) => {
    if (!value) return true;
    return false;
};

export const isEmail = (value) => {
    const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(value).toLowerCase());
};

export const isLength = (pwd) => {
    if (pwd.length < 6 || pwd.length > 20) return true;
    return false;
};

export const isMatch = (pwd, cf_pwd) => {
    if (pwd === cf_pwd) {
        return true;
    }
    return false;
};

export const isId = (id) => {
    const regexId = /^.{24,24}$/;
    return regexId.test(id);
};

export const matchYoutubeUrl = (url) => {
    var p =
        /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    return url.match(p) ? RegExp.$1 : false;
};
