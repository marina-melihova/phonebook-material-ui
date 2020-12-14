import {
  configureStore,
  combineReducers,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { authSlice } from "./auth";
import { contactsSlice } from "./contacts";

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["uid"],
};

const authReducer = combineReducers({
  user: authSlice.user.reducer,
  error: authSlice.error.reducer,
  uid: authSlice.uid.reducer,
  loading: authSlice.loading.reducer,
});

const authPersistedReducer = persistReducer(authPersistConfig, authReducer);

const contactsPersistConfig = {
  key: "contacts",
  storage,
  whitelist: ["collectionId"],
};

const contactsReducer = combineReducers({
  items: contactsSlice.items.reducer,
  filter: contactsSlice.filter.reducer,
  loading: contactsSlice.loading.reducer,
  error: contactsSlice.error.reducer,
  collectionId: contactsSlice.collectionId.reducer,
});

const contactsPersistedReducer = persistReducer(
  contactsPersistConfig,
  contactsReducer
);

const store = configureStore({
  reducer: {
    auth: authPersistedReducer,
    contacts: contactsPersistedReducer,
  },

  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});

const persistor = persistStore(store);

export { store, persistor };
