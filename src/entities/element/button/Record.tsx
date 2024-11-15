import { useRef, useState } from "react";
import { RecordIcon } from "./Button"
import { BookService } from "@/shared/hooks/services/BookService";

export const Record = () => {
    const [recording, setRecording] = useState(false);
    const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
    const mediaRecorder = useRef<MediaRecorder | null>(null);
    const chunks = useRef<Blob[]>([]);
    const record = BookService().record;


    const handleStartRecording = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        
        // 원하는 형식 지정 (예: 'audio/webm', 'audio/ogg' 등)
        mediaRecorder.current = new MediaRecorder(stream, { mimeType: 'audio/webm' });
        chunks.current = [];
        
        mediaRecorder.current.ondataavailable = (event) => {
            if (event.data.size > 0) chunks.current.push(event.data);
        };
        
        mediaRecorder.current.onstop = () => {
            const audioBlob = new Blob(chunks.current, { type: 'audio/webm' }); // webm 형식으로 설정
            setAudioBlob(audioBlob);
        };
        
        mediaRecorder.current.start();
        setRecording(true);
    };

    const handleStopRecording = () => {
        mediaRecorder.current?.stop();
        setRecording(false);
        handleRecord();
        console.log('stop');
    };
    const handleRecord = async () => {
        if (!audioBlob) return;
        const formData = new FormData();
        formData.append('audio', audioBlob);
        const data = await record({file: formData});
        console.log(data);
    }
    return (
        <>
            <RecordIcon onClick={recording ? handleStopRecording : handleStartRecording}/>
            
            {audioBlob && (
                <a href={URL.createObjectURL(audioBlob)} download="recording.webm">
                    Download Recording
                </a>
            )}
        </>
    )
}
