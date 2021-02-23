export default function Control(props) {
    return (
        <ul>
            <li>
                <input
                    type = "button"
                    value = "login"
                    onClick = {function() {
                        props.onChangeMode("LOGIN");
                    }}
                />
            </li>
            <li>
                <input
                    type = "button"
                    value = "register"
                    onClick = {function() {
                        props.onChangeMode("REGISTER");
                    }}
                />
            </li>
        </ul>
    )
}