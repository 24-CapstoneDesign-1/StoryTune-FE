import { AxiosResponse } from "axios";
import { API } from "@/shared/configs/axios";

export const BookService = () => {

    const record = async (body: Book.BookRecordReq) => {
        const { data } = (await API.post(
            "/api/character",
            body
        )) as AxiosResponse<User.SignUpResDto>;
        console.log('data: ', data);
        return data;
    };

    return { record };
};