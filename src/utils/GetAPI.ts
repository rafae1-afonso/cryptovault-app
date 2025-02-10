import axios, { AxiosResponse } from "axios";

const getAPIMethod: (apiUrl: string) => Promise<AxiosResponse<any, any> | undefined> = async (apiUrl) => {
    try {
        const response = await axios.get(apiUrl, {
            headers: {
                Accept: 'application/json',
                'X-API-KEY': import.meta.env.VITE_API_KEY
            }
        })
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export default getAPIMethod;