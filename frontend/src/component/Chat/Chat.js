import "./Chat.css";
import { format, isToday, isSameDay, isYesterday, isThisYear } from "date-fns";


export default function ({message, own}) {
    return (
        <div className={own ? "chat-self" : "chat-other"}>
        <h3>{message.text}</h3>
        <h4>{format(new Date(message.createdAt), "hh:mm a")}</h4>
        </div>
    )
}