export function CreateSelect({name, value, options, event}) {
    //alert(`name: ${JSON.stringify(name)}, value: ${JSON.stringify(value)}, option: ${JSON.stringify(value)}, evento: ${JSON.stringify(event)}`)
    return (
        <select className="select-moderno resaltar" name={name} value={value} onChange={event}>
            {options.map((option, index) => (
                <option key={index} value={option}>
                    {option}
                </option>
            ))}
        </select>
    );
}