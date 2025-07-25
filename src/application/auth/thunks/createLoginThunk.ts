import { createAsyncThunk } from "@reduxjs/toolkit";

import { Login } from "../../../domain/auth/auth.contracts";
import { AuthPayload } from "@/domain/auth/auth.payload";
import { AppErrorProps } from "@/shared/errors/types";
import {
  clearUserState,
  setCurrentUser,
} from "@/application/user/slices/userSlice";
import { setAuthenticated, setAuthInitializing } from "../slices/authSlice";
import { handleThunkError } from "@/shared/utils/handleThunkError";
import { GetCurrentUser } from "@/domain/user/user.contracts";

export const createLoginThunk = (
  login: Login,
  getCurrentUser: GetCurrentUser
) =>
  createAsyncThunk<void, AuthPayload, { rejectValue: AppErrorProps }>(
    "auth/login",
    async (payload, { dispatch, rejectWithValue }) => {
      dispatch(setAuthInitializing(true));
      try {
        await login(payload);
        const user = await getCurrentUser();
        dispatch(setCurrentUser(user));
        dispatch(setAuthenticated(true));
      } catch (error) {
        dispatch(setAuthenticated(false));
        dispatch(clearUserState());
        return handleThunkError(error, rejectWithValue);
      } finally {
        dispatch(setAuthInitializing(false));
      }
    }
  );
