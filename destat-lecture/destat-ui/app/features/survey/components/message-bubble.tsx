import { UserIcon } from "lucide-react";

export default function MessageBubble({ sender }: { sender: boolean }) {
  return (
    <div>
      {sender ? (
        <div className="flex flex-row items-center justify-end gap-1">
          <div className="flex flex-col items-end justify-center">
            <h1 className="text-xs font-extrabold">Nickname</h1>
            <span className="text-xs">this is a sample message</span>
          </div>
          <UserIcon size={14} />
        </div>
      ) : (
        <div className="flex flex-row items-center gap-1">
          <UserIcon size={14} />
          <div className="flex flex-col justify-center">
            <h1 className="text-xs font-extrabold">Nickname</h1>
            <span className="text-xs">this is a sample message</span>
          </div>
        </div>
      )}
    </div>
  );
}
