import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  contactsOperations,
  contactsSlice,
  contactsSelectors,
} from '../../redux/contacts';
import styles from './ContactListItem.module.css';

const ContactListItem = ({ contactId }) => {
  const contact = useSelector(state =>
    contactsSelectors.getContactById(state, contactId),
  );
  const dispatch = useDispatch();

  return (
    <>
      {contact && (
        <li className="list-group-item list-group-item-action contact-list-item ">
          <div className={styles.contactInfo}>
            <p className={styles.name}>{contact.name} </p>
            <p className={styles.number}>{contact.number} </p>
          </div>

          <div className={styles.btnWrapper}>
            <button
              type="button"
              className="btn btn-info btn-edit"
              onClick={() =>
                dispatch(contactsSlice.items.actions.changeEditMode(contact.id))
              }
            >
              <i className="fas fa-pen"></i>
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={() =>
                dispatch(contactsOperations.deleteContact(contact.id))
              }
            >
              <i className="fas fa-trash-alt"></i>
            </button>
          </div>
        </li>
      )}
    </>
  );
};

export default ContactListItem;
