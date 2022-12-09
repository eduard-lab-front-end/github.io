import { combineReducers, createStore } from "redux";
import charactersReducer from "./reducers/charactersReducer";
import { composeWithDevToolsDevelopmentOnly } from "@redux-devtools/extension";

const rootReducer = combineReducers({
    // characters: characters
    charactersReducer
})


const composeEnhancers = composeWithDevToolsDevelopmentOnly({
    trace: true,
    traceLimit: 25,
});

const store = createStore(
    rootReducer,
    composeEnhancers()
);


export default store;
