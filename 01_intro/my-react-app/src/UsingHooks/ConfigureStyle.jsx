import {useState} from "react";

export  const ConfigureStyle = () => {

    const [bgColor, setBgColor] = useState('#ffffff');
    const [fontSize, setFontSize] = useState(16);
    const [color, setColor] = useState('#000000');

    return(
        <div style={{backgroundColor: bgColor}}>
            <h1 style={{fontSize: fontSize, color: color }}> Configure Styles</h1>
            <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)}/><br/>
            <input type="number" value={fontSize} onChange={(e) => setFontSize(Number(e.target.value))}/><br/>
            <input type="color" value={color} onChange={(e) => setColor(e.target.value)}/><br/>
        </div>
    )
}