// Minimal shims to unblock TypeScript when firebase package types are missing locally.
declare module "firebase/firestore" {
  export const getFirestore: any;
  export const collection: any;
  export const addDoc: any;
  export const getDocs: any;
  export const deleteDoc: any;
  export const updateDoc: any;
  export const doc: any;
  export const writeBatch: any;
  export const query: any;
  export const where: any;
  export const orderBy: any;
}
