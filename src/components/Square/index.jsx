

const Square = (props) => {
    return (
        <div onClick={() => props.handleClick(props.index)}>
            <h4>{props.value}</h4>
        </div>
    )
}

export default Square;