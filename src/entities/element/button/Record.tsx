import { useRef, useState } from "react";
import { RecordIcon } from "./Button"
import { BookService } from "@/shared/hooks/services/BookService";
import { ReactMediaRecorder } from "react-media-recorder";

export const Record = () => {
    const [recording, setRecording] = useState(false);
    const [text, setText] = useState('');
    const record = BookService().record;


    
    return (
        <>
            {/* <RecordIcon onClick={recording ? handleStopRecording : handleStartRecording}/> */}
            <>
                {recording ? 'Recording...' : 'Click to Start Recording'}
            </>
            <ReactMediaRecorder
                audio
                render={({ status, startRecording, stopRecording, mediaBlobUrl }) => (
                    <div>
                        <p>{status}</p>
                        <RecordIcon onClick={() => {
                            if (!recording) {
                                setRecording(true);
                                startRecording();
                            } else {
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
                                        record({ file: formData });
                                    });
                                }
                            }
                        }} />
                        {recording ? 'Start Recording' : 'Recording...'}
                        <br />
                        <audio src={mediaBlobUrl} controls />
                    </div>
                )}
            />
        </>
    )
}
