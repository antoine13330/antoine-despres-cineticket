'use client'
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from "../ui/button"
import { RefreshCcwDot, TicketPlus } from "lucide-react"
import { FileUpload } from "../ui/file-upload"
import TakePictureBtn from "../ui/take-picture-btn"
import { useState } from "react"
import { TicketStatus } from "@/lib/types/ticket.type"
import useTicketStore from "@/lib/store/ticket.store"
import { createTicketFromDB } from "@/lib/db/crud/ticket.crud"
import Image from "next/image"
import moment from "moment"
import BarcodeGenerator from "../ui/barcode-generator"
import { DatePicker } from "../ui/date-picker"

enum TicketCreateStep {
    IMAGE,
    INFOS
}
export default function TicketCreate() {
    const { addTicket } = useTicketStore();
    const [imageBase64, setImageBase64] = useState<string | null>(null);
    const [imageFormat, setImageFormat] = useState<string | null>(null);
    const [step, setStep] = useState<TicketCreateStep>(TicketCreateStep.IMAGE);
    const [expirationDate, setExpirationDate] = useState<Date>(moment().add(1, 'week').toDate());
    const [dialogOpen, setDialogOpen] = useState(false);
    const onUpload = (base64Image: string, format : string) => {
        setImageBase64(base64Image);
        setImageFormat(format);
    }

    const onChangePicture = () => {
        setImageBase64(null);
        setStep(TicketCreateStep.IMAGE)
        setImageFormat(null);
    }


    const saveTicket = () => {
        const ticket = {
            base64Image: imageBase64 as string,
            expirationDate: expirationDate.toISOString(),
            status: TicketStatus.VALID,
            format : imageFormat
        }
        createTicketFromDB(ticket).then((ticket) => {
            setStep(TicketCreateStep.IMAGE);
            setImageBase64(null);
            addTicket(ticket);
        });
        setDialogOpen(false);
    }


    const onResetDatas = () => {
        setStep(TicketCreateStep.IMAGE);
        setImageBase64(null);
        setImageFormat(null);
        setExpirationDate(moment().add(1, 'week').toDate());
    }
    const getCurrentStepContent = () => {
        switch (step) {
            case TicketCreateStep.IMAGE:
                return {
                    content: (
                        <>
                            {
                                !imageBase64 && (
                                    <>
                                        <FileUpload onUpload={onUpload} />
                                        <span className="block text-center text-neutral-400 dark:text-neutral-500 my-2">or</span>
                                        <TakePictureBtn onUpload={onUpload} title="Place the Bar/QR code in the frame" />
                                        <span className="block text-center text-neutral-400 dark:text-neutral-500 my-2">or</span>
                                        <BarcodeGenerator onUpload={onUpload} />
                                    </>

                                )
                            }

                            {
                                imageBase64 && (
                                    <>
                                        <Image src={imageBase64} alt="ticket" className="w-full rounded-lg" width={200} height={200} />
                                        <Button variant="outline" className="w-full mt-2" onClick={onChangePicture}>
                                            <RefreshCcwDot className="mr-2" />
                                            Change picture
                                        </Button>
                                    </>

                                )
                            }
                        </>
                    ),
                    footer: (
                        <>
                            <DrawerClose asChild>
                                <Button variant="outline" className="w-full" onClick={onResetDatas}>Cancel</Button>
                            </DrawerClose>
                            <Button
                                onClick={() => setStep(TicketCreateStep.INFOS)}
                                disabled={!imageBase64}
                            >Next
                            </Button>
                        </>
                    )
                }
            case TicketCreateStep.INFOS:
                return {
                    content: (
                        <div className="flex flex-col  w-full  pb-2  pt-4 gap-2">
                            <span className=" text-sm ">Expiration date : </span>
                            <DatePicker value={expirationDate} onChange={setExpirationDate} />
                        </div>

                    ),
                    footer: (
                        <>
                            <Button variant="outline" className="w-full"
                                onClick={() => setStep(TicketCreateStep.IMAGE)}
                            >Back</Button>
                            <Button
                                onClick={saveTicket}
                            >
                                Save
                            </Button>
                        </>
                    )
                }
        }
    }



    return (<Drawer open={dialogOpen} onOpenChange={setDialogOpen}>
        <DrawerTrigger asChild>
            <Button >
                <TicketPlus className="mr-2" />
                Add a ticket
            </Button>
        </DrawerTrigger>
        <DrawerContent>
            <div className="max-w-md mx-auto">
                <DrawerHeader>
                    <DrawerTitle>Add a ticket</DrawerTitle>
                    <DrawerDescription>Take a picture of the ticket, or add it manually</DrawerDescription>
                </DrawerHeader>
                <div className="p-4">
                    {getCurrentStepContent().content}
                </div>


                <DrawerFooter className="grid grid-cols-2 w-full px-0">
                    {getCurrentStepContent().footer}
                </DrawerFooter>
            </div>

        </DrawerContent>
    </Drawer>)

}