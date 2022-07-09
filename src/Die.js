// import "bootstrap/dist/css/bootstrap.min.css";

export default function Die(props) {
  const styles = {
    backgroundColor: props.isHeld ? "#59E391" : "white",
  };
  return (
    <div
      className="col-auto d-flex p-2 mx-1 my-3"
      id="b_i"
      style={styles}
      onClick={props.Hold}
    >
      <p className="m-auto">{props.value}</p>
    </div>
  );
}
