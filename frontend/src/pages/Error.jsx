import './Error.css';

function Error() {
    return (
        <div className="errorPage">
            <div className="errorMsg">
                <img src="/icon/signpost.svg" alt="" />
                <div>
                    <p>Oh no!</p>
                    <p>Something went wrong...</p>
                </div>
            </div>
        </div>
    )
}

export default Error