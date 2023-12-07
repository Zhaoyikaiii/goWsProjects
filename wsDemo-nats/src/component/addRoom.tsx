import {useRoom} from "../store/useRoom.tsx";
import {FC, useState} from "react";
import {
    Dialog,
    DialogTitle,
    Stack,
    TextField
} from "@mui/material";
import {Room} from "../model/model.tsx";


interface AddRoomDialogProps {
    open: boolean;
    onClose: () => void;
}

const emptyRoom: Room = {
    description: "",
    id: "",
    messages: [],
    name: "",
    subject: ""

}
export const AddRoomDialog: FC<AddRoomDialogProps> = props => {
    const {onClose, open} = props;
    const {add,setCurrentRoom} = useRoom()
    const [inputRoom, setInputRoom] = useState<Room>(emptyRoom)
    return (
        <Dialog sx={{}} onClose={onClose} open={open}>
            <DialogTitle>添加房间</DialogTitle>
            <Stack p={2}>
                <TextField label={"房间号"} value={inputRoom?.subject} onChange={(e) => {
                    setInputRoom({...inputRoom, subject: e.target.value})
                }}/>
                <TextField label={"房间名"} value={inputRoom?.name} onChange={(e) => {
                    setInputRoom({...inputRoom, name: e.target.value})
                }}/>
                <TextField label={"房间描述"} value={inputRoom?.description} onChange={(e) => {
                    setInputRoom({...inputRoom, description: e.target.value})
                }}/>
                <button onClick={async () => {
                    if (!inputRoom.subject) {
                        alert("房间号不能为空")
                        return
                    }
                    if (!inputRoom.name) {
                        alert("房间名不能为空")
                        return
                    }
                    if (!inputRoom.description) {
                        alert("房间描述不能为空")
                        return
                    }

                    const random = Math.random().toString(36).substring(7);
                    add({
                        ...inputRoom,
                        id: random
                    })
                    setCurrentRoom(random)
                    setInputRoom(emptyRoom)
                    onClose()
                }}>add
                </button>
                <button onClick={() => {
                    setInputRoom(emptyRoom)
                    onClose()
                }}>
                    cancel
                </button>
            </Stack>
        </Dialog>)
};