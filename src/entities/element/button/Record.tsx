import { Dispatch, SetStateAction, useState } from "react";
import { RecordIcon, StopIcon } from "./Button"
import { BookService } from "@/shared/hooks/services/BookService";
import { ReactMediaRecorder } from "react-media-recorder";
import { useNavigate } from "react-router-dom";
import { PAGE_URL } from "@/shared";
import { useHeroStore } from "@/shared/hooks/stores/useHeroStore";

export const Record = () => {
    const [recording, setRecording] = useState(false);
    const bookService = BookService();
    const navigate = useNavigate();

    return (
        <>
            <ReactMediaRecorder
                audio
                render={({ startRecording, stopRecording, mediaBlobUrl }) => (
                    <div>
                        {recording ? <StopIcon onClick={() => {
                            setRecording(false);
                            stopRecording();
                            if (mediaBlobUrl) {
                                fetch(mediaBlobUrl)
                                .then(res => res.blob())
                                .then(blob => {
                                    const file = new File([blob], 'audio.mp3', {
                                        type: 'audio/mp3',
                                    });
                                    console.log(file);
                                    const formData = new FormData();
                                    formData.append('file', file);
                                    bookService.recordTitle({ file: file });
                                    bookService.bookCompleted();
                                    console.log('file', file);
                                }).then(() => navigate(PAGE_URL.Maked));
                            }}} /> : <RecordIcon onClick={() => {
                            setRecording(true);
                            startRecording();
                            }} />
                        }
                        <br />
                        <>
                        <audio src={mediaBlobUrl} controls />
                        </>
                    </div>
                )}
            />
        </>
    )
}

interface RecordContentProps {
    myBookContentId: any;
    setIsRecord: any;
    setRecordProgress: any;
    progress: number;
    setProgress: Dispatch<SetStateAction<number>>;
    isLoading: boolean;
    setIsLoading: Dispatch<SetStateAction<boolean>>;
}
export const RecordContent = ({
    myBookContentId, setIsRecord, setRecordProgress, progress, setProgress, setIsLoading
} : RecordContentProps
) => {
    const [recording, setRecording] = useState(false);
    const bookService = BookService();

    return (
        <>
            <ReactMediaRecorder
                audio
                render={({ startRecording, stopRecording, mediaBlobUrl }) => (
                    <div>
                        {recording ? <StopIcon
                                onClick={async () => {
                                    setRecording(false);
                                    stopRecording();
                                    if (mediaBlobUrl) {
                                        const blob = await fetch(mediaBlobUrl).then((res) => res.blob());
                                        const file = new File([blob], "audio.mp3", { type: "audio/mp3" });
                                        const formData = new FormData();
                                        formData.append("audio", file);

                                        console.log("Uploading audio...");
                                        setIsLoading((isLoading) => !isLoading);
                                        await bookService.myBookContent(myBookContentId, {
                                            audio: file,
                                            isLine: false,
                                            myBookCharacterId: null,
                                        });
                                        setIsLoading((isLoading) => !isLoading);
                                        console.log("Upload complete.");
                                        // Update states after all async operations
                                        console.log("progress1", progress);
                                        setIsRecord(false);
                                        setRecordProgress(false);
                                        setProgress((progress) => progress + 1);
                                        console.log("progress2", progress);
                                    }
                                }}
                            /> : <RecordIcon onClick={() => {
                            setRecording(true);
                            startRecording();
                            }} />
                        }
                        <br />
                        <>
                        <audio src={mediaBlobUrl} controls />
                        </>
                    </div>
                )}
            />
        </>
    )
}

// export const CharacterRecord = ({index, typing, setTyping} : {index: number, typing: any, setTyping: any}) => {
export const CharacterRecord = ({index} : {index: number}) => {
    const [recording, setRecording] = useState(false);
    const bookService = BookService();
    const navigate = useNavigate();
    const heroStore = useHeroStore();

    

    return (
        <>
            <ReactMediaRecorder
                audio
                render={({ startRecording, stopRecording, mediaBlobUrl }) => (
                    <div>
                        {recording ? <StopIcon onClick={() => {
                            setRecording(false);
                            stopRecording();
                            if (mediaBlobUrl) {
                                fetch(mediaBlobUrl)
                                .then(res => res.blob())
                                .then(blob => {
                                    const file = new File([blob], 'audio.mp3', {
                                        type: 'audio/mp3',
                                    });
                                    console.log(file);
                                    const formData = new FormData();
                                    formData.append('file', file);
                                    console.log(heroStore.getCharacterId(index));
                                    const res = bookService.recordCharacter(heroStore.getCharacterId(index), formData);
                                    console.log('file', file);
                                    return res;
                                }).then((res) => navigate(PAGE_URL.HeroNaming, {state: {index: index, name: res}}));;
                            }}} /> : <RecordIcon onClick={() => {
                            setRecording(true);
                            startRecording();
                            }} />
                        }
                        <br />
                        <>
                        <audio src={mediaBlobUrl} controls />
                        </>
                    </div>
                )}
            />
        </>
    )
}