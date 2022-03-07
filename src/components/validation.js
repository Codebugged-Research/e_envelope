

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


export const SignUpValidate = (signUpForm)=>{
    console.log(signUpForm)
    if(signUpForm.email==="#EE.com" || signUpForm.name==="" || signUpForm.gender==="")
        return false
    else 
        return true
}



