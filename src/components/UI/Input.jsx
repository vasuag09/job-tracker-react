export default function Input({name, id, label, ...props}){
    return (
        <>
            <label htmlFor={name}>{label}</label>
            <input name={name} id={id} {...props} />
        </>
    )
}