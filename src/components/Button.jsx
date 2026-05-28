import "./Button.css"

export default function Button( {color, content, onClick} ){
    return (
        <div className={`button ${color ? color : ''}`} onClick={onClick}>
            <b>{content}</b>
        </div>
    );
}