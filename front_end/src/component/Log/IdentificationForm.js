import React, { useState } from "react";
import Form from "./Form/Form";
import Link from "./Link/Link";
import Tab from "./Tab/Tab";
import "./IdentificationForm.scss"

const IdentificationForm = () => {
    const [form, setForm] = useState({
        formLogin: "null",
        formRegister: "register",
    });

    const displayRegister = () => {
        setForm({
            formLogin: null,
            formRegister: "register",
        });
    };

    const displayLogin = () => {
        setForm({
            formLogin: "login",
            formRegister: null,
        });
    };

    return (
        <div>
            <div>
                <Tab
                    onClick={displayRegister}
                    className={form.form === "register" ? "tab active-style active-style__signup" : "tab"}
                >
                    Sign Up
                </Tab>
                <Tab
                    onClick={displayLogin}
                    className={form.form === "login" ? "tab active-style active-style__login" : "tab"}
                >
                    Log In
                </Tab>
            </div>
            {form.formRegister === "register" ? (
                <>
                    <Form form="register" />
                    <div className="links">
                        <Link content="Do you already have an account ?" onClick={displayLogin} />
                    </div>
                </>
            ) : (
                <>
                    <Form form="login" />
                    <div className="links">
                        <Link content="Forgot Password ?" onClick={displayRegister} />
                        <Link content="Pas encore de compte ?" onClick={displayRegister} />
                    </div>
                </>
            )}
        </div>
    );
};

export default IdentificationForm;