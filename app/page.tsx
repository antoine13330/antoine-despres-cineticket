import TicketCreate from "@/components/flicky/ticket-create";
import TicketList from "@/components/flicky/ticket-list";
import { NightModeBtn } from "@/components/ui/night-mode-btn";
import { Separator } from "@/components/ui/separator";
import { Film } from "lucide-react";

export default function Home() {
  return (
    <div className="max-w-xl mx-auto flex flex-col gap-4 pt-4 h-full px-4">
      <div className="flex justify-between ">
      <h1 className="text-lg font-semibold items-center flex gap-2">
        <Film />
        Flicky
      </h1>
      <div className="flex gap-2">
      <TicketCreate/>
      <NightModeBtn />
      </div>
      </div>
      <Separator orientation="horizontal" />

      <TicketList/>
    </div>
  );
}
