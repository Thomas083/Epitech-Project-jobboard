import React, { useState } from "react";
import { DELETE, PUT } from "../../../api/axios";
import axios from "axios";
import ENDPOINTS from "../../../api/endpoints";
import { BsPencil } from "react-icons/bs";
import { ImCross } from "react-icons/im";

const Advertissment_Data = ({ advert }) => {
    //Get all in a array
    const elem = Object.entries(advert)

    const delete_advert = async (e) => {

        try {
            e.preventDefault();
            const toTrash = await axios.delete(
                `http://localhost:3001/api/advert/${advert.advert_id}`
            );
            if (toTrash.status === 200) document.location.reload();
        } catch (err) {
            throw (err)
        }
    }

    const update_advert = async (e) => {
        elem.splice(11, 2)
        const object_elem = Object.fromEntries(elem)
        const update = async () => {
            try {
                const toUpdate = await PUT(ENDPOINTS.UPDATE_ADVERT, object_elem);
                if (toUpdate.status === 200) document.location.reload()
            }
            catch (err) {
                throw (err)
            }
        }
        update();
    }


    const complete_column = () => {
        let data = [<td>
            <div onClick={update_advert}><BsPencil /></div>
            <p>Modify </p>
            <div onClick={delete_advert}><ImCross /></div>
            <p>Delete</p>
        </td >]
        for (let i = 0; i < elem.length; i++) {
            //Table components
            if ([advert.advert_id, advert.advert_publication_date, advert.advert_update, advert.user_id, advert.advert_active].includes(elem[i][1])) {
                data.push(<td>{<input value={elem[i][1]} disabled />}</td>)
            }
            else if (elem[i][1] === advert.advert_contract_categories) {
                data.push(<td>
                    {
                        <select defaultValue={elem[i][1]} onChange={(e) => { elem[i][1] = e.target.value }}>
                            <option value="Informatic">Informatic</option>
                            <option value="Industrial">Industrial</option>
                            <option value="BTP">BTP</option>
                        </select>
                    }
                </td>)
            }
            else if (elem[i][1] === advert.advert_contract_time) {
                data.push(
                    <td>
                        {
                            <select defaultValue={elem[i][1]} onChange={(e) => { elem[i][1] = e.target.value }}>
                                <option value="fulltime">Fulltime</option>
                                <option value="partime">Part Time</option>
                            </select>
                        }
                    </td>)
            }
            else if (elem[i][1] === advert.advert_description) {
                data.push(
                    <td>
                        {
                            <textarea
                                defaultValue={elem[i][1]}
                                onChange={(e) => { elem[i][1] = e.target.value }}
                                rows='5'
                            />
                        }
                    </td>
                )
            }
            else {
                data.push(
                    <td>
                        {
                            <form>
                                <input
                                    defaultValue={elem[i][1]}
                                    onChange={(e) => { elem[i][1] = e.target.value }}
                                />
                            </form>
                        }
                    </td>
                )
            }

        }
        return data
    }

    return (
        complete_column()
    )
}

export default Advertissment_Data;