import { configureStore } from "@reduxjs/toolkit";
import employeeReducer from "./reducer/employeeReducer";
import createSagaMiddleware from "redux-saga";
import employeeSaga from "./redux-sagas/employeeApiSaga";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    employees: employeeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(employeeSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
