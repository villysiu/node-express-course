const { people } = require("../data");

const getPeople = (req, res) => {
    res.json(people);
}

const getPersonById = (req, res) => {
    const idToFind = parseInt(req.params.id);
    const person = people.find((person) => person.id === idToFind);

    if(!person){
        return res.status(404).json({ success: false, message: `No person with id ${idToFind}` });
    }
    return res.status(200).json({ success: true, data: person });


}

const addPerson = (req, res) => {
    const {name} = req.body;
    if(!name)
        return res.status(400).json({ success: false, message: "Please provide a name" });

    people.push({ id: people.length + 1, name: req.body.name });
    return res.status(201).json({ success: true, name: req.body.name });
}

const updatePerson = (req, res) => {
    const idToUpdate = parseInt(req.params.id);
    const { name } = req.body;
    const person = people.find((person) => person.id === idToUpdate);

    if(!person){
        return res.status(404).json({ success: false, message: `No person with id ${idToUpdate}` });
    }

    if(!name){
        return res.status(400).json({ success: false, message: "Please provide a name" });
    }

    person.name = name;
    return res.status(200).json({ success: true, data: person });
}

const deletePerson = (req, res) => {
    const idToDelete = parseInt(req.params.id);
    const personIndex = people.findIndex((person) => person.id === idToDelete);
    
    if(personIndex === -1){
        return res.status(404).json({ success: false, message: `No person with id ${idToDelete}` });
    }       
    // const updatedPeople = people.filter((person) => person.id !== idToDelete); //filter replace the array, cannot use with constance
    // return res.status(200).json({ success: true, data: updatedPeople });

    people.splice(personIndex, 1);
    return res.status(200).json({ success: true, data: people });   
}



module.exports = { addPerson, getPeople, getPersonById, updatePerson, deletePerson };    


