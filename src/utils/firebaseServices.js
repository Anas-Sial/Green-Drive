import { STORAGE } from '../enums/AppEnums'
import auth from '@react-native-firebase/auth'
import storage from '@react-native-firebase/storage'
import firestore from '@react-native-firebase/firestore'
import { isIOS } from './Helpers'

export async function saveData(collection, doc, jsonObject, merge = true) {
    await firestore()
        .collection(collection)
        .doc(doc)
        .set(jsonObject, { merge })
        .catch(function (error) {
            console.error('Error writing document: ', error)
        })
    console.log('Document successfully written!')
}

export const saveDataInDocument = async (collection, doc, data) => {
    try {
        const docRef = firestore().collection(collection).doc(doc)
        await docRef.set(data, { merge: true })
        const newDoc = await docRef.get()
        return true
        // return newDoc?._data

    } catch (error) {
        console.error('Error writing document: ', error)
        return false
    }
}

export const addDocument = async (collection, jsonObject) => {
    const docRef = firestore().collection(collection).doc();
    jsonObject.documentId = docRef.id;
    jsonObject.createdAt = firestore.FieldValue.serverTimestamp(),
        await docRef
            .set(jsonObject, { merge: true })
            .catch(function (error) {
                console.error('Error writing document: ', error)
            })
    // console.log('Document successfully written!')
}

export const uploadImage = async (path, folder = STORAGE.IMAGES) => {
    const uri = path
    const filename = uri?.substring(uri?.lastIndexOf('/') + 1)
    const uploadUri = isIOS() ? uri?.replace('file://', '') : uri
    const task = storage().ref(`${folder}/${filename}`).putFile(uploadUri)
    try {
        await task
        const url = await storage().ref(`${folder}/${filename}`).getDownloadURL()
        return { uri: url, name: filename }
    } catch (e) {
        console.log(e)
        return 'false'
    }
}

export const deleteImage = async (folder, filename) => {
    try {
        await storage().ref(`${folder}/${filename}`).delete()
        console.log('Image deleted successfully')
        return true
    } catch (e) {
        console.log('Error deleting image', e)
        return 'false'
    }
}

export const getDocumentData = async (collection, doc) => {
    let found = {}
    await firestore()
        .collection(collection)
        .doc(doc)
        .get()
        .then((doc) => {
            if (doc.exists) {
                found = { ...doc.data() }
            }
        })
    return found
}

export const getCollectionData = async (collection) => {
    let data = []
    let querySnapshot = await firestore().collection(collection).get()
    querySnapshot.forEach(function (doc) {
        if (doc?.exists) {
            data.push({ ...doc.data() })
        } else {
            console.log('No document found!')
        }
    })
    return data
}

export async function getAllOfCollectionWhere(collection, key, id) {
    let data = [];
    let querySnapshot = await firestore()
        .collection(collection)
        .where(key, '==', id)
        .get();
    querySnapshot.forEach(function (doc) {
        if (doc.exists) {
            data.push({ ...doc.data(), doc_id: doc?.id });
        } else {
            console.log('No document found!');
        }
    });
    return data;
}


export async function getAllOfCollectiondoublewhere(
    collection,
    key,
    id,
    key1,
    id1,
  ) {
    let data = [];
    let querySnapshot = await firestore()
      .collection(collection)
      .where(key, '==', id)
      .where(key1, '==', id1)
      .get();
    querySnapshot.forEach(function (doc) {
      if (doc.exists) {
        data.push(doc.data());
      } else {
        console.log('No document found!');
      }
    });
    return data;
  }
  
export async function Delete(collection, doc) {
    await firestore().collection(collection).doc(doc).delete();
  }