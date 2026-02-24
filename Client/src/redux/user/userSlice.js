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
  token: localStorage.getItem("token") || null,
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
      state.token = action.payload.token; // Store token from response
      state.loading = false;
      state.error = null;
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", action.payload.token); // Persist token
    },

    signInFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    signOut: (state) => {
      state.currentUser = null;
      state.token = null;
      state.error = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
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
  },
});

export const {
  signInStart,
  signInSuccess,
  signInFailure,
  signOut,
  updateStart,
  updateSuccess,
  updateFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
} = userSlice.actions;

export default userSlice.reducer;
