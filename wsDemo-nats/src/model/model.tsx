import {Action} from "../action/action.tsx";

export interface Room {
    id: string;
    name: string;
    subject: string;
    description: string;
    messages: Array<Message>;
}

export interface Message {
    id: string;
    text: string;
    senderId: string;
    roomSubject: string
}

export interface Player {
    id: string;
    name: string;
    color: string
    description: string;
    roomIds: Array<string>;
}


export type Payload = {
    action: Action.SendMessage,
    message: Message
} | {
    action: Action.BroadCast,
    message: Player
}


export const randomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}


