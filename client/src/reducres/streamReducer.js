import _ from 'lodash'
import {
    CREATE_STREAM,
    FETCH_STREAMS,
    FETCH_STREAM,
    EDIT_STREAM,
    DELETE_STREAM
} from '../actions/types';

export default (state= {}, action) => {
    switch(action.type) {
        case FETCH_STREAMS:
            return {...state, ..._.mapKeys(action.payload, 'id')} //'action.payload'the list of streams that get back from api and create object out of it using 'mapKeys' and has an 'id' in it ==> and the keys inside that obj  is the id of the individual streams themselves
        case FETCH_STREAM:
            return {...state, [action.payload.id]: action.payload };
        
        case CREATE_STREAM:
            return {...state, [action.payload.id]: action.payload };
        case EDIT_STREAM:
            return {...state, [action.payload.id]: action.payload };
        case DELETE_STREAM:
            return _.omit(state, action.payload);
        default:
            return state;
    }
}