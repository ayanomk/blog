import './BlogTable.css';

function BlogTable({tableData, setTableData}) {
    // TABLE HEAD DATA
    const handleHeadChange = (val, idx) => {        
        const newHeader = [...tableData.header];
        newHeader[idx] = val;
        const newData = { ...tableData, header: newHeader };
        setTableData(newData);
    };

    // TABLE BODY DATA
    const handleBodyChange = (val, rIdx, cIdx) => {
        const newRowsData = [...tableData.rows];
        newRowsData[rIdx][cIdx] = val;
        const newData = { ...tableData, rows: newRowsData };
        setTableData(newData);
    };

    // ADD ROW
    const handleAddRow = () => {
        const newRowsData = [...tableData.rows, ['', '']];
        const newData = { ...tableData, rows: newRowsData };
        setTableData(newData);
        console.log(tableData);
    }

    // DELETE ROW
    const handleDeleteRow = (rIdx) => {
        const rowsData = [...tableData.rows];
        const newRowsData = rowsData.filter((_, idx) => idx != rIdx);
        const newData = { ...tableData, rows: newRowsData };
        setTableData(newData);
    }

    return (
        <div className="blogTable">

            <table>
                <thead>
                    <tr>
                        {tableData.header.map((hData, hIdx) => (
                            <th key={hIdx}><input type="text" value={hData} onChange={(e) => handleHeadChange(e.target.value, hIdx)} /></th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {tableData.rows.map((rowData, rIdx) => {
                        return <tr key={rIdx}>
                            {rowData.map((rd, cIdx) => (
                                <td key={cIdx}><input type="text" value={rd} onChange={(e) => handleBodyChange(e.target.value, rIdx, cIdx)} /></td>
                            ))}
                            <td className='deleteRow' onClick={() => handleDeleteRow(rIdx)}><img src="../icon/column-delete-stroke-rounded.svg" alt="" style={{rotate:"90deg"}} /></td>
                        </tr>
                    })}
                </tbody>
            </table>

            <div className='blogTableControl'>
                <button type='button' onClick={handleAddRow}>
                    <img src="../icon/column-insert-stroke-rounded.svg" alt="" style={{rotate:"90deg"}} />
                </button>
            </div>
        </div>
    )
}

export default BlogTable