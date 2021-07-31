import React from "react"


export default function useModal(initial) {

    const [value, setValue] = React.useState(initial)

    const toggle = function (s) {
        setValue(s => !s)

    }
    return [value, toggle]
}