export const fetchAllContacts = async (dispatch) => {

        const response = await fetch('https://playground.4geeks.com/contact/agendas/leinzr/contacts')
        try {
            if(!response.ok){
                throw new Error(response.status);
            }
            const data = await response.json();
            // console.log(data.contacts);
            dispatch({
                type:'fetchedContacts',
                payload: data.contacts,
            })
        }
        catch (error){
            console.error("Error getting agenda. Check if URL is incorrect or if agenda doesn't exist.". error)
        }
    }


export const addContact = async(name, address, phone, email, dispatch) => {
    const newContact = {
        name: name,
        address: address,
        phone: phone,
        email: email,
        
    }

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newContact)
    }

    const response = await fetch('https://playground.4geeks.com/contact/agendas/leinzr/contacts', options)
    try {
        if(!response.ok) {
            throw new Error('Error creating contact!', response.status)
        }
        const data = await response.json();
        dispatch({
            type: 'createdContact',
            payload: newContact,
        });
        console.log(data);
        
        return data;
    
    }
    catch (error){
        console.error('Error posting contact to the agenda', error)
    }
}

export const deleteContact = async(id, dispatch) => {
    const options = {
        method: 'DELETE',
    }
    const response = await fetch(`https://playground.4geeks.com/contact/agendas/leinzr/contacts/${id}`, options)
    try {
        if(!response.ok) {
            throw new Error('Error. Unable to delete contact!'. response.status);
        }
        dispatch({
            type: 'deletedContact',
            payload: {id: id },
        });
    } catch (error) {
        console.error('Error deleting contact from the agenda', error);
    }
}
