import {useImmer} from "use-immer";
import {useState} from "react";

export const ShoppingListWithImmer = () => {
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [category, setCategory] = useState('');
    const [notes, setNotes] = useState('');
    const [shoppingList, setShoppingList] = useImmer([]);
    const addItem = (name = '', qty = 1, category = '', notes = '') => {
        const id = Date.now();
        const newItem = {
            id,
            name,
            qty,
            details: {
                category,
                notes
            }
        };
        // I use useImmer to easily update the list of shopping items with the draft argument.
        setShoppingList(draft => {
            draft.push(newItem);
        });
    }
    const updateItem = (id) => {
        //Here I check if the id passed in matches any in the shopping list.
        // if so we can easily update values using dot notation rather than
        // using the spread operator on a nested object.
        // The update values are arbitrary but from ths example we can see
        // the power of useImmer to update complex objects.
        setShoppingList(draft => {
            draft.map(item => {
                if (item.id === id) {
                    item.name = 'update name';
                    item.qty = item.qty === '' ? 0 : parseInt(item.qty) + 1;
                    item.details.category = 'updated category';
                    item.details.notes = 'updated notes';
                }
                return item;
            });
        })
    }
    const removeItem = (id) => {
        //Check for an existing item who's id matches the id passed in
        const existing = shoppingList.filter(item => item.id === id)[0];
        if (!existing) return;
        // If there is a matching item then save its index and splice it out of the
        // items array.
        const existingIndex = shoppingList.indexOf(existing);
        setShoppingList(draft => {
            draft.splice(existingIndex, 1);
        });
    }
    return (
        <>
            <div>
                <label htmlFor="name">Name:</label>
                <input type="text" value={name}
                       onChange={(e) => setName(e.target.value)}/><br/><br/>

                <label htmlFor="quantity">Quantity:</label>
                <input type="text" value={quantity}
                       onChange={(e) => setQuantity(e.target.value)}/><br/><br/>

                <label htmlFor="category">Category:</label>
                <input type="text" value={category}
                       onChange={(e) => setCategory(e.target.value)}/><br/><br/>

                <label htmlFor="notes">Notes:</label>
                <input type="text" value={notes}
                       onChange={(e) => setNotes(e.target.value)}/><br/><br/>

                <button onClick={() => addItem(name, quantity, category, notes)}>Add Item to cart</button>

            </div>
            <h2>Items in Cart</h2>
            {
                shoppingList.map(item => {
                    return <div key={item.id}>
                        <p>Name: {item.name}</p>
                        <p>Quantity: {item.qty}</p>
                        <p>Category: {item.details.category}</p>
                        <p>Notes: {item.details.notes}</p>
                        <button onClick={() => removeItem(item.id)}>Remove</button>
                        <button onClick={() => updateItem(item.id)}>Update</button>
                    </div>
                })
            }
        </>
    );
}