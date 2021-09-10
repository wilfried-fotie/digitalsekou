import axios from "axios"

export const fetchEntrepriseData = async function (id, token) {

    return await axios.get(`/entreprises/${id}`,
        {
            headers: {
                Authorization: "Bearer " + token
            }

        }
    )
        .then(res => ({
            error: false,
            entreprise: res.data,
        }))
        .catch((e) => ({
            error: true,
            entreprise: null,
        }))
}


export const fecthPub = async function (id) {

    return await axios.get(`/get-pubs/${id}`)
        .then(res => ({
            error: false,
            pubs: res.data,
        }))
        .catch((e) => ({
            error: true,
            pubs: null,
        }))

}

export const fecthOffer = async function (id) {

    return await axios.get(`/get-offers/${id}`)
        .then(res => ({
            error: false,
            offers: res.data,
        }))
        .catch((e) => ({
            error: true,
            offers: null,
        }))

}


export const fecthProduct = async function (id) {

    return await axios.get(`/get-products/${id}` )
        .then(res => ({
            error: false,
            products: res.data,
        }))
        .catch((e) => ({
            error: true,
            products: null,
        }))

}

export const fecthPost = async function (id) {

    return await axios.get(`/get-entreprises-posts/${id}`)
        .then(res => ({
            error: false,
            posts: res.data,
        }))
        .catch((e) => ({
            error: true,
            posts: null,
        }))

}

export const fetchentrEprisePositionData = async function (id, token) {

    return await axios.get(`/entreprises-positions/${id}`,
        {
            headers: {
                Authorization: "Bearer " + token
            }

        }
    )
        .then(res => ({
            error: false,
            position: res.data,
        }))
        .catch((e) => ({
            error: true,
            position: null,
        }))
}

export const fetchEntrepriseSiteData = async function (id, token) {

    return await axios.get(`/entreprise-site/${id}`,
        {
            headers: {
                Authorization: "Bearer " + token
            }

        }
    )
        .then(res => ({
            error: false,
            site: res.data,
        }))
        .catch((e) => ({
            error: true,
            site: null,
        }))
}

