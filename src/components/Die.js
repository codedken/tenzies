function Die(props){
    const styles= {
        background: props.isHeld ? "#59E391" : "transparent"
    }
    return(
        <div style={styles} className="die-face" onClick={props.onClick}>
        <h3>{props.value}</h3>
      </div>
    )
}

export default Die;