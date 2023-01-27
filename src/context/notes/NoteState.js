import NoteContext from "./noteContext";
// import { useState } from "react";

const NoteState = (props) => {
    // // Default value of context
    // const s1 = {
    //     "name": "chintan",
    //     "class": "5b"
    // }
    // const [state, setState] = useState(s1);
    // // Update the value after one second
    // const update = () => {
    //     // Logic build of update the value after one second
    //     setTimeout(() => {
    //         setState({
    //             "name": "patel",
    //             "class": "6b"
    //         })
    //     }, 1000)
    // }
    return (
        // Pass the props for use state and update
        // <NoteContext.Provider value={{ state, update }}>
        <NoteContext.Provider value={{}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;