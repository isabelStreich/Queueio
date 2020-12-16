import React, { useState, useEffect } from "react";
import Navbar from "./navbar-component";
import { useParams, useHistory } from "react-router-dom";
import "../App.css";

function INSCRIPTION_CLIENT(props) {
    const commerceId = (props.location && props.location.state) || "";

    const initialFormData = Object.freeze({
        name: "",
        phone: "",
        commerceId: commerceId,
        code: "",
    });
    

    const [formData, setFormData] = useState(initialFormData);
    const [isValidationMode, setIsValidationMode] = useState(false);

    useEffect(() => {
        console.log(commerceId);
    }, []);

    const onChangeHandler = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value.trim(),
        });
    };

    const onClickHandlerSubmit = (e) => {
        e.preventDefault();

        setIsValidationMode(true);

        async function sendCode() {
            const response = await fetch(
                `https://queueio.herokuapp.com/envoyerVerification?phonenumber=${formData.phone}&channel=sms`
            );
            const liste = await response.json();
            console.log(liste);
        }

        sendCode();
    };

    const onClickHandlerValidate = (e) => {
        e.preventDefault();

        async function validateCode() {
            const response = await fetch(
                `https://queueio.herokuapp.com/recevoirVerification?phonenumber=${formData.phone}&code=${formData.code}`
            );
            const liste = await response.json();
            console.log(liste);
            return response.status === 200;
        }

        async function sendData() {
            if (await validateCode()) {
                await sendUserInfo();
                props.history.push({
                    pathname: "/file-attente",
                    state: formData,
                });
            }
        }

        async function sendUserInfo() {
            const response = await fetch(
                "https://queueio.herokuapp.com/prendreNumero/" +
                    formData.commerceId +
                    "," +
                    formData.phone +
                    "," +
                    formData.name,
                {
                    method: "POST",
                }
            );
            const liste = await response.json();
            console.log(liste);
        }

        sendData();
    };

    return (
        <div>
            <Navbar />
            <form className="form-client">
                <div className="form-group" hidden={isValidationMode}>
                    <label htmlFor="nomInput">Entrez votre nom</label>
                    <input
                        type="text"
                        className="form-control"
                        id="nomInput"
                        name="name"
                        aria-describedby="name"
                        onChange={onChangeHandler}
                        required
                    ></input>
                </div>
                <div className="form-group" hidden={isValidationMode}>
                    <label htmlFor="telephone">
                        Entrez votre numéro de téléphone
                    </label>
                    <input
                        type="tel"
                        className="form-control"
                        id="telephone"
                        name="phone"
                        onChange={onChangeHandler}
                        required
                    ></input>
                </div>
                <button
                    className="btn btn-primary"
                    hidden={isValidationMode}
                    onClick={onClickHandlerSubmit}
                >
                    Se mettre en ligne
                </button>
                <div className="form-group" hidden={!isValidationMode}>
                    <label htmlFor="code">
                        Entrez le code de vérification reçu par SMS
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="code"
                        name="code"
                        onChange={onChangeHandler}
                    ></input>
                </div>
                <button
                    className="btn btn-success"
                    hidden={!isValidationMode}
                    onClick={onClickHandlerValidate}
                >
                    Valider
                </button>
            </form>
        </div>
    );
}
export default INSCRIPTION_CLIENT;
