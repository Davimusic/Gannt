import { useState, useEffect } from 'react';


export default function Label(props) {
    const [value, setValue] = useState(props.valor);

    const handleChange = (event) => {
        setValue(event.target.value)
        props.onValueChange(event.target.value);
    };//dispatch({ type: 'UPDATE_TASKS', payload: newTasks })

    return (
        <div>
            <input
                type="text"
                value={value}
                onChange={handleChange}
                style={{
                    color: 'black',
                    width: '100%',
                    padding: '12px 20px',
                    margin: '8px 0',
                    boxSizing: 'border-box',
                    borderRadius: '4px',
                    border: '2px solid #4CAF50',
                    transition: '0.5s',
                    outline: 'none',
                }}
            />
        </div>
    );
}
