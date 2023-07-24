import { ITag } from "../../components/TagsList/TagsInfo";

export function getAllTagsFromIndexedDB(): Promise<ITag[]> {
  return new Promise((resolve, reject) => {
    const indexedDB = window.indexedDB;
    const request = indexedDB.open("TagsDB", 1);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      db.createObjectStore("tags", { keyPath: "id" });
    };

    request.onsuccess = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      const transaction = db.transaction("tags", "readonly");
      const notesDbStore = transaction.objectStore("tags");
      const getAllRequest: IDBRequest<ITag[]> = notesDbStore.getAll();

      getAllRequest.onsuccess = (event) => {
        const notes: ITag[] = getAllRequest.result;
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
