import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentChat: null,
    chats: [],
    messages: [],
    isLoading: false,
    error: null
};

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        setCurrentChat: (state, action) => {
            state.currentChat = action.payload;
        },
        setChats: (state, action) => {
            state.chats = action.payload;
        },
        addChat: (state, action) => {
            state.chats.unshift(action.payload);
            state.currentChat = action.payload;
        },
        setMessages: (state, action) => {
            state.messages = action.payload;
        },
        addMessage: (state, action) => {
            state.messages.push(action.payload);
        },
        clearMessages: (state) => {
            state.messages = [];
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        }
    }
});

export const {
    setCurrentChat,
    setChats,
    addChat,
    setMessages,
    addMessage,
    clearMessages,
    setLoading,
    setError
} = chatSlice.actions;

export default chatSlice.reducer;
