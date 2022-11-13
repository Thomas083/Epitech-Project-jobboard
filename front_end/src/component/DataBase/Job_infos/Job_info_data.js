import React from "react";
import { BsPencil } from "react-icons/bs";
import { ImCross } from "react-icons/im";
import { PUT } from "../../../api/axios";
import ENDPOINTS from "../../../api/endpoints";
import axios from "axios";

const Job_info_Data = ({ job_info }) => {
    //Get all
    const elem = Object.entries(job_info)

    const delete_message = async (e) => {
        try {
            e.preventDefault();
            const toTrash = await axios.delete(
                `http://localhost:3001/api/message/${job_info.info_id}`
            );
            if (toTrash.status === 201) document.location.reload();
        } catch (err) {
            throw (err)
        }
    }

    const update_message = async () => {
        const object_elem = Object.fromEntries(elem)
        const update = async () => {
            try {
                const toUpdate = await PUT(ENDPOINTS.UPDATE_MESSAGE, object_elem);
                if (toUpdate.status === 201) document.location.reload();
            } catch (err) {
                throw (err)
            }
        }
        update()
    }

    const complete_column = () => {
        let data = [<td>
            <div onClick={update_message}><BsPencil /></div>
            <p >Modify </p>
            <div onClick={delete_message}><ImCross /></div>
            <p >Delete</p>
        </td>]
        for (let i = 0; i < elem.length; i++) {
            if ([job_info.info_id, job_info.advert_id, job_info.user_id].includes(elem[i][1])) {
                data.push(<td>{<input value={elem[i][1]} disabled />}</td>)
            }
            else if (elem[i][1] === job_info.job_info_description) {
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
                        <form>
                            <input
                                type='textarea'
                                defaultValue={elem[i][1]}
                                onChange={(e) => { elem[i][1] = e.target.value; update_message(elem[i]) }}>
                            </input>
                        </form>
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

export default Job_info_Data;