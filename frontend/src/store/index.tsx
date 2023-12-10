import { configureStore, createSlice } from "@reduxjs/toolkit";

const INITIAL_ITEMS_STATE = [{ id: 1, name: "Loading...", isDone: false }];

const taskSlice = createSlice({
  name: "tasks",
  initialState: INITIAL_ITEMS_STATE,
  reducers: {
    addItem(state, action) {
      const name = action.payload;
      const newItem = {
        id: Math.random(), // do zmiany na lososwe id
        name,
        isDone: false,
      };
      state.push(newItem);
    },
    removeItem(state, action) {
      const itemId = action.payload;
      const newState = state.filter((task) => {
        return task.id !== itemId;
      });
      state = newState;
      return state;
    },
    toggleDone(state, action) {
      const itemId = action.payload;

      const newState = state.map((obj) => {
        if (obj.id === itemId) {
          const currIsDone = obj.isDone;
          return { ...obj, isDone: !currIsDone };
        }

        return obj;
      });

      state = newState;
      return state;
    },
  },
});

const reducer = {
  tasks: taskSlice.reducer,
};

const store = configureStore({
  reducer: reducer,
});

export default store;
export const taskActions = taskSlice.actions;
