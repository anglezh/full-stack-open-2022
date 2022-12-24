const Persons = ({ person, deletePerson }) => {

    return (
        <div key={person.id}>
            {person.name} {person.number}<button key={person.id} onClick={deletePerson}>delete</button>
        </div>
    )
}
export default Persons