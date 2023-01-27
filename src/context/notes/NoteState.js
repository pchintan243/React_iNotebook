import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
    const host = "http://localhost:8000"
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

    const notesInitial = [];

    const [notes, setNotes] = useState(notesInitial);

    // Get all notes
    const getNotes = async (title, description, tag) => {
        // API call
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNkMGZkYzM1ZTI3MjAxYTI5ZjQ2OTIwIn0sImlhdCI6MTY3NDY1OTY4Nn0.yIawobq19d2omdXghcWtbpx7T6OFvXqpwDo3yP6SGPM"
            },
        });
        const json = await response.json();
        console.log(json);
        // For show the data in your notes
        setNotes(json)
    }

    // Add a note
    const addNote = async (title, description, tag) => {
        // API call
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNkMGZkYzM1ZTI3MjAxYTI5ZjQ2OTIwIn0sImlhdCI6MTY3NDY1OTY4Nn0.yIawobq19d2omdXghcWtbpx7T6OFvXqpwDo3yP6SGPM"
            },
            body: JSON.stringify({ title, description, tag }) // body data type must match "Content-Type" header
        });

        console.log("Adding a new note");
        // Set the value of title, description and tag
        const note = {
            "_id": "63d3f9afd29e0bccb28f90d7",
            "user": "63d0fdc35e27201a29f46920",
            "title": title,
            "description": description,
            "tag": tag,
            "date": "2023-01-27T16:19:59.846Z",
            "__v": 0
        };
        setNotes(notes.concat(note));
    }

    // Delete a note
    const deleteNote = async (id) => {
        // API call
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
                'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNkMGZkYzM1ZTI3MjAxYTI5ZjQ2OTIwIn0sImlhdCI6MTY3NDY1OTY4Nn0.yIawobq19d2omdXghcWtbpx7T6OFvXqpwDo3yP6SGPM"
            }
        });
        const json = response.json();

        console.log(json);

        console.log("Delete note" + id);
        // Delete the node logic
        const newNotes = notes.filter((note) => { return note._id !== id })
        // After delete the note remove the note in list
        setNotes(newNotes);
    }

    // Edit a note
    const editNote = async (id, title, description, tag) => {
        // API call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
                'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNkMGZkYzM1ZTI3MjAxYTI5ZjQ2OTIwIn0sImlhdCI6MTY3NDY1OTY4Nn0.yIawobq19d2omdXghcWtbpx7T6OFvXqpwDo3yP6SGPM"
            },
            body: JSON.stringify({ title, description, tag }) // body data type must match "Content-Type" header
        });
        const json = response.json();

        // You can't change the state at a time in react
        // So make a newNote to update the datas
        let newNotes = JSON.parse(JSON.stringify(notes));
        // Logic to add in client
        for (let index = 0; index < notes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }
        }
        setNotes(newNotes);
    }

    return (
        // Pass the props for use state and update
        // <NoteContext.Provider value={{ state, update }}>

        // Pass the value of record as a useState
        // Pass the function name as a state
        <NoteContext.Provider value={{ notes, setNotes, addNote, deleteNote, editNote, getNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;