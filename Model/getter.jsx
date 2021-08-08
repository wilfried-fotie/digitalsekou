import axios from "axios";

export const fetchFilieres = async () => await axios.get('/filieres')
    .then(res => ({
        error: false,
        filieres: res.data,
    }))
    .catch(() => ({
        error: true,
        filieres: null,
    }),
    );
    

export const fetchSpecialities = async () => await axios.get('/specialities')
    .then(res => ({
        error: false,
        specialities: res.data,
    }))
    .catch(() => ({
        error: true,
        specialities: null,
    }),
    );
    


export const fetchAllSchoolData = async function () {

    return await axios.get(`/schools/`,
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



export const fetchSchoolData = async function (id, token) {

    return await axios.get(`/secschools/${id}`,
       {
        headers: {
            Authorization: "Bearer " +  token
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
