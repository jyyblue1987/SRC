import {useState} from 'react';

export default function SubmissionForm({onClickAdd}) {
    const [name, setName] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [difficulty, setDifficulty] = useState(1);
    const [note, setNote] = useState('');

    const onClickAddEvent = async(event) => {        
        onClickAdd(name, dueDate, difficulty, note);
        setName('');
        setDueDate('');
        setDifficulty(1);
        setNote('');
    }
    

    return(
        <div style={{marginTop: 20}}>
            <table className="submission-form">
                <tr>
                    <td>
                        Name:
                    </td>
                    <td>
                        <input type="text" value={name} onChange={(event) => setName(event.target.value) }/>
                    </td>
                </tr>
                <tr>
                    <td>
                        Due date:
                    </td>
                    <td>
                        <input type="date" value={dueDate}  onChange={(event) => setDueDate(event.target.value) }/>
                    </td>
                </tr>
                <tr>
                    <td>
                        Difficulty:
                    </td>
                    <td>
                        <input type="number"  value={difficulty}  onChange={(event) => setDifficulty(event.target.value) } />
                    </td>
                </tr>
                <tr>
                    <td>
                        Teacher Note:
                    </td>
                    <td>
                        <textarea cols="70" value={note} onChange={(event) => setNote(event.target.value) } ></textarea>
                    </td>
                </tr>
                <tr>
                    <td>                                
                    </td>
                    <td>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={(event) => onClickAddEvent(event)}>
                            Add Submission
                        </button>
                    </td>
                </tr>
            </table>
        </div>   
    )
    
}