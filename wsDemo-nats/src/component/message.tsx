import {FC} from "react";
import {Message as IMessage} from "../model/model.tsx";
import {usePlayer} from "../store/usePlayer.tsx";
import {Box} from "@mui/material";

export const Message: FC<{ message: IMessage }> = ({message}) => {
    const {senderId} = message
    const {currentPlayer} = usePlayer()
    const isMe = currentPlayer?.id === senderId
    return <Box sx={{
        display: "flex",
        justifyContent: isMe ? "flex-end" : "flex-start",
        p: 1,
        m: 1,
        bgcolor: currentPlayer?.color,
        color: "white"
    }}>
        {currentPlayer?.name || "匿名"}：{message.text}
    </Box>
}