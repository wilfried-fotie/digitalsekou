import axios from "axios"

export const fecthAllPub = async function () {

    return await axios.get(`/get-pubs`)
        .then(res => ({
            error: false,
            pubs: res.data,
        }))
        .catch((e) => ({
            error: true,
            pubs: null,
        }))

}

export const fecthAllOffer = async function () {

    return await axios.get(`/get-offers`)
        .then(res => ({
            error: false,
            offers: res.data,
        }))
        .catch((e) => ({
            error: true,
            offers: null,
        }))

}
