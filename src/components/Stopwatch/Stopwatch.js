function Stopwatch(props) {
    const {time} = props;

    return <div className="time">
        <div>{('0' + Math.floor((time / (1000 * 60 * 60)) % 24)).slice(-2)}</div>
        <span>:</span>
        <div>{('0' + Math.floor(time / 6000)).slice(-2)}</div>
        <span>:</span>
        <div>{('0' + Math.floor((time / 100) % 60)).slice(-2)}</div>
    </div>
};

export default Stopwatch;