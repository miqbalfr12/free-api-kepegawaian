import {
 collection,
 doc,
 getDoc,
 getDocs,
 getFirestore,
 orderBy,
 query,
 where,
 addDoc,
 limitToLast,
 updateDoc,
 deleteDoc,
 setDoc,
} from "firebase/firestore";
import app from "@/lib/firebase/init";

const firestore = getFirestore(app);

export async function retrieveData(collectiongName) {
 const snapshot = await getDocs(collection(firestore, collectiongName));
 const data = snapshot.docs.map((doc) => ({
  id: doc.id,
  ...doc.data(),
 }));

 return data;
}

export async function retrieveDataById(collectionName, id) {
 const snapshot = await getDoc(doc(firestore, collectionName, id));
 const data = snapshot.data();
 if (data) data.id = snapshot.id;
 return data;
}

export async function filterDataById(collectionName, by, id) {
 console.log(collectionName, by, id);
 const q = query(collection(firestore, collectionName), where(by, "==", id));
 const querySnapshot = await getDocs(q);

 const result = [];
 querySnapshot.forEach((doc) => {
  const data = doc.data();
  data.id = doc.id;
  result.push(data);
 });

 return result;
}

export async function addData(collectionName, data, customId = null) {
 try {
  let docRef;
  if (customId) {
   // Buat referensi dokumen dengan ID kustom
   docRef = doc(collection(firestore, collectionName), customId);
   await setDoc(docRef, data);
   console.log("Document written with custom ID: ", customId);
  } else {
   docRef = await addDoc(collection(firestore, collectionName), data);
   console.log("Document written with auto-generated ID: ", docRef.id);
  }
  console.log("Document: ", docRef);
  return docRef;
 } catch (error) {
  console.error("Error adding document: ", error);
  throw error;
 }
}

export async function updateData(collectiongName, id, data) {
 const docRef = doc(firestore, collectiongName, id);
 await updateDoc(docRef, data);
 return true;
}

export async function deleteData(collectiongName, id) {
 const docRef = doc(firestore, collectiongName, id);
 await deleteDoc(docRef);
 return true;
}
