import { createSlice } from "@reduxjs/toolkit";
import { IAlbumProps } from "../types";

interface IInitialStateType { 
    album: IAlbumProps[]
}

const initialState:IInitialStateType = {
    album: [],
};


const album = createSlice({
    name: "album",
    initialState,
    reducers: {
        addAlbum: (state, action) => {
            state.album.push(...action.payload)
        },
        removeAlbum: (state, action) => {
            state.album = state.album.filter((item) => !action.payload.includes(item.albumId))
        },
    }
});


export const { addAlbum, removeAlbum } = album.actions;
export default album.reducer;