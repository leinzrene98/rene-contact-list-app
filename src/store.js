// export const initialStore=()=>{
//   return{
//     // message: null,
//     // todos: [
//     //   {
//     //     id: 1,
//     //     title: "Make the bed",
//     //     background: null,
//     //   },
//     //   {
//     //     id: 2,
//     //     title: "Do my homework",
//     //     background: null,
//     //   }
//     // ]
//      contacts: []
//   }
// }

// export default function storeReducer(store, action = {}) {
//   switch(action.type){

//     case 'fetchedContacts':
//       const contactArray = action.payload;
//       return {
//         ...store,
//         contacts: [...contactArray]
//       }
//     case 'createdContact':
//         const newContact = action.payload;
//         return{
//           ...store,
//           contacts: [...store.contacts, newContact]
//         }
//     case 'editedContact':
//       break;
//     case 'deletedContact':
//       const { id } = action.payload;
//       return {
//         ...store,
//         contacts: store.contacts.filter(contact => contact.id !== id)
//       }
//     default:
//       throw Error('Unknown action.');
//   }    
// }

export const initialStore = () => {
  return {
    contacts: []
  }
}

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case 'fetchedContacts':
      const contactArray = action.payload;
      return {
        ...store,
        contacts: [...contactArray]
      };

    case 'createdContact':
      const newContact = action.payload;
      return {
        ...store,
        contacts: [...store.contacts, newContact]
      };

    case 'editedContact':
      const updatedContact = action.payload;
      return {
        ...store,
        contacts: store.contacts.map(contact =>
          contact.id === updatedContact.id ? updatedContact : contact
        )
      };

    case 'deletedContact':
      const { id } = action.payload;
      return {
        ...store,
        contacts: store.contacts.filter(contact => contact.id !== id)
      };

    default:
      throw Error('Unknown action.');
  }
}