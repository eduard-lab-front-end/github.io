import axios from "axios";

const Endpoints = {
    CHARACTER: "character",
}

const instance = axios.create({
    baseURL: "https://rickandmortyapi.com/api/",
    headers: {
        "Content-Type": "application/json",
    },
});
const tokenInstance =(token)=> axios.create({
    baseURL: "https://rickandmortyapi.com/api/",
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
    },
});


export const UserAPI = {
    getCharacters(){
        return instance.get(Endpoints.CHARACTER)
    },
}

