import axiosInstance from "../Interceptor/AxioxInterceptor";

export type GalleryMediaType = "photos" | "videos";
export type GalleryCategory = "events" | "classes" | "album";

export interface GalleryMediaRecord {
  id: string;
  type: GalleryMediaType;
  category: GalleryCategory;
  name: string;
  file?: Blob;
  videoUrl?: string;
  createdAt: number;
}

interface VideoResponse {
  id: number;
  title: string | null;
  videoType: "EVENT" | "ALBUM" | "CLASS";
  videoUrl: string;
  originalFileName: string;
  createdAt: string;
}

const DATABASE_NAME = "maa-sharda-gallery";
const STORE_NAME = "media";
const DATABASE_VERSION = 1;

const videoTypeByCategory: Record<GalleryCategory, VideoResponse["videoType"]> = {
  events: "EVENT",
  album: "ALBUM",
  classes: "CLASS",
};

const categoryByVideoType: Record<VideoResponse["videoType"], GalleryCategory> = {
  EVENT: "events",
  ALBUM: "album",
  CLASS: "classes",
};

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

const mapVideoResponse = (video: VideoResponse): GalleryMediaRecord => {
  if (!video || typeof video !== "object") {
    throw new Error("The video API returned an invalid video record.");
  }

  if (!Object.prototype.hasOwnProperty.call(categoryByVideoType, video.videoType)) {
    throw new Error("The video API returned an unsupported video type.");
  }

  if (video.id === null || video.id === undefined) {
    throw new Error("The video API response is missing a video ID.");
  }

  if (typeof video.videoUrl !== "string" || video.videoUrl.trim() === "") {
    throw new Error("The video API response is missing the video URL.");
  }

  const createdAt = new Date(video.createdAt).getTime();
  if (!Number.isFinite(createdAt)) {
    throw new Error("The video API response has an invalid creation date.");
  }

  return {
    id: String(video.id),
    type: "videos",
    category: categoryByVideoType[video.videoType],
    name: video.originalFileName || video.title || `Video ${video.id}`,
    videoUrl: video.videoUrl,
    createdAt,
  };
};

const saveBrowserMedia = async (
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

export const saveGalleryMedia = async (
  files: File[],
  type: GalleryMediaType,
  category: GalleryCategory,
): Promise<GalleryMediaRecord[]> => {
  if (type === "photos") {
    return saveBrowserMedia(files, type, category);
  }

  const videos = await Promise.all(
    files.map(async (file) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("videoType", videoTypeByCategory[category]);
      const response = await axiosInstance.post<VideoResponse>(
        "/api/videos/upload",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } },
      );
      return mapVideoResponse(response.data);
    }),
  );

  return videos.sort((first, second) => second.createdAt - first.createdAt);
};

export const getGalleryMedia = async (
  type: GalleryMediaType,
  category: GalleryCategory,
): Promise<GalleryMediaRecord[]> => {
  if (type === "videos") {
    const response = await axiosInstance.get<VideoResponse[]>(
      `/api/videos/type/${videoTypeByCategory[category]}`,
    );

    if (!Array.isArray(response.data)) {
      throw new Error("The video gallery response was not a list.");
    }

    return response.data
      .map(mapVideoResponse)
      .filter((video) => video.category === category)
      .sort((first, second) => second.createdAt - first.createdAt);
  }

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

export const deleteGalleryMedia = async (
  id: string,
  type: GalleryMediaType,
): Promise<void> => {
  if (type === "videos") {
    await axiosInstance.delete(`/api/videos/delete/${id}`);
    return;
  }

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
