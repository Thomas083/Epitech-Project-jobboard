import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../Button/Button"
import { POST } from "../../../api/axios";
import ENDPOINTS from "../../../api/endpoints";
import "./Form.scss";



const Form = ({ form }) => {
    //States
    const [userSignup, setUserSignup] = useState({
        user_firstname: "",
        user_lastname: "",
        user_email: "",
        user_password: "",
        user_society: "",
    })

    const [userLogin, setUserLogin] = useState({
        user_email: "",
        user_password: "",
    });

    const [passwordFlag, setPasswordFlag] = useState({
        length: false,
        min: false,
        maj: false,
        num: false,
        special: false,
    });

    const [loginError, setLoginError] = useState("");
    const [accountCreated, setAccountCreated] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);

    // Input refs
    const refSignupFirstName = useRef();
    const refSignupEmail = useRef();
    const refSignupPassword = useRef();
    const refSignupPasswordInfos = useRef();
    const refSignupPasswordConfirmation = useRef();

    const refSignupFirstNameError = useRef();
    const refSignupLastNameError = useRef();
    const refSignupEmailError = useRef();
    const refSignupPasswordError = useRef();
    const refSignupPasswordConfirmationError = useRef();

    const { user_firstname, user_lastname } = userSignup;

    // Verify input data

    const checkFirstName = () => {
        if (user_firstname.trim() === "") {
            refSignupFirstNameError.current.innerText = "";
        }
        else {
            refSignupFirstNameError.current.innerText = "";
            return true;
        }
    };

    const checkLastName = () => {
        if (user_lastname.trim() === "") {
            refSignupLastNameError.current.innerText = "";
        }
        else {
            refSignupLastNameError.current.innerText = "";
            return true;
        }
    };

    const checkEmail = (email) => {
        if (email.trim() === "") {
            refSignupEmailError.current.innerText = "";
        }
        else {
            const regex =
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            const check = regex.test(String(email).toLowerCase());
            refSignupEmailError.current.innerText = `${check ? "" : "Email incorrect"
                }`;
            if (check) return true;
        }
    };


    const checkPassword = (password) => {
        setPasswordFocus(true);
        var flags = {
            length: false,
            min: false,
            maj: false,
            num: false,
            special: false,
        };

        if (password.length >= 10) {
            flags.length = true;
        }
        if (password.match(/[a-z]/, "g")) {
            flags.min = true;
        }
        if (password.match(/[A-Z]/, "g")) {
            flags.maj = true;
        }
        if (password.match(/[0-9]/, "g")) {
            flags.num = true;
        }
        if (password.match(/\W|_/g)) {
            flags.special = true;
        }
        setPasswordFlag((prev) => ({ ...prev, ...flags }));
    };

    const checkSamePassword = () => {
        if (
            refSignupPasswordConfirmation.current.value ===
            refSignupPassword.current.value
        ) {
            refSignupPasswordConfirmationError.current.innerHTML = "";
            return true;
        }
        else {
            refSignupPasswordConfirmationError.current.innerHTML =
                "Les mots de passe ne correspondent pas";
        }
    };

    const checkCheckbox = () => {
        var value = "0"
        if (document.getElementById('society').checked) {
            value = "1"
            document.getElementById('firstname').placeholder = 'Society Name'
            document.getElementById('email').placeholder = 'Enter your society email'
            return value
        }
        else {
            document.getElementById('firstname').placeholder = 'First Name'
            document.getElementById('email').placeholder = 'Enter your email'
            return value
        }
    }

    // Signup / login functions
    const navigate = useNavigate();

    const signup = async (e) => {
        try {
            e.preventDefault();

            const { length, min, maj, num, special } = passwordFlag;
            if (
                checkFirstName() &&
                checkLastName() &&
                checkEmail(refSignupEmail.current.value) &&
                length &&
                min &&
                maj &&
                num &&
                special &&
                checkSamePassword()
            ) {
                const response = await POST(ENDPOINTS.USER_SIGNUP, userSignup);
                if (response.status === 200) {
                    refSignupEmailError.current.innerText = "Email déjà enregistré";
                }
                if (response.status === 201) {
                    setAccountCreated(true);
                }
            }
        }
        catch (err) {
            throw err;
        }
    };


    const login = async (e) => {
        try {
            e.preventDefault();
            const response = await POST(ENDPOINTS.USER_LOGIN, userLogin, {
                withCredentials: true,
            });
            if (!response.data.error) {
                localStorage.setItem("user", JSON.stringify(response.data.user));
                const toRedirect = (link) => {
                    navigate(link);
                };
                if (response.data.user.user_society == "0") {
                    toRedirect("/main");
                }
                else {
                    toRedirect("/formsociety");
                }
            }
            else {
                setLoginError(response.data.message);
            }
        } catch (err) {
            throw err;
        }
    };

    return (
        <>
            {form === "register" ? (
                <form className="form" onSubmit={signup}>
                    {
                        <>
                            <div>
                                <input
                                    className="checkbox"
                                    type="checkbox"
                                    id="society"
                                    name="society"
                                    onLoad={() =>
                                        setUserSignup({ ...userSignup, user_society: checkCheckbox() })

                                    }
                                    onChange={(e) =>
                                        setUserSignup({ ...userSignup, user_society: checkCheckbox() })
                                    }
                                />
                                <label>Society ?</label>
                            </div>
                            <input
                                type="text"
                                className="input_container"
                                id="firstname"
                                name="firstname"
                                placeholder="First Name"
                                onChange={(e) =>
                                    setUserSignup({
                                        ...userSignup,
                                        user_firstname: e.target.value,
                                    })
                                }
                                onBlur={checkFirstName}
                                value={userSignup.user_firstname}
                                ref={refSignupFirstName}
                            />
                            <div
                                className="firstname error"
                                ref={refSignupFirstNameError}>

                            </div>
                            <input
                                type="text"
                                className="input_container"
                                id="lastname"
                                name="lastname"
                                placeholder="Name"
                                onChange={(e) =>
                                    setUserSignup({
                                        ...userSignup,
                                        user_lastname: e.target.value,
                                    })
                                }
                                onBlur={checkLastName}
                                value={userSignup.user_lastname}
                            />
                            <div
                                className="lastname error"
                                ref={refSignupLastNameError}>
                            </div>

                            <input
                                type="email"
                                className="input_container"
                                placeholder="Enter your email"
                                id="email"
                                name="email"
                                onChange={(e) =>
                                    setUserSignup({ ...userSignup, user_email: e.target.value })
                                }
                                onBlur={(e) => checkEmail(e.target.value)}
                                value={userSignup.user_email}
                                ref={refSignupEmail}
                            />
                            <div
                                className="email error"
                                ref={refSignupEmailError}>
                            </div>

                            <input
                                type="password"
                                className="input_container"
                                placeholder="Enter your password"
                                id="password"
                                name="password"
                                onChange={(e) => {
                                    setUserSignup({
                                        ...userSignup,
                                        user_password: e.target.value,
                                    });
                                    checkPassword(e.target.value);
                                }}
                                onBlur={() => {
                                    checkSamePassword();
                                }}
                                value={userSignup.user_password}
                                ref={refSignupPassword}
                            />
                            <div
                                className="password error"
                                ref={refSignupPasswordError}>
                            </div>
                            {passwordFocus ? (
                                <ul className="password infos" ref={refSignupPasswordInfos}>
                                    <div>
                                        <li className="length">
                                            {passwordFlag.length ? "✔️" : "❌"} 10 caractères
                                        </li>
                                        <li className="maj">
                                            {passwordFlag.maj ? "✔️" : "❌"} Une majuscule
                                        </li>
                                        <li className="min">
                                            {passwordFlag.min ? "✔️" : "❌"} Une minuscule
                                        </li>
                                        <li className="num">
                                            {passwordFlag.num ? "✔️" : "❌"} Un nombre
                                        </li>
                                        <li className="special">
                                            {passwordFlag.special ? "✔️" : "❌"} Un caractère spécial
                                        </li>
                                    </div>
                                </ul>
                            ) : null}
                            <input
                                type="password"
                                className="input_container"
                                placeholder="Confirm your password"
                                id="password"
                                name="password"
                                ref={refSignupPasswordConfirmation}
                                onChange={() => {
                                    checkSamePassword();
                                }}
                            />
                            <div
                                className="password-conf error"
                                ref={refSignupPasswordConfirmationError}>
                            </div>
                        </>
                    }
                    <Button name="Inscription" />
                    <div className="account-created succes">
                        {accountCreated && "Vous pouvez maintenant vous connecter !"}
                    </div>
                </form>
            ) : (
                <form className="form" onSubmit={login}>
                    <input
                        type="email"
                        className="input_container"
                        placeholder="Enter your email account"
                        id="login-email"
                        name="email"
                        onChange={(e) =>
                            setUserLogin({
                                ...userLogin,
                                user_email: e.target.value,
                            })
                        }
                        value={userLogin.user_email}
                    />
                    <input
                        type="password"
                        className="input_container"
                        placeholder="Enter your password account"
                        id="login-password"
                        name="password"
                        onChange={(e) =>
                            setUserLogin({
                                ...userLogin,
                                user_password: e.target.value,
                            })
                        }
                        value={userLogin.user_password}
                    />
                    <div className="login_error">{loginError}</div>
                    <p></p>
                    <Button name="Connexion" />
                </form> 
            )}
        </>
    );
};

export default Form;
