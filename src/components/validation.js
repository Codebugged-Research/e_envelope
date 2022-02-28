

export const loginValidate = (loginForm)=>{
    let isValid = true;
    var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    let errors = {
        loginEmail:'',
        loginPassword:'',
    };
    if(!loginForm['loginEmail']){
        isValid = false;
        errors['loginEmail'] = "Please Enter your email";
    }
    // else{
    //     if (!pattern.test(loginForm["loginEmail"])) {
    //     isValid = false;
    //     errors['loginEmail'] = "Please Enter a valid email";
    // }
// }
if(!loginForm['loginPassword']){
    isValid = false;
    errors['loginPassword'] = "Please Enter your Password";
}
else{
    if (loginForm["loginPassword"].length < 6) {
    isValid = false;
    errors['loginPassword'] = "Please Enter a valid Password";
}
}
    // setError({...error, ['loginEmail']:errors.loginEmail, ['loginPassword']:errors.loginPassword })
    const validation = {isValid, errors} 
    return validation;
}


export const signupValidate = (signupForm)=>{
    let isValid = true;
    var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    let errors = {
        firstName:"",
        lastName:"",
        gender:"",
        phoneNumber:"",
        email:"",
        password:"",
        subPassword:"",
    };
    if(!signupForm['email']){
        isValid = false;
        errors['email'] = "Please Enter your email";
    }
    else{
        if (!pattern.test(signupForm["email"])) {
        isValid = false;
        errors['email'] = "Please Enter a valid email";
    }
}
    if(!signupForm['password']){
        isValid = false;
        errors['password'] = "Please Enter your Password";
    }
    else{
        if (signupForm["loginPassword"].length < 6) {
        isValid = false;
        errors['loginPassword'] = "Please Enter a valid Password";
    }
    }
    if(signupForm['phoneNumber'].length<10){
        isValid = false;
        errors['phoneNumber'] = "Please Enter a valid phone";
    }

    // setError({...error, ['loginEmail']:errors.loginEmail, ['loginPassword']:errors.loginPassword })
    const validation = {isValid, errors} 
    return validation;
}



