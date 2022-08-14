import { all } from "@redux-saga/core/effects";
import { rootSaga } from "./wallet/sagas";

export function* sagas() {
  yield all([rootSaga()]);
}
