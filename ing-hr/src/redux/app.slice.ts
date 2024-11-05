import { createSlice } from '@reduxjs/toolkit';
import dummyData from '../data.json'
import { Employee } from '../models/employee';

interface EmployeesState {
    data: Array<Employee>
    displayType: 'table' | 'grid'
}

const initialState = {
    data: dummyData,
    displayType: 'table'
} as EmployeesState

export const appSlice = createSlice({
    name: 'employeesState',
    initialState,
    reducers: {
        addEmployee(state, action) {
            state.data = state.data.concat(action.payload)
        },
        removeEmployee(state, action) {
            state.data = state.data.filter(e => e.id !== action.payload)
        },
        updateEmployee(state, action) {
            state.data = state.data.map(e => {
                if (e.id === action.payload.id)
                    return action.payload
                return e
            })
        },
        changeDisplayType(state, action) {
            state.displayType = action.payload
        }
    },
})

export const { addEmployee, removeEmployee, updateEmployee, changeDisplayType } = appSlice.actions;

export default appSlice.reducer;