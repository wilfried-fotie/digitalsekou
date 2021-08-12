import axios from "axios";

export const fetchFilieres = async (id) => await axios.get('/custom-filieres/' + id)
    .then(res => ({
        error: false,
        filieres: res.data,
    }))
    .catch(() => ({
        error: true,
        filieres: null,
    }),
    );
    

export const fetchSpecialities = async (id) => await axios.get('/custom-specialities/' + id)
    .then(res => ({
        error: false,
        specialities: res.data,
    }))
    .catch(() => ({
        error: true,
        specialities: null,
    }),
    );
    
export const fetchPositions = async (id) => await axios.get('/custom-positions/' + id)
    .then(res => ({
        error: false,
        positions: res.data,
    }))
    .catch(() => ({
        error: true,
        positions: null,
    }),
    );

export const fetchTypes = async (id) => await axios.get('/custom-types/' + id)
    .then(res => ({
        error: false,
        types: res.data,
    }))
    .catch(() => ({
        error: true,
        types: null,
    }),
    );


export const fetchUsersData = async function () {

    return await axios.get("/users")
        .then(res => ({
            error: false,
            users: res.data,
        }))
        .catch((e) => ({
            error: true,
            users: null,
        }))
}


export const fetchEntreprisesData = async function () {

    return await axios.get("/entreprises")
        .then(res => ({
            error: false,
            entreprises: res.data,
        }))
        .catch((e) => ({
            error: true,
            entreprises: null,
        }))
}




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
