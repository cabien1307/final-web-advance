import { FACULTY_TYPES } from "../actions/facultyAction";

const initialState = {
    loading: false,
    faculties: [],
};

const facultyReducer = (state = initialState, action) => {
    switch (action.type) {
        case FACULTY_TYPES.GET_FACULTY:
            return {
                ...state,
                faculties: action.payload,
            };
        default:
            return state;
    }
};  

export default facultyReducer;
