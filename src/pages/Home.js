import {useEffect, useState, useRef} from 'react';
import {useHistory} from 'react-router-dom';
import {BASE_URL} from '../config';
import Modal from './Modal';

export default function Home() {
    const students = useRef([]);
    const [filterData, setFilterData] = useState([]);
    const history = useHistory();
    const [showModal, setShowModal] = useState(false);
    const [student, setStudent] = useState({address: [{}], allergies: []});
    const [allergyNum, setAllergyNum] = useState(-1);

    useEffect(() => {        
        getStudentData();
    }, []);

    const getStudentData = async () => {
        const res = await fetch(`${BASE_URL}students`);
        const data = await res.json();

        console.log("Student", data);

        students.current = data;
        setFilterData(data);
    }

    const onSearch = (e) => {
        console.log(e.target.value);

        const value = e.target.value.toLowerCase();
        
        const filter_data = students.current.filter(item => !value || 
            (item['firstName'] + ' ' + item['lastName']).toLowerCase().includes(value) ||
            item['dateOfBirth'].includes(value));

        setFilterData(filter_data);
    }

    const onProfile = (item) => {
        console.log(item);
        history.push("/profile/" + item.id);
    }

    const onEditStudent = (event, item) => {
        event.stopPropagation();       
        setStudent(item);
        setShowModal(true);
        setAllergyNum(-1);
    }

    const onChangeAddress = (event, key) => {
        const student1 = {...student};
        student1['address'][0][key] = event.target.value;

        setStudent(student1);
    }


    const onSelectAllergy = (item) => {
        const index = allergies.findIndex(row => item.id === row.id);
        console.log("setAllergyNum", item, index)
        setAllergyNum(index);
    }

    const onChangeAllegry = (event, key) => {
        if( allergyNum < 0 )
            return;

        const student1 = {...student};
        student1['allergies'][allergyNum][key] = event.target.value;

        setStudent(student1);
    }

    const onSaveChanges = async() => {
        setShowModal(false);

        // update address
        const res = await fetch(`${BASE_URL}students/${student.id}/address/${address.id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(address)
        });
        const data = await res.json();
        console.log("Changed", data);

        // update allergy
        for(var i = 0; i < allergies.length; i++)
        {
            const row = allergies[i];
            const res = await fetch(`${BASE_URL}students/${student.id}/allergies/${row.id}`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(row)
            });
            
            const data = await res.json();
            console.log("Allergy Changed", data);            
        }

        await getStudentData();
    }


    const address = student.address[0];
    const allergies = student.allergies;    

    return (
        <div>
            <div>
                <h1 className="table-title">Students Table</h1>
                <div className="flex justify-center px-4 sm:px-6 lg:px-8">
                    <div className="relative"> 
                        <input type="text" className="h-10 w-96 pr-8 pl-5 rounded z-0 focus:shadow focus:outline-none" onChange={onSearch} placeholder="Search student..."/>
                        <div className="absolute top-2 right-3"> 
                            <i className="fa fa-search text-gray-400 z-20 hover:text-gray-500"></i> 
                        </div>
                    </div>
                </div>
                <table className="employees-table">
                    <thead className="employees-table-head">
                        <tr>
                            <th>ID</th>
                            <th>Firstname</th>
                            <th>Lastname</th> 
                            <th>Birthday</th>
                            <th>Address</th>
                            <th>Submissions</th>
                        <th></th>
                        </tr>
                    </thead>
                    <tbody className="employees-table-body">
                        {
                            filterData.map(item => (
                                <tr key={item.id} onClick={() => onProfile(item)}>
                                    <td>{item['id']}</td>
                                    <td>{item['firstName']}</td>
                                    <td>{item['lastName']}</td> 
                                    <td>{item['dateOfBirth']}</td>
                                    <td>{item['address'][0]['line1']} {item['address'][0]['line2']} {item['address'][0]['city']}</td>
                                    <td>{item['submissions'].length}</td>
                                    <td onClick={(event) => onEditStudent(event, item)}><i className="fa fa-edit fa-lg"></i></td>
                                </tr>        
                            ))
                        }                   

                    </tbody>
                </table>
            </div>  

            {showModal ? (
                <Modal 
                    student={student} 
                    allergyNum={allergyNum} 
                    showModal={setShowModal} 
                    onChangeAddress={onChangeAddress}
                    onChangeAllegry={onChangeAllegry}
                    onSelectAllergy={onSelectAllergy}
                    onSaveChanges={onSaveChanges}
                    />
            ) : null}             
        </div>
    )
}