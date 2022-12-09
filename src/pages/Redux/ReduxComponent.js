import { useEffect } from "react";
import { UserAPI } from "../../api/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { charactersActions } from "../../redux/actions/charactersActions";
import store from "../../redux/store";
import charactersReducer from "../../redux/reducers/charactersReducer";

const ReduxComponent =()=>{
    const dispatch = useDispatch();
    const characters = useSelector(store => store.charactersReducer.characters)
    useEffect(()=>{
        UserAPI.getCharacters("123")
            .then(res => {
                dispatch(charactersActions.setCharacters(res.data.results))
                // dispatch({type: 'SET_CHARACTERS', payload: res.data.results})

            })
    },[])

    console.log('characters', characters)
    return(
        <>
            <h1>Redux</h1>
            {characters?.length>0 && characters.map((c,i) => (
                    <div key={c+i}>
                        <p>{c.name}</p>
                        <img style={{width: '100px'}} src={c.image} alt=""/>
                    </div>
                ))
            }
        </>

    )

}
export default ReduxComponent;
