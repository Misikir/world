import type { Firestore } from 'firebase/firestore';
import {
  convertToFirestoreData,
  convertFromFirestoreData,
} from '../utilities/converter';
import {
  collection,
  doc,
  onSnapshot,
  setDoc,
  deleteDoc,
} from 'firebase/firestore';

import { GeoJSONPolygon } from '../models/polygon';

export function getPolygon(db: Firestore, setPolygonList: any) {
  const polygonCol = collection(db, 'polygon');

  // Subscribe to real-time changes using onSnapshot
  const unsubscribe = onSnapshot(polygonCol, (snapshot) => {
    const updatedPolygonList: GeoJSONPolygon[] = snapshot.docs.map(
      (doc) => convertFromFirestoreData(doc.data()) as GeoJSONPolygon,
    );
    setPolygonList(updatedPolygonList);
  });

  return unsubscribe;
}

export async function setPolygon(db: Firestore, polygon: GeoJSONPolygon) {
  console.log('setPolygon', JSON.stringify(polygon));
  const polygonRef = doc(db, 'polygon', polygon.id);
  await setDoc(polygonRef, convertToFirestoreData(polygon));
}

export async function removePolygon(db: Firestore, id: string) {
  try {
    const polygonRef = doc(db, 'polygon', id);
    await deleteDoc(polygonRef);
    console.log(`Polygon with ID ${id} removed successfully.`);
  } catch (error) {
    console.error('Error removing polygon:', error);
  }
}
