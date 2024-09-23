import {useState, forwardRef, useImperativeHandle} from "react";
import "../styling/global.css";

const Toggleable = forwardRef((props, refs) => {
    const [visible, setVisible] = useState(false);
    const handleToggle = () => {
        setVisible(!visible);
    }

    useImperativeHandle(refs, ()=>{
        return {handleToggle};
    })

    return (
        <>
            <button onClick={handleToggle} className={visible ? "hide" : ""}>{props.showText}</button>
            <div className={visible ? "" : "hide"}>
                {props.children}
                <button onClick={handleToggle}>Collapse</button>
            </div>
        </>
    )
})

export default Toggleable;