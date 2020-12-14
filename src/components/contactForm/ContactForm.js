import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { contactsOperations, contactsSelectors } from '../../redux/contacts';
import styles from './ContactForm.module.css';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const dispatch = useDispatch();

  const collectionId = useSelector(state =>
    contactsSelectors.getCollectionId(state),
  );

  const handleSubmit = async e => {
    e.preventDefault();

    !collectionId && (await dispatch(contactsOperations.createCollection()));

    if (name.trim() && number.trim()) {
      await dispatch(contactsOperations.addContact({ name, number }));
      setName('');
      setNumber('');
    } else {
      alert('Please fill in the required fields');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <fieldset>
        <div className="form-group">
          <label htmlFor="nameInput" className={styles.formLabel}>
            Name*
          </label>
          <input
            type="text"
            className="form-control"
            name="name"
            id="nameInput"
            placeholder="Enter name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="numberInput" className={styles.formLabel}>
            Phone Number*
          </label>
          <input
            type="tel"
            className="form-control"
            name="number"
            id="numberInput"
            placeholder="Enter phone number"
            value={number}
            onChange={e => setNumber(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Add
        </button>
      </fieldset>
    </form>
  );
};

export default ContactForm;
