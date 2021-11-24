import { useContext, createContext, useReducer } from "react";

// createContext is used to pass props easily with the <StoreContext.Provider>
const StoreContext = createContext();
// initial state is an object containing multiple informations
const initialState = {
    message: "",
    address: null,
    balance: 0,
};

//reducer for the different states of the application
const reducer = (state, action) => {
    switch(action.type) {
        case "NEW-ADDRESS":
            return {
                ...state,
                address: action.newAddress,
                message: action.message
            }
        case "SET-BALANCE":
            return {
                ...state,
                balance: action.newBalance
            }
        default:
            throw new Error(`Unkown type of action ${action.type}`);       
    }
}

//we use children to display whatever you include between the opening and closing tags 
export const StoreProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <StoreContext.Provider value={{state, dispatch}}>
            {children}
        </StoreContext.Provider>
    )
};

export const useStore = () => useContext(StoreContext);