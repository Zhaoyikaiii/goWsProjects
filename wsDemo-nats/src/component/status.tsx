import {useNatsContext} from "../ctx/NatsContext.tsx";
import {Login} from "./login.tsx";

export const Status = () => {
    const nc = useNatsContext();
    return <div>
        <Login/>
        {/*<div>Connected: {nc.status().toString()}</div>*/}
        <div>Connected Server: {nc.getServer()}</div>
    </div>
}