import React from "react"


const getSchool = React.useCallack(function getSchool() {
const [school, setSchool] = React.useState()

    return school
}, [school])

