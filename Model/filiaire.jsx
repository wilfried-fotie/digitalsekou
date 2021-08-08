import axios from "axios";

export async function delFilieres(id, token) {
    
    return await axios.delete(`/filieres/${id}`,
        {
            headers: {
                Authorization: "Bearer " + token
            }

        }
    )
        .then(() => ({
            error: false,
            msg: "suppresiom réussi",
        }))
        .catch(() => ({
            error: true,
            filieres: null,
        }),
        );

}


export const fetchSchoolData = async function (id, token) {

    return await axios.get(`/secschools/${id}`,
        {
            headers: {
                Authorization: "Bearer " + token
            }

        }
    )
        .then(res => ({
            error: false,
            school: res.data,
        }))
        .catch((e) => ({
            error: true,
            school: null,
        }))
}

