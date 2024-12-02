import { AxiosResponse } from "axios";
import { API, getAccess } from "@/shared/configs/axios";
import { useBookStore } from "../stores/useBookStore";

export const BookService = () => {
    const bookStore = useBookStore();

    const newMakeBook = async(body: Book.NewMakeBookReq) => {
        const { data } = (await API.post(
            "/api/mybook",
            body,
            {
                headers: {
                    "Authorization" : `Bearer ${getAccess()}`,
                }
            }
        )) as AxiosResponse<Book.NewMakeBookRes>;
        return data;
    }

    const bookImage = async ({
        myBookId,
        body
    }: { 
        myBookId: number; 
        body: FormData; 
    }) => {
        const { data } = (await API.post(
            `/api/mybook/${myBookId}/images`,
            body, // 기존의 FormData 객체를 그대로 전달
            {
                headers: {
                    // "Authorization": `Bearer ${getAccess()}`,
                    "Content-Type": "multipart/form-data",
                },
            }
        )) as AxiosResponse<Book.bookImageRes>;
        console.log('data', data);
        return data;
    };
    

    const record = async (body: Book.BookRecordReq) => {
        const { data } = (await API.post(
            "/api/character",
            body
        )) as AxiosResponse<User.SignUpResDto>;
        console.log('data: ', data);
        return data;
    };

    const recordTitle = async (body: Book.BookRecordReq) => {
        const { data } = (await API.patch(
            `/api/mybook/${bookStore.bookId}/title`,
            body, {
                headers: {
                    "Authorization": `Bearer ${getAccess()}`,
                    "Content-Type": "multipart/form-data",
                },
            }
        ));
        console.log('data: ', data);
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

    const book = async () => {
        const { data } = (await API.get(
            "/api/book", {
            headers: {
                "Authorization" : `Bearer ${getAccess()}`,
            }
        })) as AxiosResponse<Book.BookListRes>;
        return data;
    };

    const search = async (search: string) => {
        const title = encodeURIComponent(search);
        console.log(title);
        const { data } = (await API.get(
            `/api/book/?${title}`, {
            headers: {
                "Authorization" : `Bearer ${getAccess()}`,
            },
        })) as AxiosResponse<Book.BookListRes>;
        return data;
    }

    const hero = async (body: Book.HeroReq) => {
        // Blob을 Base64로 변환하는 함수
        const convertToBase64 = (file: Blob): Promise<string> => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result as string);
                reader.onerror = (error) => reject(error);
            });
        };
    
        // 모든 Blob 파일을 Base64로 변환
        const base64Images = await Promise.all(
            body.images.map((image) => convertToBase64(image))
        );
        console.log(base64Images);
        // OpenAI API 호출
        const { data } = (await API.post(
            "https://api.openai.com/v1/chat/completions",
            {
                "model": "gpt-4o",
                "messages": [
                    {
                        "role": "system",
                        "content": "It distinguishes whether the image is a person or not. If it is the main character, it outputs 'hero', and if it is not the main character, it outputs 'non-hero'."
                    },
                    {
                        "role": "user",
                        "content": [
                        {
                            "type": "text",
                            "text": "Please distinguish the main character from the image."
                        },
                        {
                            "type": "image_url",
                            "image_url": {
                            "url": base64Images
                            }
                        }
                        ]
                    }
                ],
                "max_tokens": 300,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${import.meta.env.VITE_OPENAI_SECRET_KEY}`,
                },
            }
        )) as AxiosResponse<{ message: string; images: string[] }>; // 응답 데이터의 예상 타입
    
        // OpenAI 응답 데이터를 Blob으로 변환
        const images = await Promise.all(
            data.images.map(async (base64) => {
                const res = await fetch(base64); // Base64를 URL처럼 사용
                const blob = await res.blob(); // Blob으로 변환
                return blob;
            })
        );
    
        return { images }; // Book.HeroRes 타입 반환
    };

    const topic = async (body: Book.TopicReq) => {
        console.log(body);
        const { data } = (await API.patch(
            `/api/mybook/${bookStore.bookId}/topic`,
            body,
            {
                headers: {
                    "Authorization": `Bearer ${getAccess()}`,
                },
            }
        ));
        console.log(data);
        return data
    };

    const cover = async (body: Book.CoverReq) => {
        const { data } = (await API.patch(
            `/api/mybook/41/cover`,
            body,
            {
                headers: {
                    "Authorization": `Bearer ${getAccess()}`,
                },
            }
        ));
        console.log(data);
        return data;
    };
    

    return { newMakeBook, 
        bookImage, 
        record, 
        recordTitle, 
        help, 
        book, 
        search, 
        hero, 
        topic, 
        cover };
};