import {useEffect, useState, useRef} from 'react';
import {useHistory} from 'react-router-dom';
import {BASE_URL} from '../config';

export default function Home() {
    const students = useRef([]);
    const [filterData, setFilterData] = useState([]);
    const history = useHistory();

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
                                    <td><i className="fa fa-edit fa-lg"></i></td>
                                </tr>        
                            ))
                        }                   

                    </tbody>
                </table>
            </div>               
        </div>
    )
}