const isSuccessResponse = (response) => {
    return response.code >= 200 && response.code < 300;
};

export default isSuccessResponse;