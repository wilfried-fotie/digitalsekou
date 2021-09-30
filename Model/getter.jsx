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
    
export const fetchAllTypes = async () => await axios.get('/types')
    .then(res => ({
        error: false,
        types: res.data,
    }))
    .catch(() => ({
        error: true,
        types: null,
    }),
    );

export const fetchAllPositions = async () => await axios.get('/positions')
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

    return await axios.get(`/schools`)
        .then(res => ({
            error: false,
            school: res.data,
        }))
        .catch((e) => ({
            error: true,
            school: null,
        }))
}


export const fetchAllEntrepriseData = async function () {

    return await axios.get(`/entreprises`)
        .then(res => ({
            error: false,
            entreprise: res.data,
        }))
        .catch((e) => ({
            error: true,
            entreprise: null,
        }))
}
export const fetchAllUsersData = async function () {

    return await axios.get(`/users`)
        .then(res => ({
            error: false,
            users: res.data,
        }))
        .catch((e) => ({
            error: true,
            users: null,
        }))
}

export const fetchAllEntrepriseSiteData = async function () {

    return await axios.get(`/entreprises-sites`)
        .then(res => ({
            error: false,
            sites: res.data,
        }))
        .catch((e) => ({
            error: true,
            sites: null,
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





export const fetchSchoolSlugData = async function (slug) {

    return await axios.get(`/schools/get/${slug}`)
        .then(res => ({
            error: false,
            school: res.data,
        }))
        .catch((e) => ({
            error: true,
            school: null,
        }))
}

export const fetchAbonnement = async function (id) {
    return await axios.get(`/abonnement/${id}`)
        .then(res => ({
            error: false,
            abo: res.data,
        }))
        .catch((e) => ({
            error: true,
            abo: null,
        }))
}

    
export const fetSchoolAbo = async function (id) {
    return await axios.get(`/schoolAbonnement/${id}`)
        .then(res => ({
            error: false,
            abo: res.data,
        }))
        .catch((e) => ({
            error: true,
            abo: null,
        }))
}

    

    export const fetSchoolMessages = async function (id) {
        return await axios.get(`/message/${id}`)
        .then(res => ({
            error: false,
            mes: res.data,
        }))
        .catch((e) => ({
            error: true,
            mes: null,
        }))
}