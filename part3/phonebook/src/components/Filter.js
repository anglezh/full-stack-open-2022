const Filter = ({ filter, filterPerson }) => {
    return (
        <div>filter shown with <input value={filter} onChange={filterPerson} /></div>
    )
}

export default Filter