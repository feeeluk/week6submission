import { useState } from "react"

export function Upgrade ({name}) {

    const [count, setCount] = useState(0)
    return (
        <div onClick={() => setCount(count + 1)}>
            {name} (x{count})
        </div>
    )
}