import React, { useState } from "react";
import Button from "../Button/Button";
import { POST } from "../../../api/axios";
import ENDPOINTS from "../../../api/endpoints";
import "./Form_Society.scss";

const Form_society = ({ form }) => {
    //States
    const [advert, setAdvert] = useState({
        advert_title: "",
        advert_contract: [],
        advert_contract_categories: "",
        advert_contract_type: "",
        advert_contract_time: "",
        advert_description: "",
        advert_localisation: "",
        advert_wages: "",
        user_id: JSON.parse(localStorage.user).user_id,
    })
 
    const [advertCreated, setAdvertCreated] = useState(false);
    const [imageAdded, setImageAdded] = useState(false);
    const [imageName, setImageName] = useState("");
    // Chekc if the suer is a society
    if (JSON.parse(localStorage.user).user_society === 1) {
        const submitHandler = async (e) => {
            try {
                e.preventDefault();
                //formData
                const advertImg = new FormData();
                advertImg.append("advert_icon", document.getElementById("advert_image").files[0]);
                let entries = Object.entries(advert);
                entries.map(([key, value]) => {
                    advertImg.append(key, value);
                })
                //Requêtes POST Axios
                const response = await POST(ENDPOINTS.CREATE_ADVERT, advertImg);
                if (response.status === 200) {
                    console.log('error')
                }
                if (response.status === 201) {
                    setAdvertCreated(true);
                }
            } catch (err) {
                throw err;
            }
        };

        // set the image name
        const imageAddedToPost = (e) => {
            setImageName(e.slice(12));
            setImageAdded(true);
        };

        // check what kind of contract is selected
        const checkContract = (e) => {
            if (document.getElementById(e).checked) {
                return [...advert.advert_contract, e]
            }
            else {
                var index_e = advert.advert_contract.indexOf(e);
                advert.advert_contract.splice(index_e, 1)
                return [...advert.advert_contract]
            }
        }

        return (
            <>
                <form
                    className="form_society"
                    onSubmit={submitHandler}
                    method="POST"
                    action="/api/post"
                    encType="multipart/form-data">
                    <h3>On this page you can post your advert</h3>
                    <fieldset>
                        <legend>Title</legend>
                        <input
                            type="text"
                            className="input"
                            id="title"
                            name="title"
                            placeholder="Title of your advert"
                            onChange={(e) =>
                                setAdvert({
                                    ...advert,
                                    advert_title: e.target.value
                                })
                            }
                            value={advert.advert_title}
                        />
                    </fieldset>
                    <fieldset>
                        {/* uploading society icon */}
                        <legend>Icon</legend>
                        <input
                            type="file"
                            className="input"
                            id="advert_image"
                            name="advert_image"
                            onChange={(e) =>
                                setAdvert({
                                    ...advert,
                                    advert_icon: imageAddedToPost(e.target.value)
                                })
                            }
                        />
                    </fieldset>
                    <div className="checkbox-contract">
                        <legend>Contract</legend>
                        <input
                            type="checkbox"
                            id="CDI"
                            name="contract"
                            onChange={(e) =>
                                setAdvert({
                                    ...advert,
                                    advert_contract: checkContract(e.target.id)
                                })
                            }
                        />
                        <label>CDI</label>
                        <input
                            type="checkbox"
                            id="CDD"
                            name="contract"
                            onChange={(e) =>
                                setAdvert({
                                    ...advert,
                                    advert_contract: checkContract(e.target.id)
                                })
                            }
                        />
                        <label>CDD</label>
                        <input
                            type="checkbox"
                            id="Alternance"
                            name="contract"
                            onChange={(e) =>
                                setAdvert({
                                    ...advert,
                                    advert_contract: checkContract(e.target.id)
                                })
                            }
                        />
                        <label>Alternance</label>
                        <input
                            type="checkbox"
                            id="Stage"
                            name="contract"
                            onChange={(e) =>
                                setAdvert({
                                    ...advert,
                                    advert_contract: checkContract(e.target.id)
                                })
                            }
                        />
                        <label>Stage</label>
                    </div>
                    <select
                        id="contract"
                        name="categories"
                        onChange={(e) =>
                            setAdvert({
                                ...advert,
                                advert_contract_categories: e.target.value
                            })
                        }
                    >
                        <option value="">--Please choose your categories--</option>
                        <option value="Informatic">Informatic</option>
                        <option value="Industrial">Industrial</option>
                        <option value="BTP">BTP</option>
                    </select>
                    <select
                        id="contract"
                        name="type"
                        onChange={(e) => {
                            setAdvert({
                                ...advert,
                                advert_contract_type: e.target.value
                            })
                        }
                        }
                    >
                        <option value='0'>--Teleworking--</option>
                        <option value='0'>No</option>
                        <option value='1'>Yes</option>
                    </select>
                    <select
                        id="contract"
                        name="time"
                        onChange={(e) =>
                            setAdvert({
                                ...advert,
                                advert_contract_time: e.target.value
                            })
                        }
                    >
                        <option value="">--Please choose your time job--</option>
                        <option value="partime">Part-Time</option>
                        <option value="fulltime">Full-Time</option>
                    </select>
                    <legend>Description</legend>
                    <textarea
                        type="textarea"
                        className="input"
                        id="description"
                        name="description"
                        placeholder="Write your description of your Add"
                        onChange={(e) =>
                            setAdvert({
                                ...advert,
                                advert_description: e.target.value
                            })
                        }
                        value={advert.advert_description}
                    />
                    <legend>Localisation</legend>
                    <input
                        type="text"
                        className="input"
                        placeholder="Localisation"
                        id="localisation"
                        name="localisation"
                        onChange={(e) =>
                            setAdvert({
                                ...advert,
                                advert_localisation: e.target.value
                            })
                        }
                        value={advert.advert_localisation}
                    />
                    <label>Put the wages amount by month</label>
                    <input
                        type="range"
                        id="wages"
                        name="wages"
                        min="0"
                        max="15000"
                        step="1"
                        onInput={(e) =>
                            document.getElementById('showvalue').innerHTML = e.target.value + "€"}
                        onChange={(e) =>
                            setAdvert({
                                ...advert,
                                advert_wages: e.target.value
                            })
                        }
                    />
                    <span id="showvalue">0€</span>
                    <Button name="Post Advert" />
                    <div>
                        {advertCreated && "Your ad is posted !"}
                    </div>
                </form>

            </>
        );
    } else {
        return (
            <div>
                <h3>You need to be a society for post an advert</h3>
            </div>
        )
    }

}
export default Form_society;