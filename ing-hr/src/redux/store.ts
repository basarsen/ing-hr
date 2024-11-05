import { configureStore } from '@reduxjs/toolkit';
import appSettings from './app.slice';

export const store = configureStore({
    reducer: { appSettings }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;