import {FC, useState} from "react";
import {Button, Grid, Stack, TextField} from "@mui/material";
import {useRoom} from "../store/useRoom.tsx";
import {usePlayer} from "../store/usePlayer.tsx";
import {nc} from "../ctx/NatsContext.tsx";
import {Action} from "../action/action.tsx";

interface ChatProps {
    roomId: string;
}

export const Chat: FC<ChatProps> = props => {
    const {roomId} = props
    const {get} = useRoom()
    const {currentPlayer} = usePlayer()
    const [inputText, setInputText] = useState("")
    const [isMouseFocus, setIsMouseFocus] = useState(false)
    return <Grid container>
        <Grid item xs={12}>
            <TextField onMouseLeave={() => {
                setIsMouseFocus(false)

            }} onMouseEnter={() => {
                setIsMouseFocus(true)
            }} error={isMouseFocus && inputText === ""} multiline rows={3} sx={{
                width: "100%",
            }} value={inputText} onChange={(e) => {
                setInputText(e.target.value)
            }}/>
        </Grid>
        <Grid item xs={12}>
            <Stack>
                <Button onClick={() => {
                    const room = get(roomId)
                    if (!room) {
                        alert("room not found")
                        return
                    } else {
                        if (!inputText) {
                            alert("Please write something ~~")
                            return
                        }
                        if (!currentPlayer) {
                            alert("please send before login")
                            return
                        } else {
                            console.log("publish message", inputText, roomId, currentPlayer.id)
                            const payload = {
                                action: Action.SendMessage,
                                message: {
                                    id: Math.random().toString(36).substring(7),
                                    text: inputText,
                                    senderId: currentPlayer.id,
                                    roomSubject: room.subject,
                                }
                            }
                            const subject = `room.${room.subject}`
                            nc.publish(subject, JSON.stringify(payload))
                            setInputText("")
                        }
                    }
                }}>Send
                </Button>
                <Button onClick={() => {
                    setInputText("")
                }}>
                    Clear
                </Button>
            </Stack>
        </Grid>
    </Grid>

}