import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ContactForm, ContactList, Filter } from '../../components';
import ResetButton from '../../components/resetButton/ResetButton';
import { contactsOperations, contactsSelectors } from '../../redux/contacts';
import styles from './ContactsView.module.css';

const useStyles = makeStyles(theme => ({
  content: {
    flexGrow: 1,
    padding: '20px',
    [theme.breakpoints.up('sm')]: {
      padding: '30px',
    },
    [theme.breakpoints.up('md')]: {
      padding: '50px',
    },
    [theme.breakpoints.up('lg')]: {
      padding: '100px',
    },
  },
}));

const ContactsView = () => {
  const contacts = useSelector(state => contactsSelectors.getContacts(state));

  const dispatch = useDispatch();

  const collectionId = useSelector(state =>
    contactsSelectors.getCollectionId(state),
  );

  useEffect(() => {
    dispatch(contactsOperations.setUserCollectionId());
  }, [dispatch]);

  useEffect(() => {
    collectionId && dispatch(contactsOperations.fetchContacts());
  }, [dispatch, collectionId]);

  const classes = useStyles();

  return (
    <Card className={classes.content}>
      <div className={styles.wrapper}>
        <ContactForm />
        <h2>Contacts</h2>

        {contacts && contacts.length > 1 && (
          <div className={styles.filters}>
            <Filter />
            <ResetButton />
          </div>
        )}

        {contacts.length > 0 ? <ContactList /> : <p>No contacts here yet</p>}
      </div>
    </Card>
  );
};

export default ContactsView;
