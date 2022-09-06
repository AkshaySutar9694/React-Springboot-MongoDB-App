import { put, takeEvery, call } from "redux-saga/effects";
import {
  deleteEmployeeByIdApi,
  getAllEmployeesAPi,
  getEmployeeByIdAPi,
  saveRecordsApi,
  updateEmployeeByIdApi,
} from "../employeeApis/apis";
import { Employee } from "../types";
import { sagaActions } from "./employeeSagaActions";
import { fetchAndStore } from "../reducer/employeeReducer";

export function* getAllEmployees() {
  try {
    let results: Array<Employee> = yield call(async () => {
      let callResult = await getAllEmployeesAPi();
      return callResult;
    });
    yield put(fetchAndStore(results));
  } catch (error) {
    console.error(error);
  }
}

export function* getEmployeeById(payload: any) {
  try {
    let results: Array<Employee> = yield call(async () => {
      let callResult = await getEmployeeByIdAPi(payload.idObj.id);
      return [callResult];
    });
    yield put(fetchAndStore(results));
  } catch (error) {
    console.error(error);
  }
}

export function* updateRecords(payload: any) {
  try {
    let results: Array<Employee> = yield call(async () => {
      let callResult = await updateEmployeeByIdApi(payload.empObj);
      return callResult;
    });
    if (results != null) {
      let results: Array<Employee> = yield call(async () => {
        let callResult = await getAllEmployeesAPi();
        return callResult;
      });
      yield put(fetchAndStore(results));
    }
  } catch (error) {}
}

export function* saveRecords(payload: any) {
  try {
    let results: Array<Employee> = yield call(async () => {
      let callResult = await saveRecordsApi(payload.empArray);
      return callResult;
    });
    if (results != null) {
      let results: Array<Employee> = yield call(async () => {
        let callResult = await getAllEmployeesAPi();
        return callResult;
      });
      yield put(fetchAndStore(results));
    }
  } catch (error) {}
}

export function* deleteRecord(payload: any) {
  try {
    let results: Array<Employee> = yield call(async () => {
      let callResult = await deleteEmployeeByIdApi(payload.empObj);
      return callResult;
    });
    if (results != null) {
      let results: Array<Employee> = yield call(async () => {
        let callResult = await getAllEmployeesAPi();
        return callResult;
      });
      yield put(fetchAndStore(results));
    }
  } catch (error) {}
}

export default function* employeeSaga() {
  yield takeEvery(sagaActions.FETCH_ALL_EMPLOYEES, getAllEmployees);
  yield takeEvery(sagaActions.SEARCH_EMPLOYEES_BY_ID, getEmployeeById);
  yield takeEvery(sagaActions.UPDATE_RECORD, updateRecords);
  yield takeEvery(sagaActions.SAVE_RECORDS, saveRecords);
  yield takeEvery(sagaActions.DELETE_RECORD, deleteRecord);
}
