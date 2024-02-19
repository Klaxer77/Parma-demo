import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { $profile } from '../../../Api/http'; 


$profile.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access');
    if (token) {
      config.headers.Authorization = `JWT ${token}`;
    }
    return config;
  }
);

// email

export const fetchChangeEmail = createAsyncThunk(
  'changeEmail',
  async (email, {rejectWithValue}) => {
    try {
      const response = await $profile.post('change-email/', email);
    return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.error);
    }
  }
);

export const fetchConfirmEmail = createAsyncThunk(
  'confirmEmail',
  async (confirmation_code, {rejectWithValue}) => {
    try {
      const response = await $profile.post('confirm-email/', confirmation_code);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.error)
    }
  }
);

// phone

export const fetchChangePhone = createAsyncThunk(
  'changePhone',
  async (phone, {rejectWithValue}) => {
    try {
      const response = await $profile.post('change-phone/', phone);
    return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.error);
    }
  }
);

export const fetchConfirmPhone = createAsyncThunk(
  'confirmPhone',
  async (confirmation_code, {rejectWithValue}) => {
    try {
      const response = await $profile.post('confirm-phone/', confirmation_code);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.error)
    }
  }
);



const initialState = {
  verificationCodes: ['', '', '', '', '', ''],
  loadingChangeEmail: false,
  loadingConfirmEmail: false,
  showCode: false,
  errorsChangeEmail: null,
  errorsConfirmEmail: null,
  messageEmail: null,
  messagePhone: null,
  messageCompleted: {},
}

export const VerificationCode = createSlice({
  name: 'verificationCode',
  initialState,
  reducers: {
    setShowCode: (state, action) => {
      state.showCode = action.payload
    },
    setVerificationCodes: (state, action) => {
      state.verificationCodes = action.payload
    },
  },
  extraReducers: (builder) => {
    // email
    builder.addCase(fetchChangeEmail.pending, (state) => {
      state.loadingChangeEmail = true;
    })
    builder.addCase(fetchChangeEmail.fulfilled, (state, action) => {
      state.loadingChangeEmail = false;
      state.showCode = true;
      state.messageEmail = action.payload;
      state.errorsChangeEmail = null;
      state.messageCompleted = {}
    })
    builder.addCase(fetchChangeEmail.rejected, (state, action) => {
      state.errorsChangeEmail = action.payload;
      state.loadingChangeEmail = false;
    })


    builder.addCase(fetchConfirmEmail.pending, (state) => {
      state.loadingConfirmEmail = true;
    })
    builder.addCase(fetchConfirmEmail.fulfilled, (state, action) => {
      state.loadingConfirmEmail = false;
      state.showCode = false;
      state.messageCompleted = action.payload;
    })
    builder.addCase(fetchConfirmEmail.rejected, (state, action) => {
      state.errorsConfirmEmail = action.payload;
      state.loadingConfirmEmail = false;
      state.verificationCodes = ['', '', '', '', '', '']
    })

    // phone

    builder.addCase(fetchChangePhone.pending, (state) => {
      state.loadingChangeEmail = true;
    })
    builder.addCase(fetchChangePhone.fulfilled, (state, action) => {
      state.loadingChangeEmail = false;
      state.showCode = true;
      state.messagePhone = action.payload;
      state.errorsChangeEmail = null;
      state.messageCompleted = {}
    })
    builder.addCase(fetchChangePhone.rejected, (state, action) => {
      state.errorsChangeEmail = action.payload;
      state.loadingChangeEmail = false;
    })


    builder.addCase(fetchConfirmPhone.pending, (state) => {
      state.loadingConfirmEmail = true;
    })
    builder.addCase(fetchConfirmPhone.fulfilled, (state, action) => {
      state.loadingConfirmEmail = false;
      state.showCode = false;
      state.messageCompleted = action.payload;
    })
    builder.addCase(fetchConfirmPhone.rejected, (state, action) => {
      state.errorsConfirmEmail = action.payload;
      state.loadingConfirmEmail = false;
      state.verificationCodes = ['', '', '', '', '', '']
    })
  },
})

export const { setShowCode, setVerificationCodes } = VerificationCode.actions

export default VerificationCode.reducer