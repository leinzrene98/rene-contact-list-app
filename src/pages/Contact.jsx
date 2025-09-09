
import { useEffect } from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { ContactCard } from "../components/ContactCard";
import { fetchAllContacts, deleteContact } from "../lib/fetch";

export const Contact = () => {
    const { store, dispatch } = useGlobalReducer();

    useEffect(() => {
        fetchAllContacts(dispatch);
    }, [])

    return (
        <>
            <div className="container">
                {
                    !store && !store.contacts
                    ?
                    <h1>Loading...</h1>
                    :
                    store.contacts.map(contact => {
                        return (
                            <div className="card" key={contact.id}>
                                <ContactCard 
                                    name={contact.name}
                                    address={contact.address}
                                    phone={contact.phone}
                                    email={contact.email}
                                />
                                <button>Edit</button>
                                <button 
                                onClick={() => deleteContact(contact.id, dispatch)}
                                >Delete</button>
                            </div>
                        )
                    })
                }

            </div>
        </>
    );
}
