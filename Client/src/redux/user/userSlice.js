// import { createSlice } from "@reduxjs/toolkit";

// let storedUser = null;

// try {
//   storedUser = JSON.parse(localStorage.getItem("user"));
// } catch (error) {
//   storedUser = null;
// }

// const initialState = {
//   currentUser: storedUser,
//   error: null,
//   loading: false,
// };

// const userSlice = createSlice({
//   name: "user",
//   initialState,
//   reducers: {
//     signInStart: (state) => {
//       state.loading = true;
//       state.error = null;
//     },
//     signInSuccess: (state, action) => {
//       state.currentUser = action.payload;
//       state.loading = false;
//       state.error = null;

//       localStorage.setItem("user", JSON.stringify(action.payload));
//     },
//     signInFailure: (state, action) => {
//       state.loading = false;
//       state.error = action.payload;
//     },
//   },
// });

// export const { signInStart, signInSuccess, signInFailure } = userSlice.actions;

// export default userSlice.reducer;



import { createSlice } from "@reduxjs/toolkit";

let storedUser = null;

try {
  storedUser = JSON.parse(localStorage.getItem("user"));
} catch (error) {
  storedUser = null;
}

const initialState = {
  currentUser: storedUser,
  error: null,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
      state.error = null;
    },

    signInSuccess: (state, action) => {
      state.currentUser = action.payload.user;
      state.loading = false;
      state.error = null;
      localStorage.setItem("user", JSON.stringify(action.payload.user));
    },

    signInFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    

     updateStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    updateFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteUserStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteUserSuccess: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
      localStorage.removeItem("user");
    },
    deleteUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    signoutSuccess: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
      localStorage.removeItem("user");
    },

  },
});

export const {
  signInStart,
  signInSuccess,
  signInFailure,
  signoutSuccess,   // export it
  updateStart,
  updateSuccess,
  updateFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
} = userSlice.actions;

export default userSlice.reducer;
