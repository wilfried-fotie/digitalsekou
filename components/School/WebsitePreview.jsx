import React from 'react'
import { SchoolContext } from '../../pages/addSchoolPro/[id]'
import useChangeBool from '../handleBool'
import Page from './Page'












function WebsitePreview() {

    const data = React.useContext(SchoolContext).data.schoolData.school
    const positions = React.useContext(SchoolContext).data.positions.positions
    const types = React.useContext(SchoolContext).data.types
    const spe = React.useContext(SchoolContext).data.spe
    const getPost = React.useContext(SchoolContext).data.getPost.posts


   
    
    return (
        <>
            <Page
                data={data}
                positions={positions}
                types={types}
                spe={spe}
                getPost={getPost}
            />
        </>
    )
}

export default WebsitePreview


export function Tr({spe}) {
    return (<tr>
        <td style={{ textAlign: "left!important" }}>{spe.name}</td>
        <td>{spe.prix}</td>
    </tr>)
}

export function Th({ spe }) {
    return (<tr>
        <td colSpan="2" style={{color: "#4a00b4" }}>{spe.fil}</td>
        
    </tr>)
}

