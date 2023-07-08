/* eslint-disable no-unused-vars */
import AsyncSlice from "../helper/AsyncSlice";

const photo = AsyncSlice({
    name: 'photo',
    initialState: {
        list: [],
        page: 0,
        infinite: true,
    },
    fetchConfig: (page = 1) => ({
        url: `https:dogsapi.origamid.dev/json/api/photo/?_page=${page}&_total=4`,
        options: {
            method: "GET",
            cache: "no-store",
        },
    }),
    reducers: {
        addPhoto: (state, action) => {
            state.list.push(...action.payload);
            state.page++;   
            if(action.payload.length === 0) state.infinite = false;
        },
        removePhoto: (state) => {
            state.list = [];
            state.page = 0;
            state.infinite = true;
            state.data = null;
        },
    },
});

const photoGet = photo.asyncAction;
const {addPhoto} = photo.actions;
export const {removePhoto} = photo.actions;

export default photo.reducer;

export const loadNewPhotos = (page) => async (dispatch) => {
    const {payload} = await dispatch(photoGet(page));
    dispatch(addPhoto(payload));

};