import { createSlice, configureStore } from '@reduxjs/toolkit';

const initialState = {
    isLoggedIn:false
}

const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        onLogin(state) {
            state.isLoggedIn = true;
        }
    }
})

const Store = configureStore({
    reducer: { login: loginSlice.reducer }
});

export const loginActions = loginSlice.actions;

export default Store;