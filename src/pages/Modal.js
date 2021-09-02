import FormInput from "./FormInput";

export default function Modal({student, allergyNum, showModal, onChangeAddress, onChangeAllegry, onSelectAllergy, onSaveChanges}) {
    const address = student.address[0];
    const allergies = student.allergies;
    const allergy = allergyNum >= 0 ? allergies[allergyNum] :  {}; 

    return(
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
                                onClick={() => showModal(false)}
                            >
                                <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                ×
                                </span>
                            </button>
                        </div>
                        {/*body*/}
                        <div className="relative p-6 flex-auto">
                            <form class="w-full max-w-sm">                               
                                <FormInput 
                                    label="City"
                                    model={address}
                                    key1={"city"}
                                    onChange={onChangeAddress}
                                />
                                <FormInput 
                                    label="Line1"
                                    model={address}
                                    key1={"line1"}
                                    onChange={onChangeAddress}
                                />
                                <FormInput 
                                    label="Line2"
                                    model={address}
                                    key1={"line2"}
                                    onChange={onChangeAddress}
                                />
                                <FormInput 
                                    label="State"
                                    model={address}
                                    key1={"state"}
                                    onChangeAddress={onChangeAddress}
                                />
                                <FormInput 
                                    label="Zip"
                                    model={address}
                                    key1={"zip"}
                                    onChange={onChangeAddress}
                                />                                    
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
                                <FormInput 
                                    label="Type"
                                    model={allergy}
                                    key1={"type"}
                                    onChange={onChangeAllegry}
                                />     
                                <FormInput 
                                    label="Severity"
                                    model={allergy}
                                    key1={"severity"}
                                    onChange={onChangeAllegry}
                                />     
                                <FormInput 
                                    label="Description"
                                    model={allergy}
                                    key1={"description"}
                                    onChange={onChangeAllegry}
                                />                                                   
                            </form>
                        </div>
                        {/*footer*/}
                        <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                            <button
                                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={() => showModal(false)}
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

    )
}