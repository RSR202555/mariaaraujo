"use client";

import { Calendar, Clock } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AgendaAppointment } from "@/types/admin";

interface AgendaCardProps {
  appointments?: AgendaAppointment[];
}

const defaultAppointments: AgendaAppointment[] = [
  {
    id: "1",
    time: "09:00h",
    studentName: "Juliana Mendes",
    studentAvatar: "/fotocapa.png",
    type: "Avaliação Inicial",
    status: "confirmado",
  },
  {
    id: "2",
    time: "11:30h",
    studentName: "Camila Fernandes",
    studentAvatar: "/fotocapa.png",
    type: "Reavaliação Quinzenal",
    status: "confirmado",
  },
  {
    id: "3",
    time: "14:00h",
    studentName: "Beatriz Ramos",
    studentAvatar: "/fotocapa.png",
    type: "Alinhamento de Dieta",
    status: "pendente",
  },
  {
    id: "4",
    time: "16:30h",
    studentName: "Fernanda Costa",
    studentAvatar: "/fotocapa.png",
    type: "Reavaliação Quinzenal",
    status: "pendente",
  },
];

export function AgendaCard({ appointments = defaultAppointments }: AgendaCardProps) {
  return (
    <div className="bg-[#141414] border border-[#262626] rounded-2xl p-5 text-left space-y-4 shadow-lg">
      <div className="flex items-center justify-between border-b border-[#262626] pb-3">
        <div className="flex items-center space-x-2">
          <Calendar className="h-4 w-4 text-primary" />
          <h3 className="text-sm font-bold uppercase tracking-tight text-white font-serif">
            Agenda do Dia
          </h3>
        </div>
        <span className="text-[0.65rem] font-bold text-muted-foreground bg-[#090909] px-2 py-0.5 rounded-md border border-[#262626]">
          {appointments.length} compromissos
        </span>
      </div>

      <div className="space-y-2">
        {appointments.map((item) => (
          <div
            key={item.id}
            className="p-2.5 rounded-xl bg-[#090909] border border-[#262626] flex items-center justify-between hover:border-[#333] transition-colors"
          >
            <div className="flex items-center space-x-3 min-w-0">
              <span className="text-[0.7rem] font-extrabold text-primary bg-primary/10 border border-primary/20 px-2 py-1 rounded-md shrink-0">
                {item.time}
              </span>
              <Avatar className="h-7 w-7 border border-white/10 shrink-0">
                <AvatarImage src={item.studentAvatar} alt={item.studentName} />
                <AvatarFallback>AL</AvatarFallback>
              </Avatar>
              <div className="min-w-0">
                <span className="text-xs font-bold text-white block truncate">
                  {item.studentName}
                </span>
                <span className="text-[0.65rem] text-muted-foreground block truncate">
                  {item.type}
                </span>
              </div>
            </div>

            <span
              className={`text-[0.62rem] font-bold uppercase px-2 py-0.5 rounded-md ${
                item.status === "confirmado"
                  ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                  : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
              }`}
            >
              {item.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
