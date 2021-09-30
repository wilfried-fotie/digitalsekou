import axios from 'axios'
import React from 'react'
import { SudoContext, Test2, Verif1 } from '../../pages/Sudo'
import useModal from '../CustomHooks/useModal'
import { Tr } from './pubs'



function Offres() {
    const [visbility3, v3] = useModal(false)

    const getOffers = React.useContext(SudoContext).data.offers
    const entreprises = React.useContext(SudoContext).data.entreprises

    const fineEntreprise = getOffers.map(e1 => ({ ...e1, username: entreprises.find(e => e.id == e1.entreprise_id)&& entreprises.find(e => e.id == e1.entreprise_id).username }))

    const dispacth = React.useContext(SudoContext).dispacth
    



    const handleSubmit = async (id, index) => {
        await axios.put("/ToggleStatusOffre/" + id, {}).then(res => {
            dispacth({ type: "UPDATE", name: "offers", id: index, value: { ...getOffers[index], demande: false, valid: !getOffers[index].valid } })

        }).catch(r => null)





    }


    return (
        <>

            <table>

                <tbody>
                    {fineEntreprise.map((e, k) => <Tr key={k} onSubmit={handleSubmit}  e={e} id={k} pub={false} />)}


                </tbody>
            </table>
            {visbility3 && <CustomModal onModalChange={v3} component={<Verif1 />} />}
        </>
    )
}



export default Offres
