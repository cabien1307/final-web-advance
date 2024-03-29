import { GLOBALTYPES } from "../actions/globalTypes";

const token = "";

const tokenReducer = (state = token, action) => {
    switch (action.type) {
        case GLOBALTYPES.GET_TOKEN:
            return action.payload;
        default:
            return state;
    }
};

export default tokenReducer;
