import { AxiosResponse } from "axios";
import { API } from "@/shared/configs/axios";
import { useBookStore } from "../stores/useBookStore";

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
        const system_content = JSON.stringify(body.message);
        console.log(system_content)
        const { data } = (await API.post(
            "https://api.openai.com/v1/chat/completions",
            {
                model: "gpt-3.5-turbo",
                messages: [ // 여기에서 messages로 수정
                    {
                        role: "system",
                        content: "You are a creative and fun fairy tale writer's helper for children. It helps to create a story of the current scene by writing hints based on the current situation (character name, dialogue, image) and what you have written so far in the fairy tale. The hints should reflect the atmosphere and images in the fairy tale and stimulate a child's imagination. The lines consist of one sentence. They should be written in Korean.\
                            Observe the images provided and add short ideas that fit your character's personality and emotions by reflecting what has been going on. For example, if the story is like this:\
                            Hyun-soo: I'm so happy.\"\
                            Yoon-soo: Why are you happy?\
                            Hyun-soo: Today is the day to go play!\
                            [Image: Theme Park Background Image]\
                            When written as in the above script, write the following hints:\
                            Yoon-soo: Oh, it looks fun! What kind of rides are you going to go on?'\
                            Reflect on various emotions (joy, sadness, surprise, etc.) and situations (adventure, discovery, conflict, etc.) and continue the interest of the story with sentences that children can easily understand. Also write one sentence about the character."
                    },
                    {
                        role: "user",
                        content: system_content,
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