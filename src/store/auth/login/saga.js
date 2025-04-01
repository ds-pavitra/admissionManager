import { takeEvery, fork, put, all, call } from 'redux-saga/effects';

// Login Redux States
import { CHECK_LOGIN, LOGOUT_USER, VERIFY_EMAIL } from './actionTypes';
import { apiError, loginUserSuccessful, logoutUserSuccess, verifyEmailSuccess, verifyEmailFailure } from './actions';

import { apiBaseUrl, apiRequestAsync } from "../../../common/data/userData";

const loginUrl = `${apiBaseUrl}/login`;
const verifyEmailUrl = `${apiBaseUrl}/email/check`;

// Verify Email Saga
function* verifyEmail({ payload: { email, callback } }) {
    try {
        const response = yield call(apiRequestAsync, 'POST', verifyEmailUrl, { email });

        if (response.status === 200) {
            yield put(verifyEmailSuccess());
            callback(); // Proceed to show password input on success
        } else {
            yield put(verifyEmailFailure(response.message || "Email verification failed."));
        }
    } catch (error) {
        yield put(verifyEmailFailure(error.message || "Error verifying email."));
    }
}

function* loginUser({ payload: { user, history } }) {
    try {
        const response = yield call(apiRequestAsync, 'POST', loginUrl, { email: user.email, password: user.password });

        if (response.status === 200) {
            localStorage.setItem("authUser", JSON.stringify(response));
            yield put(loginUserSuccessful(response));
            history('/dashboard');
        } else {
            yield put(apiError(response.message || "Login failed."));
        }
    } catch (error) {
        yield put(apiError(error.message || "Error during login."));
    }
}

function* logoutUser({ payload: { history } }) {
    try {
        localStorage.removeItem("authUser");
        yield put(logoutUserSuccess());
        history('/login');
    } catch (error) {
        yield put(apiError(error.message || "Logout failed."));
    }
}

export function* watchVerifyEmail() {
    yield takeEvery(VERIFY_EMAIL, verifyEmail);
}

export function* watchUserLogin() {
    yield takeEvery(CHECK_LOGIN, loginUser);
}

export function* watchUserLogout() {
    yield takeEvery(LOGOUT_USER, logoutUser);
}

function* loginSaga() {
    yield all([
        fork(watchVerifyEmail),
        fork(watchUserLogin),
        fork(watchUserLogout),
    ]);
}

export default loginSaga;
