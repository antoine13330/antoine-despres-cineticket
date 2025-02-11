'use client'

import { Camera } from "lucide-react";
import { Button } from "./button";
import { Dialog, DialogContent, DialogTitle } from "./dialog";
import { useEffect, useRef, useState } from "react";

type Props = {
    title ?: string;
    onUpload: (base64Image: string) => void;
};

export default function TakePictureBtn({ onUpload , title}: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    const openCamera = async () => {
        setIsOpen(true);
        if (streaming) return;
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
            videoRef.current.srcObject = stream;
            setStreaming(true);
        }

    };
    const [streaming, setStreaming] = useState(false);
    const takePicture = () => {
        if (!videoRef.current) return;
        
        const canvas = document.createElement("canvas");
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        const context = canvas.getContext("2d");

        if (context) {
            context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
            onUpload(canvas.toDataURL());
        }
        stopCamera();
    };

    const stopCamera = () => {
        const stream = videoRef.current?.srcObject as MediaStream;
        if (!stream) return;
        stream.getTracks().forEach(track => track.stop());
        setStreaming(false);
        setIsOpen(false);
    }


    useEffect(() => {
        if ( !isOpen ) {
            stopCamera();
        }
    }, [isOpen]);

    return (
        <>
            <Button variant="outline" className="w-full" onClick={openCamera}>
                <Camera />
                Take a picture
            </Button>

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent>
                    <DialogTitle>
                        {title ?? "Take a picture"}
                    </DialogTitle>
                    <video ref={videoRef} autoPlay className="aspect-video w-full rounded-sm"></video>
                    <Button onClick={takePicture} disabled={!streaming}>Take picture</Button>
                </DialogContent>
            </Dialog>
        </>
    );
}
