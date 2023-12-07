import {useRoom} from "../store/useRoom.tsx";
import {usePlayer} from "../store/usePlayer.tsx";
import {Message} from "./message.tsx";
import {Box} from "@mui/material";

export const MessageList = ({roomId}: { roomId: string }) => {
    const {get} = useRoom()
    const {currentPlayer} = usePlayer()
    const room = get(roomId)

    if (!room) {
        return <div>Room Not Found</div>
    }
    if (!currentPlayer) {
        return <div>Please Login</div>
    }
    return <div>
        subject: {room.subject}
        <Box sx={{
            display: "flex",
            flexDirection: "column-reverse",
            overflow: "auto",
            height: "400px"

        }}>
            {
                room.messages.map((message) => {
                    return <Message message={message} key={message.id}/>
                })
            }
        </Box>

    </div>
}