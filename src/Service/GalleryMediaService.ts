export type GalleryMediaType = "photos" | "videos";
export type GalleryCategory = "events" | "classes" | "album";

export interface GalleryMediaRecord {
  id: string;
  type: GalleryMediaType;
  category: GalleryCategory;
  name: string;
  file: Blob;
  createdAt: number;
}

const DATABASE_NAME = "maa-sharda-gallery";
const STORE_NAME = "media";
const DATABASE_VERSION = 1;

let databasePromise: Promise<IDBDatabase> | null = null;

const openDatabase = (): Promise<IDBDatabase> => {
  if (typeof indexedDB === "undefined") {
    return Promise.reject(
      new Error("This browser does not support local gallery storage."),
    );
  }

  if (!databasePromise) {
    databasePromise = new Promise((resolve, reject) => {
      const request = indexedDB.open(DATABASE_NAME, DATABASE_VERSION);

      request.onupgradeneeded = () => {
        const database = request.result;
        if (!database.objectStoreNames.contains(STORE_NAME)) {
          database.createObjectStore(STORE_NAME, { keyPath: "id" });
        }
      };

      request.onsuccess = () => {
        const database = request.result;
        database.onversionchange = () => database.close();
        resolve(database);
      };

      request.onerror = () => {
        databasePromise = null;
        reject(request.error ?? new Error("Could not open gallery storage."));
      };

      request.onblocked = () => {
        databasePromise = null;
        reject(new Error("Gallery storage is blocked by another browser tab."));
      };
    });
  }

  return databasePromise;
};

export const saveGalleryMedia = async (
  files: File[],
  type: GalleryMediaType,
  category: GalleryCategory,
): Promise<GalleryMediaRecord[]> => {
  const database = await openDatabase();

  return new Promise((resolve, reject) => {
    const transaction = database.transaction(STORE_NAME, "readwrite");
    const store = transaction.objectStore(STORE_NAME);
    const records = files.map((file) => ({
      id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      type,
      category,
      name: file.name,
      file,
      createdAt: Date.now(),
    }));

    records.forEach((record) => store.add(record));
    transaction.oncomplete = () => resolve(records);
    transaction.onerror = () =>
      reject(transaction.error ?? new Error("Could not save gallery files."));
    transaction.onabort = () =>
      reject(transaction.error ?? new Error("Saving gallery files was aborted."));
  });
};

export const getGalleryMedia = async (
  type: GalleryMediaType,
  category: GalleryCategory,
): Promise<GalleryMediaRecord[]> => {
  const database = await openDatabase();

  return new Promise((resolve, reject) => {
    const transaction = database.transaction(STORE_NAME, "readonly");
    const request = transaction.objectStore(STORE_NAME).getAll();

    request.onsuccess = () => {
      const records = (request.result as GalleryMediaRecord[])
        .filter((record) => record.type === type && record.category === category)
        .sort((first, second) => second.createdAt - first.createdAt);
      resolve(records);
    };
    request.onerror = () =>
      reject(request.error ?? new Error("Could not load gallery files."));
  });
};

export const deleteGalleryMedia = async (id: string): Promise<void> => {
  const database = await openDatabase();

  return new Promise((resolve, reject) => {
    const transaction = database.transaction(STORE_NAME, "readwrite");
    transaction.objectStore(STORE_NAME).delete(id);
    transaction.oncomplete = () => resolve();
    transaction.onerror = () =>
      reject(transaction.error ?? new Error("Could not remove gallery file."));
    transaction.onabort = () =>
      reject(transaction.error ?? new Error("Removing gallery file was aborted."));
  });
};
