import "./error.css"

function ErrorModal ( { message } ) {

    return (
        <div className="error">
            <p>{ message }</p>
        </div>
    )
}

export default ErrorModal
