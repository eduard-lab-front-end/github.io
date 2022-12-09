export const charactersActionsTypes= {
    SET_CHARACTERS: 'SET_CHARACTERS',
}

export const charactersActions={
    setCharacters: (characters)=>({type: charactersActionsTypes.SET_CHARACTERS, characters})
}
