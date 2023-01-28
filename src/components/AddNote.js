import React, { useState, useContext } from 'react';
import noteContext from '../context/notes/noteContext';

const Addnote = (props) => {
    const context = useContext(noteContext);
    const { addNote } = context;

    const [note, setNote] = useState({ title: "", description: "", tag: "" })

    const handleClick = (e) => {
        // Use for turn off the page reload
        e.preventDefault();
        // Pass the value of title, description and tag
        addNote(note.title, note.description, note.tag);
        // After user click on submit button form detail will be blank --> make sure value in input tag is must
        setNote({ title: "", description: "", tag: "" });
        // Alert
        props.showAlert("Added Succesfully..!!", "success");
    }

    const onChange = (e) => {
        // Add value in your notes
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    return (
        <div className="container m-3">
            <h2>Add Note</h2>
            <form className='my-3'>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" value={note.title} onChange={onChange} minLength={3} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name='description' value={note.description} onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name='tag' value={note.tag} onChange={onChange} minLength={3} required />
                </div>

                {/* Disable button upto form is not fulfilled */}
                <button disabled={note.title.length < 3 || note.description.length < 5 || note.tag.length < 3} type="submit" className="btn btn-primary" onClick={handleClick}>Submit</button>
            </form>
        </div>
    )
}

export default Addnote