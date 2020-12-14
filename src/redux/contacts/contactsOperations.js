import db from "../../config";
import contactsSlice from "./contactsSlice";

const collectionConfig = {
  title: "phoneBook",
  contactsUser: "userData",
};

const getCollectionPath = (state) => {
  const collectionId = state.contacts.collectionId;

  return (
    collectionId &&
    db.firestore
      .collection(collectionConfig.title)
      .doc(collectionId)
      .collection(collectionConfig.contactsUser)
  );
};

const findCollection = async (state) => {
  const uid = state.auth.uid;

  const collection = await db.firestore.collection(collectionConfig.title);
  return await collection.where("uid", "==", uid).get();
};

const createCollection = () => async (dispatch, getState) => {
  const userName = getState().auth.user.name;
  const uid = getState().auth.uid;

  dispatch(contactsSlice.loading.actions.createCollectionRequest());

  try {
    await db.firestore
      .collection(collectionConfig.title)
      .add({ uid, userName });

    const userCollection = await findCollection(getState());

    userCollection.docs.forEach((elem) => {
      dispatch(
        contactsSlice.collectionId.actions.createCollectionSuccess(elem.id)
      );
    });
  } catch (error) {
    dispatch(contactsSlice.error.actions.createCollectionError(error.message));
  }
};

const setUserCollectionId = () => async (dispatch, getState) => {
  const { uid } = getState().auth;
  if (!uid) return;

  dispatch(contactsSlice.loading.actions.getCollectionIdRequest());

  try {
    dispatch(contactsSlice.collectionId.actions.getCollectionIdSuccess(null));

    const userCollection = await findCollection(getState());

    userCollection &&
      userCollection.docs.forEach((elem) => {
        dispatch(
          contactsSlice.collectionId.actions.getCollectionIdSuccess(elem.id)
        );
      });
  } catch (error) {
    dispatch(contactsSlice.error.actions.getCollectionIdError(error.message));
  }
};

const addContact = ({ name, number }) => async (dispatch, getState) => {
  const contacts = getState().contacts.items;
  const existingContact = contacts.find((contact) => contact.name === name);
  if (existingContact) {
    alert(`${name} already exists`);
    return;
  }

  const contact = {
    name,
    number,
    isInEditMode: false,
  };

  dispatch(contactsSlice.loading.actions.addContactRequest());

  try {
    const userCollection = getCollectionPath(getState());

    await userCollection.add({ contact });
    const data = await userCollection.get();

    const contacts = data.docs.map((doc) => ({
      id: doc.id,
      ...doc.data().contact,
    }));

    dispatch(contactsSlice.items.actions.addContactSuccess(contacts));
  } catch (error) {
    dispatch(contactsSlice.error.actions.addContactError(error.message));
  }
};

const fetchContacts = () => async (dispatch, getState) => {
  const collectionId = getState().contacts.collectionId;

  if (collectionId) {
    dispatch(contactsSlice.loading.actions.fetchContactsRequest());

    try {
      const userCollection = getCollectionPath(getState());

      const data = await userCollection.get();

      const contacts = data.docs.map((doc) => ({
        id: doc.id,
        ...doc.data().contact,
      }));

      dispatch(contactsSlice.items.actions.fetchContactsSuccess(contacts));
    } catch (error) {
      dispatch(contactsSlice.error.actions.fetchContactsError(error.message));
    }
  }
};

const deleteContact = (id) => async (dispatch, getState) => {
  dispatch(contactsSlice.loading.actions.deleteContactRequest());

  try {
    const userCollection = getCollectionPath(getState());
    await userCollection.doc(id).delete();

    dispatch(contactsSlice.items.actions.deleteContactSuccess(id));
  } catch (error) {
    dispatch(contactsSlice.error.actions.deleteContactError(error.message));
  }
};

const editContact = (editedContact, { name, number }) => async (
  dispatch,
  getState
) => {
  dispatch(contactsSlice.loading.actions.editContactRequest());

  const newContact = {
    ...editedContact,
    name,
    number,
    isInEditMode: false,
  };

  try {
    const userCollection = getCollectionPath(getState());
    await userCollection.doc(editedContact.id).update({
      contact: newContact,
    });

    dispatch(contactsSlice.items.actions.editContactSuccess(newContact));
  } catch (error) {
    dispatch(contactsSlice.error.actions.editContactError(error.message));
  }
};

export default {
  setUserCollectionId,
  createCollection,
  addContact,
  fetchContacts,
  deleteContact,
  editContact,
};
