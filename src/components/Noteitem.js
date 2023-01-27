import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext';

const Noteitem = (props) => {
    const context = useContext(noteContext);
    const { deleteNote } = context;
    const { note } = props;

    return (
        <div className='col-md-4 mb-3'>
            <div className="card">

                <div className="card-body">
                    {/* Show the title of record and description in card */}
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                    {/* Font awesome website use to get the icon */}
                    {/* Delete the note using id */}
                    <i className="fa-solid fa-trash mx-2" onClick={() => { deleteNote(note._id) }}></i>
                    <i className="fa-regular fa-pen-to-square mx-2"></i>
                </div>
            </div>
        </div>
    )
}

export default Noteitem