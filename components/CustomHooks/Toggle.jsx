import React from 'react'

function Toggle() {

    const handleToggle = () => {
        setState(s => !s)
    }

    const [state, setState] = React.useState()
    return [state, handleToggle]
}

