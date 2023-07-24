import { INote } from "../../components/NotesList/NotesInfo";

export function getAllNotesFromIndexedDB(): Promise<INote[]> {
  return new Promise((resolve, reject) => {
    const indexedDB = window.indexedDB;
    const request = indexedDB.open("NotesDB", 1);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      db.createObjectStore("notes", { keyPath: "id" });
    };

    request.onsuccess = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      const transaction = db.transaction("notes", "readonly");
      const notesDbStore = transaction.objectStore("notes");
      const getAllRequest: IDBRequest<INote[]> = notesDbStore.getAll();

      getAllRequest.onsuccess = (event) => {
        const notes: INote[] = getAllRequest.result;
        resolve(notes);
      };

      getAllRequest.onerror = (event) => {
        reject("Error getting notes from IndexedDB " + event);
      };
    };

    request.onerror = (event) => {
      reject("An error occurred with IndexedDB " + event);
    };
  });
}
