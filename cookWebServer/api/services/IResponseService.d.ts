interface IResponseService {
    invalidParameters(response, parameters: any);
    success(response, data?, message?: string);
    forbidden(response, error);
    failed(response, error);
    notFound(response, error);
    error(response, error);
}
