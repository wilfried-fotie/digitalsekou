import { useState } from 'react'

export default function useChangeBool(init) {

    const [state, setState] = useState(init)
    const handleState = (s) => {
        if (s) return s
        setState(s => !s)
    }
    return [state, handleState]
}
