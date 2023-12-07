import React from "react";
import {connect, NatsConnection} from "nats.ws";

export const nc = await connect({
        servers: ['ws://127.0.0.1:9222']
    }
);
const NatsContext = React.createContext<NatsConnection>(nc)

export const NatsContextProvider = ({children}: any) => {
    return <NatsContext.Provider value={nc}>{children}</NatsContext.Provider>
}

export const useNatsContext = () => {
    return React.useContext(NatsContext);
}
