

const StatHandler = ({stats}) => {

    return (
        <div style={{
            maxWidth: "15vw",
            margin: "auto"
        }}>
            {stats ? <p>Health: {stats.health}</p> : <p>Nothing Selected</p>}
        </div>
    )
}

export default StatHandler;