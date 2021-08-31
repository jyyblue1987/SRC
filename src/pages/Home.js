import {useEffect, useState, useRef} from 'react';
import {useHistory} from 'react-router-dom';
import {BASE_URL} from '../config';

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
    const allergy = allergyNum >= 0 ? allergies[allergyNum] :  {}; 

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
                                        {student['id']}: {student['firstName']} {student['lastName']}
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
                                    <form class="w-full max-w-sm">
                                        <div class="md:flex md:items-center mb-3">
                                            <div class="md:w-1/3">
                                                <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
                                                    City
                                                </label>
                                            </div>
                                            <div class="md:w-2/3">
                                                <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="text" 
                                                    value={address['city']} onChange={(event) => onChangeAddress(event, 'city')}  />
                                            </div>
                                        </div>
                                        <div class="md:flex md:items-center mb-3">
                                            <div class="md:w-1/3">
                                                <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
                                                    Line1
                                                </label>
                                            </div>
                                            <div class="md:w-2/3">
                                                <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="text" 
                                                    value={address['line1']}  onChange={(event) => onChangeAddress(event, 'line1')}/>
                                            </div>
                                        </div> 

                                        <div class="md:flex md:items-center mb-3">
                                            <div class="md:w-1/3">
                                                <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
                                                    Line2
                                                </label>
                                            </div>
                                            <div class="md:w-2/3">
                                                <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="text" 
                                                    value={address['line2']}  onChange={(event) => onChangeAddress(event, 'line2')}/>
                                            </div>
                                        </div>                                   

                                        <div class="md:flex md:items-center mb-3">
                                            <div class="md:w-1/3">
                                                <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
                                                    State
                                                </label>
                                            </div>
                                            <div class="md:w-2/3">
                                                <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="text" 
                                                    value={address['state']}  onChange={(event) => onChangeAddress(event, 'state')}/>
                                            </div>
                                        </div>    

                                        <div class="md:flex md:items-center mb-3">
                                            <div class="md:w-1/3">
                                                <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
                                                    Zip
                                                </label>
                                            </div>
                                            <div class="md:w-2/3">
                                                <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="text" 
                                                    value={address['zip']}  onChange={(event) => onChangeAddress(event, 'zip')}/>
                                            </div>
                                        </div>                                       
                                    </form>
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Type
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Severity
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Description
                                            </th>              
                                            <th scope="col" className="relative px-6 py-3">
                                                <span className="sr-only">Delete</span>
                                            </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {allergies.map((item) => (
                                                <tr key={item.id}>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        {item['type']}
                                                    </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        {item['severity']}
                                                    </td>                    
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item['description']}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium" onClick={() => onSelectAllergy(item)}>
                                                        <a href="#" className="text-indigo-600 hover:text-indigo-900">
                                                            Edit
                                                        </a>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    <form class="w-full max-w-sm">
                                        <div class="md:flex md:items-center mb-3">
                                            <div class="md:w-1/3">
                                                <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
                                                    Type
                                                </label>
                                            </div>
                                            <div class="md:w-2/3">
                                                <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="text" 
                                                    value={allergy['type']} onChange={(event) => onChangeAllegry(event, 'type')}  />
                                            </div>
                                        </div>
                                        <div class="md:flex md:items-center mb-3">
                                            <div class="md:w-1/3">
                                                <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
                                                    Severity
                                                </label>
                                            </div>
                                            <div class="md:w-2/3">
                                                <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="text" 
                                                    value={allergy['severity']}  onChange={(event) => onChangeAllegry(event, 'liseverityne1')}/>
                                            </div>
                                        </div> 

                                        <div class="md:flex md:items-center mb-3">
                                            <div class="md:w-1/3">
                                                <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
                                                    Description
                                                </label>
                                            </div>
                                            <div class="md:w-2/3">
                                                <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="text" 
                                                    value={allergy['description']}  onChange={(event) => onChangeAllegry(event, 'description')}/>
                                            </div>
                                        </div>                                    
                                    </form>
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
                                        onClick={() => onSaveChanges()}
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