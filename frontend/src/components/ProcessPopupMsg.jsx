import './ProcessPopupMsg.css';

function ProcessPopupMsg({msg}) {
    return (
        <div className='processPopupMsg'>
            <div>
                <p className='typing'>{msg}</p>
            </div>
            <img src="/icon/typewriter.svg" alt="" />
        </div>
    )
}

export default ProcessPopupMsg