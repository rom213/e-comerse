import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { productts } from '../../utils/interfase';

interface InitialState {
    todoCard: productts[];  
  }       
  
  const init: InitialState  =  {
    todoCard: [],
  }

export const todoSlice = createSlice({
    name: 'todo',
    initialState: init,
    reducers: {
        setupdate: (state, action:PayloadAction<productts>) => {
            return {
                // Return a copy of the array and SHOULD update the state array here "immutably"
                ...state,
                todoCard: [
                    ...state.todoCard,
                    action.payload
                ]
            }
        }
    }
})

export const { setupdate } = todoSlice.actions

export default todoSlice.reducer

