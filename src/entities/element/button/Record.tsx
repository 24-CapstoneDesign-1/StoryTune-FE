import { useRef, useState } from "react";
import { RecordIcon, StopIcon } from "./Button"
import { BookService } from "@/shared/hooks/services/BookService";
import { ReactMediaRecorder } from "react-media-recorder";
import { useNavigate } from "react-router-dom";
import { PAGE_URL } from "@/shared";

export const Record = (recordApi: any) => {
    const [recording, setRecording] = useState(false);
    const [text, setText] = useState('');
    const bookService = BookService();
    const navigate = useNavigate();

    return (
        <>
            <ReactMediaRecorder
                audio
                render={({ status, startRecording, stopRecording, mediaBlobUrl }) => (
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
