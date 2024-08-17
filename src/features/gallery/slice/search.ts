import { createSlice } from "@reduxjs/toolkit";

interface IInitialStateType { 
    isSearching: boolean
    text: string | null;
    type: "photos" | 'album'
}

const initialState:IInitialStateType = {
    isSearching: false,
    text: null,
    type:"photos",
};


const search = createSlice({
    name: "search",
    initialState,
    reducers: {
        searchActive: (state) => { 
            state.isSearching = true;
        },
        searchInActive: (state) => { 
            state.isSearching = false;
        },
        setSearchText: (state, action) => { 
            state.text = action.payload;
        },
        setPhotosType: (state) => { 
            state.type = "photos";
        },
        setAlbumType: (state) => { 
            state.type = "album";
        }
    }
});


export const {
    searchActive,
    searchInActive,
    setSearchText,
    setPhotosType,
    setAlbumType
} = search.actions;
export default search.reducer;