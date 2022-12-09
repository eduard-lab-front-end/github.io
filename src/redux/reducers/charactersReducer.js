import { charactersActionsTypes } from "../actions/charactersActions";

const initialState = {
    isLoading: false,
    characters: null,
    info: {},
    error: {}
}

const charactersReducer = (state=initialState, action)=>{
   switch(action.type){
       case charactersActionsTypes.SET_CHARACTERS:{
           return {
               ...state,
               characters: action.characters
           }
       }
       default:{
           return state
       }
   }
}
export default charactersReducer;
