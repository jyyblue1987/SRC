export default function SubmissionList({submissions}) {
    return(
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
                        submissions.map(item => (
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
                        submissions.length > 0 ? '' : 'No submission as of yet'
                    }       
                </tbody>
            </table>                 
        </div>      
    )
}