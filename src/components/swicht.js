import React, { useState } from 'react';
import '../estilos/swicht.css'

const Switch = ({ onToggle }) => {
    const [isToggled, setToggled] = useState(false);
  
    const toggleSwitch = () => {
      setToggled(!isToggled);
      onToggle(!isToggled); // Llama a la función pasada como prop
    };
  
    return (
      <>
        <div className={`switch ${isToggled ? 'switch--toggled' : ''}`} onClick={toggleSwitch}>
          <div className="switch__circle"></div>
        </div>
      </>
    );
  };

export default Switch;

