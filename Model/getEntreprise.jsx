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


export const fetchEntrepriseSlugData = async function (slug) {

    return await axios.get(`/entreprise/get/${slug}`)
        .then(res => ({
            error: false,
            entreprise: res.data,
        }))
        .catch((e) => ({
            error: true,
            entreprise: null,
        }))
}

export const fetchEntrepriseSiteDataSlug = async function (id) {

    return await axios.get(`/entreprises-sites/${id}`)
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

export const fecthSitePub = async function (id) {

    return await axios.get(`/get-site-pubs/${id}`)
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
export const fecthMessage = async function (id) {

    return await axios.get(`/messages-entreprise/${id}`)
        .then(res => ({
            error: false,
            messages: res.data,
        }))
        .catch((e) => ({
            error: true,
            messages: null,
        }))

}
export const fecthSiteOffer = async function (id) {

    return await axios.get(`/get-site-offers/${id}`)
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

export const fecthSiteProduct = async function (id) {

    return await axios.get(`/get-site-products/${id}`)
        .then(res => ({
            error: false,
            products: res.data,
        }))
        .catch((e) => ({
            error: true,
            products: null,
        }))

}

export const fecthPost = async function (id, who = "entreprises") {

    return await axios.get(`/get-${who}-posts/${id}`)
        .then(res => ({
            error: false,
            posts: res.data,
        }))
        .catch((e) => ({
            error: true,
            posts: null,
        }))

}

export const fecthSitePost = async function (id, who = "entreprises") {

    return await axios.get(`/get-${who}-site-posts/${id}`)
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

export const fetchentrEpriseSitePositionData = async function (id, token) {

    return await axios.get(`/entreprises-site-positions/${id}`,
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

export const fetchEntrepriseSiteSlugData = async function (slug, token) {

    return await axios.get(`/entreprise-slug-site/${slug.replace(" ","-")}`,
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