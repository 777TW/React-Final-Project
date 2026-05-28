import "./Button.css"

export default function Button( {color, content} ){
    return (
        <div className={`button ${color}`}>
            <b>{content}</b>
        </div>
    );
}