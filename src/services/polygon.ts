import type { Firestore } from "firebase/firestore";
import {
  collection,
  doc,
  getDocs,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import { GeoJSONPolygon } from "../models/polygon";

export async function getPolygon(db: Firestore) {
  const polygonCol = collection(db, "polygon");
  const polygonSnapshot = await getDocs(polygonCol);
  const polygonList: GeoJSONPolygon[] = polygonSnapshot.docs.map(
    (doc) => convertFromFirestoreData(doc.data()) as GeoJSONPolygon
  );
  return polygonList;
}

export async function setPolygon(db: Firestore, polygon: GeoJSONPolygon) {
  console.log("setPolygon", JSON.stringify(polygon));
  const polygonRef = doc(db, "polygon", polygon.id);
  await setDoc(polygonRef, convertToFirestoreData(polygon));
}

export async function removePolygon(db: Firestore, id: string) {
  try {
    const polygonRef = doc(db, "polygon", id);
    await deleteDoc(polygonRef);
    console.log(`Polygon with ID ${id} removed successfully.`);
  } catch (error) {
    console.error("Error removing polygon:", error);
  }
}

// Function to convert GeoJSONPolygon to Firestore-compatible data
function convertToFirestoreData(geoJSONPolygon: GeoJSONPolygon) {
  return {
    id: geoJSONPolygon.id,
    type: geoJSONPolygon.type,
    properties: { id: geoJSONPolygon.id },
    geometry: {
      coordinates: JSON.stringify(geoJSONPolygon.geometry.coordinates), // Convert coordinates to JSON string
      type: geoJSONPolygon.geometry.type,
    },
  };
}

// Function to revert Firestore data back to GeoJSONPolygon
function convertFromFirestoreData(data: any): GeoJSONPolygon {
  return {
    id: data.id,
    type: data.type,
    properties: { id: data.id },
    geometry: {
      coordinates: JSON.parse(data.geometry.coordinates), // Parse the JSON string back to an array
      type: data.geometry.type,
    },
  };
}
