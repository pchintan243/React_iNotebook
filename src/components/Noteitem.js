import React from 'react'

const Noteitem = (props) => {
    const { note } = props;
    return (
        <div className='col-md-4 mb-3'>
            <div className="card">

                <div className="card-body">
                    {/* show the title of record and description in card */}
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                </div>
            </div>
        </div>
    )
}

export default Noteitem