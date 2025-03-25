"use client"

import * as React from "react"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import moment from "moment"
import { toast } from "sonner"
import { Input } from "./input"

type Props = {
    value: Date
    onChange: (date: Date) => void
}

export function DatePicker({ value, onChange }: Props) {
    const [date, setDate] = React.useState<Date>(value)
    const [isOpen, setIsOpen] = React.useState(false)
    const onOpenChange = (open: boolean) => {
        setIsOpen(open)
    }
    const onClickInput = ($e : React.MouseEvent<HTMLInputElement>) => {
        $e.preventDefault()
        setIsOpen(true)
    }
    const onDateInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newDate = new Date(e.target.value)
        if (isNaN(newDate.getTime())) {
            toast.error("Invalid date")
            return
        }
        setDate(newDate)
    }
    React.useEffect(() => {
        onChange(date)
    }, [date])

    return (
        <Popover open={isOpen} onOpenChange={onOpenChange}>
            <PopoverTrigger asChild>
                <Input type="date" className="flex justify-center" value={moment(date).format("YYYY-MM-DD")} onChange={onDateInputChange} onClick={onClickInput} />

                
            </PopoverTrigger>
            <PopoverContent className="w-80 flex flex-col items-center">
                <Calendar
                    className="h-80 flex justify-center"
                    selected={date}
                    mode="single"
                    onSelect={setDate}
                />
            </PopoverContent>
        </Popover>
    )
}
