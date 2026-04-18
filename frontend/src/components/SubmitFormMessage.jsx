import './SubmitFormMessage.css';

function SubmitFormMessage({msg, missingFormList, setMissingFormList}) {

    return <div className="SubmitFormMessage">
        <div className='validateMessage'>
            <button onClick={setMissingFormList}><span className='messageCancel'></span></button>
            <h1>{msg}</h1>
            <div className='missingList'>
                <ul>
                    {Object.keys(missingFormList).map((key, idx) => (
                        <li key={idx}>{key}</li>
                    ))}
                </ul>
            </div>
        </div>
    </div>
}

export default SubmitFormMessage