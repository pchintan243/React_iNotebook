import NoteContext from "./noteContext";
import { useState } from "react";

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

    // fetchallnotes api request use to get the record to show in web
    const notesInitial = [
        {
            "_id": "63d15f7769e7d969c2cc3ed9",
            "user": "63d0fdc35e27201a29f46920",
            "title": "mytitle",
            "description": "hellkjo",
            "tag": "personal",
            "date": "2023-01-25T16:57:27.295Z",
            "__v": 0
        },
        {
            "_id": "63d3f256c2aab637fabeb2b1",
            "user": "63d0fdc35e27201a29f46920",
            "title": "chintan",
            "description": "patel",
            "tag": "no-personal",
            "date": "2023-01-27T15:48:38.896Z",
            "__v": 0
        },
        {
            "_id": "63d3f97ed29e0bccb28f90d1",
            "user": "63d0fdc35e27201a29f46920",
            "title": "noname",
            "description": "nooooo",
            "tag": "why",
            "date": "2023-01-27T16:19:10.687Z",
            "__v": 0
        },
        {
            "_id": "63d3f990d29e0bccb28f90d3",
            "user": "63d0fdc35e27201a29f46920",
            "title": "lorem",
            "description": "ipsum",
            "tag": "noneed",
            "date": "2023-01-27T16:19:28.702Z",
            "__v": 0
        },
        {
            "_id": "63d3f99cd29e0bccb28f90d5",
            "user": "63d0fdc35e27201a29f46920",
            "title": "patel",
            "description": "chintan",
            "tag": "h",
            "date": "2023-01-27T16:19:40.053Z",
            "__v": 0
        },
        {
            "_id": "63d3f9afd29e0bccb28f90d7",
            "user": "63d0fdc35e27201a29f46920",
            "title": "new",
            "description": "oneatleast",
            "tag": "hvae",
            "date": "2023-01-27T16:19:59.846Z",
            "__v": 0
        }
    ]

    const [notes, setNotes] = useState(notesInitial);

    return (
        // Pass the props for use state and update
        // <NoteContext.Provider value={{ state, update }}>

        // Pass the value of record as a useState
        <NoteContext.Provider value={{ notes, setNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;