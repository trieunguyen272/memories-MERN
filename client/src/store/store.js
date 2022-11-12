import { legacy_createStore as createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import reducers from "../reducers";

// convert object to string and store in localStorage
function saveToLocalStorage(state) {
    try {
        const newPosts = JSON.stringify(state);
        localStorage.setItem("new Posts", newPosts);
    } catch (e) {
        console.log(e);
    }
}

// load string from localStarage and convert into an Object
// invalid output must be undefined
function loadFromLocalStorage() {
    try {
        const newPosts = localStorage.getItem("new Posts");
        if (newPosts === null) return undefined;
        return JSON.parse(newPosts);
    } catch (e) {
        console.log(e);
        return undefined;
    }
}

// create our store from our rootReducers and use loadFromLocalStorage
// to overwrite any values that we already have saved
const store = createStore(reducers, loadFromLocalStorage(), compose(applyMiddleware(thunk)));

// listen for store changes and use saveToLocalStorage to
// save them to localStorage
store.subscribe(() => saveToLocalStorage(store.getState()));

export default store;