import {Player} from "../model/model.tsx";
import {create} from "zustand";


interface PlayerStore {
    currentPlayer: Player | undefined
    setCurrentPlayer: (player: Player) => void
    playerList: Array<Player>
    put: (newPlayer: Player) => void
}

export const usePlayer = create<PlayerStore>((set) => ({
    currentPlayer: undefined,
    setCurrentPlayer: (player) => set(() => ({currentPlayer: player})),
    playerList: [],
    put: (newPlayer: Player) => set((prev) => {
        prev.playerList.push(newPlayer)
        return prev
    })
}))


