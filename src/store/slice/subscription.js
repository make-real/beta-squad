import { createSlice } from "@reduxjs/toolkit";

const initialState = {
subscriptionError:"",
subscription:false
};

export const subscription = createSlice({
    name: "subscription",
    initialState,
    reducers: {
        isSubscription: (state, { payload }) => {
            console.log(payload)
            if(payload){
                state.subscription= false;
                state.subscriptionError=payload;
            }else{
                state.subscription= true;
                state.subscriptionError="";
            }


        },
    },
});

export const {  isSubscription, } = subscription.actions;

export default subscription.reducer;
