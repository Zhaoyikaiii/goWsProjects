import {useRoom} from "../store/useRoom.tsx";
import {Box, Tab, Tabs} from "@mui/material";
import {MessageList} from "../component/messageList.tsx";
import {Chat} from "../component/chat.tsx";

export const RoomList = () => {

    const {list: roomList, currentRoom, setCurrentRoom} = useRoom();
    return <Box sx={{width: '100%'}}>
        <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
            <Tabs value={currentRoom} onChange={(_, v) => {
                setCurrentRoom(v)
            }} aria-label="basic tabs example">
                {
                    roomList.map((room) => {
                        return <Tab key={room.id} id={room.id} label={room.name} value={room.id}/>
                    })
                }
            </Tabs>
            <MessageList roomId={currentRoom}/>
            <Chat roomId={currentRoom}/>
        </Box>
    </Box>
};