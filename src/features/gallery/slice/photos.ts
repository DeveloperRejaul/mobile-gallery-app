import { createSlice } from "@reduxjs/toolkit";
import { IParamsType } from "@/src/features/gallery/types";
import { debounce } from "@/src/core/utils/redux";

interface IInitialStateType { 
    photos: IParamsType[]
} 

const initialState:IInitialStateType = {
   photos: []  
};


const photos = createSlice({
    name: "photos",
    initialState,
    reducers: {
        addPhotos: (state, action) => {
            state.photos.push(...action.payload)
        },
        removePhotos: (state, action) => {
            state.photos = state.photos.filter((item) => !action.payload.includes(item.id))
        },
    }
});

export const { addPhotos, removePhotos } = photos.actions;
export default photos.reducer;