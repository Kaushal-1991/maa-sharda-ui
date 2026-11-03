import { useEffect, useState } from "react";
import {
  GalleryCategory,
  GalleryMediaRecord,
  getGalleryMedia,
} from "../Service/GalleryMediaService";

const useGalleryVideos = (categories: GalleryCategory[]) => {
  const [videos, setVideos] = useState<GalleryMediaRecord[]>([]);
  const categoryKey = categories.join(",");

  useEffect(() => {
    let cancelled = false;
    const requestedCategories = categoryKey
      .split(",")
      .filter((category): category is GalleryCategory =>
        ["events", "classes", "album"].includes(category),
      );

    Promise.allSettled(
      requestedCategories.map((category) => getGalleryMedia("videos", category)),
    ).then((results) => {
      if (cancelled) return;

      const records = results.flatMap((result) =>
        result.status === "fulfilled" ? result.value : [],
      );
      setVideos(
        records.sort((first, second) => second.createdAt - first.createdAt),
      );

      const failure = results.find(
        (result): result is PromiseRejectedResult =>
          result.status === "rejected",
      );
      if (failure) {
        console.error("Could not load gallery videos.", failure.reason);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [categoryKey]);

  return videos;
};

export default useGalleryVideos;
