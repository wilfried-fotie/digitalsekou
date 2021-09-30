import React from 'react'
import { EmojiSmileFill } from 'react-bootstrap-icons'
import useModal from './useModal'

function NotPro({pass = true}) {
    const [visbility, v] = useModal(true)
    return (
        <div>
            
            {visbility && 
                <center className="pad" style={{margin: "0px 10% 0px",}}>

                
            {pass &&<>    <center> <EmojiSmileFill size={50} color="#FF0000"/>  </center>

                <center className="h1 padding">CETTE FONCTIONNALITÉ EST RÉSERVER À LA VERSION PRO</center>
                <p>
                    Pour passer à la version pro faites une demande en cliquant sur passer pro. </p>
                    
                <p>Puis suivez les étapes suivantes:
                    <ul type="1">
                        <ol>
                           1 - Faites un dépot OM OU MOMO au 678615677
                        </ol>
                        <ol>
                           2 - Attendez la validation de votre compte 
                        </ol>
                        <ol>
                            3 - Profiter de la version Pro
                        </ol>
                    </ul>
                   
                </p></>}

                {!pass && <>
                    <span className="h1">VALIDER VOTRE DEMANDE POUR PASSER PRO</span>
                    <p>Pour Profiter de tous les avanatges liés à la version pro suivez les étapes suivantes:</p>

                    <ul type="1">
                        <ol>
                            0 - Valider la demande
                        </ol>
                        <ol>
                            1 - Faites un dépot OM OU MOMO au 678615677
                        </ol>
                        <ol>
                            2 - Attendez la validation de votre compte
                        </ol>
                        <ol>
                            3 - Profiter de la version Pro
                        </ol>
                    </ul>
                
                </>}
                </center>
            
            }
            
        </div>
    )
}

export default NotPro
