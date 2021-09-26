import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {RootState} from "./store";
import axios from 'axios'
const initialState = {
    page: 1,
    category: 0,
    loading: false,
    categories: [],
    data: [] as any,
};

export const loadCategories = createAsyncThunk(
    'fetchCategories',
    async () => {
        const { data } = await axios.get("https://api.thecatapi.com/v1/categories")
        return data
    }
)
export const loadData = createAsyncThunk(
    'fetchData',
    async (arg, {getState}) => {
        const state: any = getState()
        const url = `https://api.thecatapi.com/v1/images/search?limit=10&page=${state.data.page}&category_ids=${state.data.category || ''}`
        const { data } = await axios.get(url)
        return data
    }
)
export const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        loadMore: (state) => {
            state.page += 1
        },
        setCategory: (state, {payload}) => {
            state.page = 1
            state.data = []
            state.category = payload
        },
        addData: (state, {payload}) => {
            //todo
            state.data = [...state.data, ...payload]
        }
    },
    extraReducers: (builder => {
        builder
            .addCase(loadCategories.pending, (state => {
                state.loading = true
            }))
            .addCase(loadCategories.fulfilled, (state, action: any) => {
                state.categories = action.payload
                state.loading = false
            })
        builder
            .addCase(loadData.pending, (state => {
                state.loading = true
            }))
            .addCase(loadData.fulfilled, (state, { payload }) => {
                const data = [...state.data, ...payload]
                state.data = data.map(({id, url}) => ({id, url}))
                state.loading = false
            })
    })
})

export const { loadMore, setCategory, addData } = dataSlice.actions

export const getLoading = (state: RootState) => state.data.loading;
export const getPage = (state: RootState) => state.data.page;
export const getCategory = (state: RootState) => state.data.category;
export const getCategories = (state: RootState) => state.data.categories;
export const getData = (state: RootState) => state.data.data;

export default dataSlice.reducer
