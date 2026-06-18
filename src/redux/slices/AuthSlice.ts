import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    authState: Boolean(localStorage.getItem("isAuthenticated"))
}
const AuthSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.authState = action.payload
        }
    }
})

export const { login } = AuthSlice.actions;
export default AuthSlice.reducer;