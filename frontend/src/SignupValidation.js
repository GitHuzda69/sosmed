function Validation(values) {
    let error = {}
    const email_pattern = /^[\s@]+@[^\s@]+\.[^\s@]+$/
    const password_pattern = /^(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/

    if(values.username === "") {
        error.username = "Username shouldn't be empty"
    }else{
        error.username = ""
    }
    
    if(values.email === "") {
        error.email = "Email shouldn't be empty"
    }else{
        error.email = ""
    }

    if(values.password === "") {
        error.password = "Password shouldn't be empty"
    }else{
        error.password = ""
    }
    return error;
}

export default Validation
