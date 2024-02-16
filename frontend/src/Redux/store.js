import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { 
  persistReducer, persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import Menu  from './Menu/Menu.slice';
import Login from './Login/Login.slice';
import ProfileInfo from './Profile/ProfileInfo.slice';
import Map from './Map/Map.slice';
import MapInfoPlace from './Map/MapInfoPlace.slice';
import ActiveReselve from './Profile/ActiveReselve/ActiveReselve.slice';
import History from './Profile/HistoryReservation/History.slice';


const rootReducer = combineReducers({
  Menu, 
  Login,
  ProfileInfo,
  ActiveReselve,
  Map,
  MapInfoPlace,
  History
}) 

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['Map', 'ProfileInfo', 'Login', 'MapInfoPlace', 'ActiveReselve', 'History'], // что не хотим сохранять
};

const persistedReducer = persistReducer(persistConfig, rootReducer)
 

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store);