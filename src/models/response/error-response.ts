export type ErrorResponseEntity = {
  url: string;
  status: number;
  statusText: string;
  body: {
    date: string;
    code: string;
    message: string;
    data: null;
    path: string;
    requestId: string;
    version: string;
    detail?: string;
  };
  request: {
    method: string;
    url: string;
    body: {
      email: string;
    };
    mediaType: string;
  };
  name: string;
};
