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

    const bookList = async () => {
        const { data } = (await API.get(
            "/api/book"
        )) as AxiosResponse<Book.BookListRes>;
        return data;
    };

    const help = async (body: Book.BookHelpReq) => {
        const { data } = (await API.post(
            "https://api.openai.com/v1/chat/completions",
            {
                model: "gpt-3.5-turbo",
                messages: [ // 여기에서 messages로 수정
                    {
                        role: "system",
                        content: "You are a creative and fun fairy tale writer for children. Based on your current situation (characters, lines, images) and what you have written so far in the fairy tale, write hints to continue the next scene. The hints reflect the mood and images in the fairy tale and should be able to stimulate children's imagination. Keep the dialogue simple and clear. Write them in Korean.\
                                Observe the images provided, and add short ideas that match the character's personality and emotions. For example, if the story is like this:\
                                Hyun-soo: I'm so happy\
                                Yoon-soo: Why are you happy?\
                                Hyun-soo: Today is the day to go play!\
                                [Image: theme park background image]\
                                Write the following hints:\
                                'Yoon-soo: Oh, it looks fun! What kind of rides are you going to go on?'\
                                Reflect on different emotions (joy, sadness, surprise, etc.) and situations (adventure, discovery, conflict, etc.), and continue the interest of the story with sentences that children can easily understand. Also, write one sentence about each character."
                    },
                    {
                        role: "user",
                        content: "지혜: 나는 오늘 재밌는 활동을 할거야.\
                                수은: 뭐 할거야?\
                                지혜: 나는 종이접기를 하고 있어."
                    }
                ],
                temperature: 0.3,
                max_tokens: 100,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${import.meta.env.VITE_OPENAI_SECRET_KEY}`,
                },
            }
        )) as AxiosResponse<Book.BookHelpRes>;
        return data;
    };

    return { record, bookList, help };
};