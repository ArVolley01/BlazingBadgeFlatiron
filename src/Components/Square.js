

const Square = (props) => {

    const lit = props.lit;


    let tile = props.tile ? props.tile : "grasstile.png";

    let toMove = () => {
        if (tile === "highlighted_grass.png") {
            props.move(props.row, props.col)
        }
    }

    

    return (
        <div onClick={toMove} style={{
            width: "49px",
            height: "49px",
            border: "1px solid",
            display: "flex",
            placeContent: "center",
            backgroundImage: lit ? `url(${tile})` : "url(fog.png)",
            backgroundSize: "100% 100%",
        }}>
            {props.children ? props.children : <p style={{fontSize:"0.2em"}}>{`${props.row}, ${props.col}`}</p>}
        </div>
    )
}

export default Square;