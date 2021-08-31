import {useEffect, useState, useRef} from 'react';
import {useHistory} from 'react-router-dom';
import {BASE_URL} from '../config';

export default function Home() {
    const students = useRef([]);
    const [filterData, setFilterData] = useState([]);
    const history = useHistory();
    const [showModal, setShowModal] = useState(false);

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
        setShowModal(true);
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
                                    <td onClick={(event) => onEditStudent(event, item)}><i className="fa fa-edit fa-lg"></i></td>
                                </tr>        
                            ))
                        }                   

                    </tbody>
                </table>
            </div>  

            {showModal ? (
                <>
                <div
                    className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                >
                    <div className="relative w-auto my-6 mx-auto max-w-3xl">
                    {/*content*/}
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        {/*header*/}
                        <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                        <h3 className="text-3xl font-semibold">
                            Modal Title
                        </h3>
                        <button
                            className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                            onClick={() => setShowModal(false)}
                        >
                            <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                            ×
                            </span>
                        </button>
                        </div>
                        {/*body*/}
                        <div className="relative p-6 flex-auto">
                        <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                            I always felt like I could do anything. That’s the main
                            thing people are controlled by! Thoughts- their perception
                            of themselves! They're slowed down by their perception of
                            themselves. If you're taught you can’t do anything, you
                            won’t do anything. I was taught I could do everything.
                        </p>
                        </div>
                        {/*footer*/}
                        <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                        <button
                            className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={() => setShowModal(false)}
                        >
                            Close
                        </button>
                        <button
                            className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={() => setShowModal(false)}
                        >
                            Save Changes
                        </button>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}             
        </div>
    )
}