import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { contactsOperations, contactsSlice } from "../../redux/contacts";
import styles from "./EditForm.module.css";

const EditForm = ({ editedContact }) => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  useEffect(() => {
    const { name, number } = editedContact;
    setName(name);
    setNumber(number);
  }, [editedContact]);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name.trim && number.trim()) {
      dispatch(
        contactsOperations.editContact(editedContact, {
          name,
          number,
        })
      );

      setName("");
      setNumber("");

      dispatch(contactsSlice.items.actions.changeEditMode(editedContact.id));
    } else {
      alert("Please fill in the required fields");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formEdit}>
      <input
        type="text"
        className="form-control edit-input"
        name="name"
        placeholder="Enter name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="tel"
        className="form-control edit-input"
        name="number"
        placeholder="Enter phone number"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
      />
      <button type="submit" className="btn btn-success edit-button">
        <i className="far fa-save"></i>
      </button>
    </form>
  );
};

export default EditForm;
