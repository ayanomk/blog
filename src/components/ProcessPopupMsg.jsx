import './ProcessPopupMsg.css';

function ProcessPopupMsg({msg}) {
    return (
        <div className='processPopupMsg'>
            <div>
                <p className='typing'>{msg}</p>
            </div>
            <img src="/img/typewriter.svg" alt="" />
        </div>
    )
}

export default ProcessPopupMsg