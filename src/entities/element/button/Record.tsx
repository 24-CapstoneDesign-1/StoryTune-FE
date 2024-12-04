import { Dispatch, SetStateAction, useState } from "react";
import { RecordIcon, StopIcon } from "./Button"
import { BookService } from "@/shared/hooks/services/BookService";
import { ReactMediaRecorder } from "react-media-recorder";
import { useNavigate } from "react-router-dom";
import { PAGE_URL } from "@/shared";
import { useHeroStore } from "@/shared/hooks/stores/useHeroStore";
import { useEffect } from "react";

export const Record = () => {
    const [recording, setRecording] = useState(false);
    const bookService = BookService();
    const navigate = useNavigate();

    const handleStop = async (mediaBlobUrl: string | null) => {
        if (!mediaBlobUrl) {
            console.error("No mediaBlobUrl generated.");
            return;
        }

        try {
            // Fetch the audio blob
            const blob = await fetch(mediaBlobUrl).then((res) => res.blob());
            const file = new File([blob], "audio.mp3", { type: "audio/mp3" });

            console.log("File created:", file);

            // Prepare FormData for upload
            const formData = new FormData();
            formData.append("file", file);

            console.log("Uploading audio...");

            // Upload the file
            await bookService.recordTitle({ file });
            await bookService.bookCompleted();

            console.log("Upload complete. Navigating to the next page...");
            navigate(PAGE_URL.Maked);
        } catch (error) {
            console.error("Error during audio upload:", error);
        }
    };

    return (
        <>
            <ReactMediaRecorder
                audio
                onStop={handleStop}
                render={({ startRecording, stopRecording }) => (
                    <div>
                        {recording ? (
                            <StopIcon
                                onClick={() => {
                                    setRecording(false);
                                    stopRecording();
                                }}
                            />
                        ) : (
                            <RecordIcon
                                onClick={() => {
                                    setRecording(true);
                                    startRecording();
                                }}
                            />
                        )}
                        <br />
                    </div>
                )}
            />
        </>
    );
};

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
    myBookContentId,
    setIsRecord,
    setRecordProgress,
    setProgress,
    setIsLoading,
}: RecordContentProps) => {
    const [recording, setRecording] = useState(false);
    const bookService = BookService();

    const handleStop = async (mediaBlobUrl: string | null) => {
        if (!mediaBlobUrl) {
            console.error("No mediaBlobUrl generated.");
            return;
        }

        try {
            // Fetch audio blob
            const blob = await fetch(mediaBlobUrl).then((res) => res.blob());
            const file = new File([blob], "audio.mp3", { type: "audio/mp3" });

            // Prepare FormData for upload
            const formData = new FormData();
            formData.append("audio", file);

            console.log("Uploading audio...");
            setIsLoading(true);

            // Upload the audio to the server
            await bookService.myBookContent(myBookContentId, {
                audio: file,
                isLine: false,
                myBookCharacterId: null,
            });

            console.log("Upload complete.");
            setIsLoading(false);

            // Update progress and other states
            setIsRecord(false);
            setRecordProgress(false);
            setProgress((prevProgress) => prevProgress + 1);
        } catch (error) {
            console.error("Error during audio upload:", error);
            setIsLoading(false);
        }
    };

    return (
        <>
            <ReactMediaRecorder
                audio
                onStop={handleStop}
                render={({ startRecording, stopRecording }) => (
                    <div>
                        {recording ? (
                            <StopIcon
                                onClick={() => {
                                    setRecording(false);
                                    stopRecording();
                                }}
                            />
                        ) : (
                            <RecordIcon
                                onClick={() => {
                                    setRecording(true);
                                    startRecording();
                                }}
                            />
                        )}
                        <br />
                    </div>
                )}
            />
        </>
    );
};


// export const CharacterRecord = ({index, typing, setTyping} : {index: number, typing: any, setTyping: any}) => {

    export const CharacterRecord = ({ index }: { index: number }) => {
        const [recording, setRecording] = useState(false);
        const bookService = BookService();
        const navigate = useNavigate();
        const heroStore = useHeroStore();
    
        const handleRecordingStop = async (mediaBlobUrl: string | null) => {
            if (!mediaBlobUrl) {
                console.error("MediaBlobUrl not created.");
                return;
            }
    
            try {
                const response = await fetch(mediaBlobUrl);
                const blob = await response.blob();
                const file = new File([blob], "audio.mp3", { type: "audio/mp3" });
                const formData = new FormData();
                formData.append("file", file);
    
                const characterId = heroStore.getCharacterId(index);
                const res = await bookService.recordCharacter(characterId, formData);
                navigate(PAGE_URL.HeroNaming, { state: { index: index, name: res } });
            } catch (error) {
                console.error("Error while processing audio file:", error);
            }
        };
    
        return (
            <>
                <ReactMediaRecorder
                    audio
                    render={({ startRecording, stopRecording, mediaBlobUrl }) => {
                        // Use effect to watch mediaBlobUrl updates
                        useEffect(() => {
                            if (!recording && mediaBlobUrl) {
                                handleRecordingStop(mediaBlobUrl);
                            }
                        }, [mediaBlobUrl]);
    
                        return (
                            <div>
                                {recording ? (
                                    <StopIcon
                                        onClick={() => {
                                            setRecording(false);
                                            stopRecording();
                                        }}
                                    />
                                ) : (
                                    <RecordIcon
                                        onClick={() => {
                                            setRecording(true);
                                            startRecording();
                                        }}
                                    />
                                )}
                                <br />
                            </div>
                        );
                    }}
                />
            </>
        );
    };
    