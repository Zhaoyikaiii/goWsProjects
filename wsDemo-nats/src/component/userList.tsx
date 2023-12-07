import {usePlayer} from "../store/usePlayer.tsx";
import {Box, Stack} from "@mui/material";
import {Player} from "../model/model.tsx";
import {FC} from "react";

export const UserList = () => {
    const {playerList} = usePlayer();

    return <Stack>
        UserList:
        {
            playerList.map(player => {
                return <UserItem user={player} key={player.id}/>
            })
        }
    </Stack>
}

const UserItem: FC<{ user: Player }> = props => {
    const {user} = props
    return <Box>
        {user.name}
    </Box>
}