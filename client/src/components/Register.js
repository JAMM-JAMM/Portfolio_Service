import axios from 'axios';

export default function Register(props) {
    
    return (
        <div>
            <h4>Register</h4>
            <form
                onSubmit = {async function(e) {
                    e.preventDefault();
                    let form = new FormData();
                    form.append('fullname', e.target.fullname.value);
                    form.append('email', e.target.email.value);
                    form.append('password', e.target.password.value);
                    try {
                        await axios.post("http://localhost:5000/auth/register", form)
                            .then( response => {
                                console.log('response : ', JSON.stringify(response));
                            })
                    } catch (error) {
                        console.log("error: ", error);
                    }
                }}
            >
                <p>
                    FULLNAME: <input type="text" name="fullname" placeholder="fullname" />
                </p>
                <p>
                    EMAIL: <input type="text" name="email" placeholder="email"/>
                </p>
                <p>
                    PASSWORD: <input type="text" name="password" placeholder="password"/>
                </p>
                <p>
                    <input type="submit" name="search" />
                </p>
            </form>
        </div>
    )
}