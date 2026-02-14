import { useState } from 'react';
import './BlogTable.css';

function BlogTable() {
    // TABLE TITLE
    const [tableTitle, setTableTitle] = useState("");
    const handleTitleChange = (e) => {
        setTableTitle(e.target.value);
        e.target.style.height = 'auto';
        e.target.style.height = e.target.scrollHeight + 'px';
    }

    // TABLE HEAD DATA
    const [headData, setHeadData] = useState(['', '']);
    const handleHeadChange = (val, idx) => {
        setHeadData(prev => {
            const newHeadData = [...prev];
            newHeadData[idx] = val;
            return newHeadData;
        })
    };

    // TABLE BODY DATA
    const [rowData, setRowData] = useState([
        ['', '']
    ])
    const handleBodyChange = (val, rIdx, cIdx) => {
        setRowData(prev => {
            const newRowData = [...prev];
            newRowData[rIdx] = [...newRowData[rIdx]];
            newRowData[rIdx][cIdx] = val;
            return newRowData;
        })
    };

    // ADD ROW
    const handleAddRow = (e) => {
        e.preventDefault();
        setRowData(prev => {
            const newRowData = [...prev, ['', '']];
            return newRowData;
        })
    }

    // DELETE ROW
    const handleDeleteRow = (rIdx) => {
        setRowData(prev => {
            return prev.filter((_, idx) => idx !== rIdx);
        })
    }

    return (
        <div className="blogTable">
            <textarea className='tableTitleInput' value={tableTitle} onChange={handleTitleChange} name='tableTitle' rows={1} style={{overflow:'hidden', resize:'none'}} placeholder='Table title' />

            <table>
                <thead>
                    <tr>
                        {headData.map((hData, hIdx) => (
                            <th key={hIdx}><input type="text" value={hData} onChange={(e) => handleHeadChange(e.target.value, hIdx)} /></th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rowData.map((rowData, rIdx) => {
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
                {/* <button>
                    <img src="../icon/delete-02-stroke-rounded.svg" alt="" />
                </button> */}
                <button onClick={handleAddRow}>
                    <img src="../icon/column-insert-stroke-rounded.svg" alt="" style={{rotate:"90deg"}} />
                </button>
            </div>
        </div>
    )
}

export default BlogTable