import {
    useParams, useHistory
  } from "react-router-dom";

import {useEffect, useState} from 'react';
import {BASE_URL} from '../config';

export default function Profile(props) {
    let { id } = useParams();
    const history = useHistory();
    const [student, setStudent] = useState({});

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
    
    return (
        <div>
            <div>
                <a onClick={onBack}><i class="fa fa-arrow-left fa-lg"></i>Back</a>
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
                    <table class="employees-table">
                        <thead class="employees-table-head">
                            <tr>
                                <th>ID</th>
                                <th>AssignmentName</th> 
                                <th>Due Date</th>
                                <th>Difficulty</th>
                                <th>Note</th>                                
                            </tr>
                        </thead>
                        <tbody class="employees-table-body">
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
            </div>
        </div>
    )
}