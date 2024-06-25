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

export async function filterDataById(collectionName, id) {
 console.log(collectionName, id);
 const q = query(
  collection(firestore, collectionName),
  where("pegawai", "==", id)
 );
 const querySnapshot = await getDocs(q);

 const result = [];
 querySnapshot.forEach((doc) => {
  const data = doc.data();
  data.id = doc.id;
  result.push(data);
 });

 return result;
}

export async function addData(collectiongName, data) {
 const docRef = await addDoc(collection(firestore, collectiongName), data);
 console.log("Document written with ID: ", docRef.id);
 console.log("Document: ", docRef);
 return docRef;
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
