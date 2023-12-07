import {usePlayer} from "../store/usePlayer.tsx";
import {Box, Button, Dialog, DialogActions, DialogTitle, Stack, TextField} from "@mui/material";
import {FC, useState} from "react";
import {Player, randomColor} from "../model/model.tsx";
import {nc} from "../ctx/NatsContext.tsx";
import {BroadCastSubject} from "../constant/constant.tsx";


export const Login = () => {
    const {currentPlayer} = usePlayer()
    const [loginDialogOpen, setLoginDialogOpen] = useState(false)
    return <Box>
        <LoginDialog open={loginDialogOpen} onClose={() => {
            setLoginDialogOpen(false)
        }}/>
        {
            currentPlayer ? <div>Logged in as {currentPlayer.name}</div> : <Button onClick={() => {
                setLoginDialogOpen(true)
            }}>Login</Button>
        }
    </Box>
}

interface LoginDialogProps {
    open: boolean;
    onClose: () => void;
}

const emptyPlayer: Player = {
    id: "",
    name: "",
    description: "",
    color: "white",
    roomIds: []
}

export const LoginDialog: FC<LoginDialogProps> = props => {
    const {onClose, open} = props;
    const [editPlayer, setEditPlayer] = useState<Player>(emptyPlayer)
    const {setCurrentPlayer} = usePlayer()
    return <Dialog open={open} onClose={onClose}>
        <DialogTitle>
            Login
        </DialogTitle>
        <Stack p={2}>
            <TextField label={"Name"} onChange={(e) => {
                setEditPlayer({...editPlayer, name: e.target.value})
            }}/>
            <TextField style={{
                marginTop: "1rem"
            }} label={"Description"} onChange={(e) => {
                setEditPlayer({...editPlayer, description: e.target.value})
            }}/>
        </Stack>
        <DialogActions>
            <Button onClick={() => {
                if (!editPlayer.name) {
                    alert("Name cannot be empty")
                    return
                }
                if (!editPlayer.description) {
                    alert("Description cannot be empty")
                    return
                }
                editPlayer.id = Math.random().toString(36).substring(7)
                editPlayer.color = randomColor()
                setCurrentPlayer(editPlayer)
                nc.publish(BroadCastSubject, JSON.stringify(editPlayer))
                onClose()
            }}>Login
            </Button>
            <Button onClick={onClose}>Cancel</Button>
        </DialogActions>
    </Dialog>

}