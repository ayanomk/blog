import './ProcessPopupMsg.css';

function ProcessPopupMsg({msg}) {
    return (
        <div className='processPopupMsg'>
            <div>
                <p className='typing'>{msg}</p>
            </div>
            <img src="/img/dw21batch2-mynt-01.jpg" alt="" />
        </div>
    )
}

export default ProcessPopupMsg