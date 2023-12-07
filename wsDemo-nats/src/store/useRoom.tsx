import {create} from "zustand";
import {Message,Room} from "../model/model.tsx";

interface RoomStore {
    currentRoom: string;
    setCurrentRoom: (id: string) => void;
    list: Array<Room>;
    get: (id: string) => Room | undefined;
    add: (room: Room) => void;
    remove: (id: string) => void;
    update: (room: Room) => void;
    pushMessage: (roomID: string, message: Message) => void;
}

export const useRoom = create<RoomStore>((set, get) => ({
    currentRoom: "",
    setCurrentRoom: (id) => set(() => ({currentRoom: id})),
    list: [],
    get: (id) => {
        const room = get().list.find((r) => r.id === id)
        if (!room) {
            return undefined
        }
        return room
    },
    add: (room) => set((state) => {
        const list = state.list.filter((r) => r.id !== room.id)
        list.push(room)
        return {list}
    }),
    remove: (id) => set((state) => ({list: state.list.filter((room) => room.id !== id)})),
    update: (room) => set((state) => ({
        list: state.list.map((r) => {
            if (r.id === room.id) {
                return room;
            }
            return r;
        })
    })),
    pushMessage: (roomID, message) => set((state) => ({
        list: state.list.map((r) => {
            if (r.id === roomID) {
                r.messages.push(message)
                return r;
            }
            return r;
        })
    }))
}))