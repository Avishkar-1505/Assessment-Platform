const BASE_URL = "http://localhost:5000/api/v1"

export const instructorEndpoints = {
    SIGNUP_API: BASE_URL + "/instructor/signUp",
    LOGIN_API: BASE_URL + "/instructor/login",
    RESULTS_API: BASE_URL + "/instructor/getResults",
    GET_DETAILS: BASE_URL + "/instructor/getDetails"
}

export const testEndpoints = {
    CREATE_TEST_API: BASE_URL + "/test/createTest",
    DISABEL_TEST_API: BASE_URL + "/test/disableTest",
    ENABLE_TEST_API: BASE_URL + "/test/enableTest",
    GET_TEST_API: BASE_URL + "/test/getTest"
}

export const studentEndpoints = {
    START_TEST_API: BASE_URL + "/student/startTest",
    SUBMIT_TEST_API: BASE_URL + "/student/submitTest"
}

export const submissionEndpoints = {
    RUN_TEST_API: BASE_URL + "/submission/runTest",
    SUBMISSION_API: BASE_URL + "/submission/createSubmission",
    UPDATE_SUBMISSIONS_API: BASE_URL + "/submission/updateSubmissions"
}

export const questionEndpoints = {
    CREATE_QUE_API: BASE_URL + "/question/createQuestion",
    ADD_QUE_API: BASE_URL + "/question/addQuestion",
    UPDATE_QUE_API: BASE_URL + "/question/updateQuestion",
    GETALL_API: BASE_URL + "/question/getAllQuestions"
}