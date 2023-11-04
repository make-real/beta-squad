import { createSlice } from "@reduxjs/toolkit";

const initialState = {
selectTagId:{},
};

export const TagId = createSlice({
    name: "TagId",
    initialState,
    reducers: {
        selectTag: (state, { payload }) => {
            if(payload){
                state.selectTagId = payload;
            }else{
                state.selectTagId ={};
            }
      
        },
    },
});

export const {  selectTag, } = TagId.actions;

export default TagId.reducer;
