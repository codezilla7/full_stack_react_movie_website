import { createContext, useReducer, useEffect } from "react";

export const AuthContext = createContext();

export const AuthReducers = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { user: action.payload }
        case 'LOGOUT':
            return { user: null }
        default:
            return state
    }
}


export const AuthContextProvider = ({ children }) => {
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'))

        if (user) {
            dispatch({ type: 'LOGIN', payload: user })
        }
    }, [])

    const [state, dispatch] = useReducer(AuthReducers, {
        user: null
    })


    console.log(state,"state CR")
    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    )
}

