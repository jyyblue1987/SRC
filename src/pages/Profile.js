import {
    useParams, useHistory
  } from "react-router-dom";

import {useEffect, useState} from 'react';
import {BASE_URL} from '../config';
import SubmissionForm from './SubmissionForm';
import SubmissionList from "./SubmissionList";

export default function Profile(props) {
    let { id } = useParams();
    const history = useHistory();
    const [student, setStudent] = useState({address: [{}], submissions: []});

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

    const onClickAdd = async(event, name, dueDate, difficulty, note) => {        
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
                <SubmissionList 
                    submissions={student.submissions}
                    />
                <SubmissionForm 
                    onClickAdd={onClickAdd}
                    />
            </div>
        </div>
    )
}