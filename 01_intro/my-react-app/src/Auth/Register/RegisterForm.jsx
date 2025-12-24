

const RegisterForm = () => {
    console.log("RegisterForm :: render");

    // useRef -?
    // useState -?
    // useEffect -?
    let email = "";


    return(
        <form>
            <input type="email"
                   value={email}
                   onChange={(e) => email = e.target.value}
                   placeholder="Email" /><br />
            <input type="password" placeholder="Password" /><br />
            <input type="password" placeholder="" /><br />
            <input type="checkbox" /><br />
            <button type="submit">Register</button>
        </form>
    )
}

export default RegisterForm