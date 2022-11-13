import React from "react";
import { BsPencil } from "react-icons/bs";
import { ImCross } from "react-icons/im";
import axios from "axios";

const Users_Data = ({ users }) => {
    //Get all 
    const elem = Object.entries(users)

    const delete_user = async (e) => {
        try {
            e.preventDefault();
            const toTrash = await axios.delete(
                `http://localhost:3001/api/user/${users.user_id}`
            );
            if (toTrash.status === 200) document.location.reload();
        } catch (err) {
            throw (err)
        }
    }

    const update_user = async () => {
        const object_elem = Object.fromEntries(elem)
        const update = async () => {
            try {
                const toUpdate = await axios.put(
                    `http://localhost:3001/api/user/desactive/${users.user_id}`,
                    object_elem
                )
                if (toUpdate.status === 200) document.location.reload();
            } catch (err) {
                throw (err)
            }
        }
        update()
    }

    const complete_column = () => {
        let data = [<td>
            <div onClick={update_user}>
                <BsPencil />
                Modify
            </div>
            <div onClick={delete_user}>
                <ImCross />
                Delete
            </div>

        </td>]
        for (let i = 0; i < elem.length; i++) {
            if ([users.user_id, users.user_password].includes(elem[i][1])) {
                data.push(<td>{<input value={elem[i][1]} disabled />}</td>)
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

export default Users_Data;