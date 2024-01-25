import { AxiosResponse } from "axios";

export const axiosWrapper = async (
  axiosPromise: Promise<AxiosResponse<any>>,
) => {
  try {
    const response = await axiosPromise;
    console.log(JSON.stringify(response.headers));
    return { data: response.data, error: null };
  } catch (error: any) {
    const status = error.response ? error.response.status : null;
    const errorMessage = error.message || "An error occurred";
    return { data: null, error: { status, message: errorMessage } };
  }
};
