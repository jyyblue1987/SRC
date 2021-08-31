import {
    useParams, useHistory
  } from "react-router-dom";

import {useEffect, useState} from 'react';
import {BASE_URL} from '../config';

export default function Profile(props) {
    let { id } = useParams();
    const history = useHistory();
    const [student, setStudent] = useState({address: [{}], submissions: []});

    const [name, setName] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [difficulty, setDifficulty] = useState(1);
    const [note, setNote] = useState('');

    useEffect(() => {        
        getStudentData();
    }, []);

    const getStudentData = async () => {
        const res = await fetch(`${BASE_URL}students/${id}`);
        const data = await res.json();

        console.log("Student", data);

        setStudent(data);
    }

    const onBack = () => {
        history.goBack();        
    }

    const onClickAdd = async(event) => {
        console.log("Name", name);
        const res = await fetch(`${BASE_URL}students/${id}/submissions`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({studentId: student.id, assignmentName: name, dueDate: dueDate, difficulty: difficulty, teacherNote: note})
        });
        const data = await res.json();
        console.log("Posted", data);

        setName('');
        setDueDate('');
        setDifficulty(1);
        setNote('');

        await getStudentData();
    }
    
    return (
        <div>
            <div>
                <a onClick={onBack}><i className="fa fa-arrow-left fa-lg"></i>Back</a>
            </div>
            <div className="profile-card">
                <table>
                    <tr>
                        <td>ID:</td>
                        <td>{student['id']}</td>
                    </tr>
                    <tr>
                        <td>Name:</td>
                        <td>{student['firstName']} {student['lastName']}</td>
                    </tr>
                    <tr>
                        <td>Date Of Birth:</td>
                        <td>{student['dateOfBirth']}</td>
                    </tr>
                    <tr>
                        <td>Address:</td>
                        <td>{student['address'][0]['line1']} {student['address'][0]['line2']} {student['address'][0]['city']}</td>
                    </tr>
                </table>       
                <br/>
                <hr />
                <br/>
                <div>
                    <h3 className="submission-title">Submissions</h3>
                    <table className="employees-table">
                        <thead className="employees-table-head">
                            <tr>
                                <th>ID</th>
                                <th>AssignmentName</th> 
                                <th>Due Date</th>
                                <th>Difficulty</th>
                                <th>Note</th>                                
                            </tr>
                        </thead>
                        <tbody className="employees-table-body">
                            {
                                student.submissions.map(item => (
                                    <tr key={item.id}>
                                        <td>{item['id']}</td>
                                        <td>{item['assignmentName']}</td> 
                                        <td>{item['dueDate']}</td>
                                        <td>{item['difficulty']}</td>
                                        <td>{item['teacherNote']}</td>                                        
                                    </tr>        
                                ))
                            }     
                            {
                                student.submissions.length > 0 ? '' : 'No submission as of yet'
                            }       
                        </tbody>
                    </table>                 
                </div>      
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
                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={(event) => onClickAdd(event)}>
                                    Add Submission
                                </button>
                            </td>
                        </tr>
                    </table>
                </div>   
            </div>
        </div>
    )
}