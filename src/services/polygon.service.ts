import type { Firestore } from 'firebase/firestore';
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  setDoc,
} from 'firebase/firestore';
import {
  convertFromFirestoreData,
  convertToFirestoreData,
} from '../utilities/converter';

import { MapboxFeature, Polygon } from '../models/polygon';

export function getPolygon(
  db: Firestore,
  setPolygonList: React.Dispatch<React.SetStateAction<MapboxFeature[]>>,
) {
  const polygonCol = collection(db, 'polygon');

  // Subscribe to real-time changes using onSnapshot
  const unsubscribe = onSnapshot(polygonCol, (snapshot) => {
    const updatedPolygonList = snapshot.docs.map((doc) =>
      convertFromFirestoreData(doc.data() as Polygon),
    );
    setPolygonList(updatedPolygonList);
  });

  return unsubscribe;
}

export async function setPolygon(db: Firestore, feature: MapboxFeature) {
  try {
    console.log('setPolygon', feature);

    const polygonRef = doc(db, 'polygon', feature.id as string);
    await setDoc(polygonRef, convertToFirestoreData(feature));
  } catch (error) {
    console.error('Error setting polygon:', error);
  }
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
