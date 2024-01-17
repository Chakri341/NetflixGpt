
export const checkValidData=(email, password)=>{

    const isEmailValid = /^[a-z0-9](\.?[a-z0-9]){5,}@g(oogle)?mail\.com$/.test(email);
    
    
    //Minimum eight characters, at least one letter and one number:
    const isPasswordValid=/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password);

    if(!isEmailValid) return "Email ID is not Valid";
    if(!isPasswordValid) return "Password is not valid";

    return null;
}