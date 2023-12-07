import {NatsContextProvider, nc} from "./ctx/NatsContext.tsx";
import {RoomList} from "./page/roomList.tsx";
import {AddRoomDialog} from "./component/addRoom.tsx";
import {Box, Button} from "@mui/material";
import {useEffect, useState} from "react";
import {Status} from "./component/status.tsx";
import {UserList} from "./component/userList.tsx";
import {BroadCastSubject} from "./constant/constant.tsx";
import {StringCodec, Subscription} from "nats.ws";
import {usePlayer} from "./store/usePlayer.tsx";
import {Action} from "./action/action.tsx";
import {Message} from "./model/model.tsx";
import {useRoom} from "./store/useRoom.tsx";


function App() {
    const [roomAddDialogOpen, setRoomAddDialogOpen] = useState(false);
    const {currentPlayer} = usePlayer()

    useEffect(() => {
        let sub: Subscription
        const handler = async () => {
            sub = nc.subscribe(BroadCastSubject)
            console.log("listen broad cast")
            for await (const m of sub) {
                const msgContent = StringCodec().decode(m.data)
                const msg = JSON.parse(msgContent)
                console.log("receive:", msg)
                usePlayer.setState((state) => {
                    return {
                        ...state,
                        playerList: [...state.playerList, msg]
                    }
                })
            }
        }
        window.addEventListener('load', handler)
        return () => {
            window.removeEventListener('load', handler)
            sub && !sub.isClosed() && sub.drain()
        }
    }, []);

    useEffect(() => {
        const handler = async () => {
            const subject = `room.*`
            const sub = nc.subscribe(subject)
            console.log("listen room")
            for await (const m of sub) {
                const mSubject = m.subject
                console.log(mSubject)
                const msgContent = StringCodec().decode(m.data)
                const msg = JSON.parse(msgContent)
                const action = msg.action
                switch (action) {
                    case Action.SendMessage:
                        useRoom.setState(s => {
                            const message = msg.message as Message
                            return {
                                ...s, list: s.list.map(r => {
                                    if (r.subject === message.roomSubject) {
                                        return {
                                            ...r, messages: [...r.messages, message]
                                        }
                                    } else {
                                        return r
                                    }
                                })
                            }
                        })
                }
            }
        }
        window.addEventListener('load', handler)
        return () => {
            window.removeEventListener('load', handler)
        }
    }, []);

    return (
        <NatsContextProvider>
            <Box>
                <Status/>
                <UserList/>
                <AddRoomDialog open={roomAddDialogOpen} onClose={() => {
                    setRoomAddDialogOpen(false)
                }}/>
                <Button onClick={() => {
                    if (!currentPlayer) {
                        alert("Please login first")
                        return
                    }
                    setRoomAddDialogOpen(true)
                }}>Add Room</Button>
                <RoomList/>
            </Box>
        </NatsContextProvider>
    );
}


export default App
