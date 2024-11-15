import { AxiosResponse } from "axios";
import { API, setAccess, storeAccess } from "@/shared";

export const BookService = () => {

    const record = async (body: Book.BookRecordReq) => {
        const { data } = (await API.post(
            "https://naveropenapi.apigw.ntruss.com/recog/v1/stt?lang=Eng", 
            body, {
            headers: {
                'Content-Type': 'application/octet-stream',
                'X-NCP-APIGW-API-KEY-ID': import.meta.env.VITE_CLOVA_CLIENT_ID,
                'X-NCP-APIGW-API-KEY': import.meta.env.VITE_CLOVA_CLIENT_SECRET
            }}
        )) as AxiosResponse<Book.BookRecordRes>;
        return data;
    };

    return { record };
};