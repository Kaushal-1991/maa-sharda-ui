import { createSlice } from "@reduxjs/toolkit";

const storedToken = localStorage.getItem('token');

const jwtSlice = createSlice({
     name :'jwt',
     initialState: storedToken ?? '',
     reducers:{
          setJwt:(state,action)=>{
            localStorage.setItem('token',action.payload as string);
            state = action.payload;
            return state;
          },
          removeJwt:(state)=>{
            localStorage.removeItem('token');
            return '';
          }
     }
});

export const {setJwt,removeJwt} = jwtSlice.actions;
export default jwtSlice.reducer;
