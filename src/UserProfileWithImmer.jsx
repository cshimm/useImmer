import {useImmer} from "use-immer";
import {useState} from "react";

export const UserProfileWithImmer = () => {
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [userProfile, setUserProfile] = useImmer({
        name: 'name',
        email: 'email',
        contactDetails: {
            phone: 'phone',
            address: 'address'
        },
        preferences: {
            newsletter: true,
            notifications: false
        }
    });
    const updateContactDetails = (phone, address) => {
        // Here we use useImmer's draft argument to easily update the nested state.
        // This allows us to simplify our workflow and avoid updating nested state with
        // the spread operator. This method is far more intuitive.
        setUserProfile(draft => {
            draft.contactDetails.phone = phone;
            draft.contactDetails.address = address;
        });
    }
    const toggleNewsletterSubscription = () => {
        setUserProfile(draft => {
            draft.preferences.newsletter = !draft.preferences.newsletter;
        });
    }
    return (
        <>
            <label htmlFor="phone">Phone:</label>
            <input type="text" id="phone" name="phone" value={phone}
                   onChange={(e) => setPhone(e.target.value)}/><br/><br/>

            <label htmlFor="address">Address:</label>
            <input type="text" id="address" name="address" value={address}
                   onChange={(e) => setAddress(e.target.value)}/><br/><br/>

            <button onClick={() => updateContactDetails(phone, address)}>Update Contact Info</button>
            <button onClick={toggleNewsletterSubscription}>Subscribe/Unsubscribe from newsletter</button>

            <div>
                <h2>Info for {userProfile.name}</h2>
                <p>{userProfile.contactDetails.phone}</p>
                <p>{userProfile.contactDetails.address}</p>
                <p>{userProfile.preferences.newsletter ? "Subscribed" : "Not Subscribed"}</p>
            </div>
        </>
    )
}