
import { useEffect, useState } from "react";
import Board from "./Board";
import StatHandler from "./StatHandler";

const GameArea = (props) => {

    const [init, setInitial] = useState([])

    useEffect(() => {
        fetch(props.map).then(req => req.json()).then(res => {
            setInitial(res.units)
        })
    }, [props.map])

    return (
        <div>
            <p style={{textAlign:"center"}}>{props.title}</p>
            <div style={{display:"flex", borderStyle:"solid", overflow:"auto", maxHeight:"50vh", maxWidth:"50vw", margin:"auto",}}>
                <Board key={init} initial={init} />
            </div>
            <StatHandler />
        </div>
    )
}

export default GameArea;