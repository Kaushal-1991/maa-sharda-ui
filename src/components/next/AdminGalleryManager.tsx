"use client";

import { useCallback, useEffect, useState } from "react";

type GalleryType = "photos" | "videos";
type GalleryCategory = "events" | "classes" | "album";

type GalleryMedia = {
  id: string;
  type: GalleryType;
  category: GalleryCategory;
  name: string;
  size: number;
  createdAt: string;
  url: string;
};

const categoryLabels: Record<GalleryCategory, string> = {
  events: "Events",
  classes: "Classes",
  album: "Album",
};

export default function AdminGalleryManager({
  type,
}: Readonly<{ type: GalleryType }>) {
  const [media, setMedia] = useState<GalleryMedia[]>([]);
  const [category, setCategory] = useState<GalleryCategory>("classes");
  const [files, setFiles] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const maxFiles = type === "photos" ? 7 : 1;

  const loadMedia = useCallback(async () => {
    setIsLoading(true);
    setError("");
    try {
      const response = await fetch(`/api/admin/gallery?type=${type}`, {
        cache: "no-store",
      });
      const result = (await response.json()) as {
        media?: GalleryMedia[];
        error?: string;
      };
      if (!response.ok) {
        throw new Error(result.error || "Unable to load gallery media.");
      }
      setMedia(result.media ?? []);
    } catch (loadError) {
      setError(
        loadError instanceof Error ? loadError.message : "Unable to load gallery media.",
      );
    } finally {
      setIsLoading(false);
    }
  }, [type]);

  useEffect(() => {
    void loadMedia();
  }, [loadMedia]);

  async function handleUpload(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formElement = event.currentTarget;
    setError("");
    setMessage("");
    if (files.length < 1 || files.length > maxFiles) {
      setError(
        type === "photos"
          ? "Select one to seven photos for each upload."
          : "Select one video for each upload.",
      );
      return;
    }

    setIsSaving(true);
    try {
      const formData = new FormData();
      formData.set("type", type);
      formData.set("category", category);
      files.forEach((file) => formData.append("files", file));

      const response = await fetch("/api/admin/gallery", {
        method: "POST",
        body: formData,
      });
      const result = (await response.json()) as {
        media?: GalleryMedia[];
        error?: string;
      };
      if (!response.ok) {
        throw new Error(result.error || "Unable to upload gallery media.");
      }

      setFiles([]);
      formElement.reset();
      setMessage(
        type === "photos"
          ? `${result.media?.length ?? files.length} photo(s) uploaded successfully.`
          : "Video uploaded successfully.",
      );
      await loadMedia();
    } catch (uploadError) {
      setError(
        uploadError instanceof Error
          ? uploadError.message
          : "Unable to upload gallery media.",
      );
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDelete(item: GalleryMedia) {
    if (!window.confirm(`Delete "${item.name}" from the gallery?`)) {
      return;
    }
    setError("");
    setMessage("");
    try {
      const response = await fetch(
        `/api/admin/gallery?id=${encodeURIComponent(item.id)}`,
        { method: "DELETE" },
      );
      const result = (await response.json()) as { error?: string };
      if (!response.ok) {
        throw new Error(result.error || "Unable to delete gallery media.");
      }
      setMessage("Gallery media deleted.");
      await loadMedia();
    } catch (deleteError) {
      setError(
        deleteError instanceof Error
          ? deleteError.message
          : "Unable to delete gallery media.",
      );
    }
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const selected = Array.from(event.target.files ?? []);
    setFiles(selected);
    setError(
      selected.length > maxFiles
        ? type === "photos"
          ? "Choose no more than seven photos at a time."
          : "Choose one video at a time."
        : "",
    );
    setMessage("");
  }

  const title = type === "photos" ? "Gallery photos" : "Gallery videos";

  return (
    <section className="admin-gallery">
      <div className="admin-page-heading">
        <div>
          <p>MEDIA LIBRARY</p>
          <h1>{title}</h1>
          <span>
            {type === "photos"
              ? "Upload up to seven class photos at a time."
              : "Upload one video per submission."}
          </span>
        </div>
        <span className="admin-gallery__count">
          {media.length} {type === "photos" ? "photos" : "videos"}
        </span>
      </div>

      <form className="admin-gallery-upload" onSubmit={handleUpload}>
        <div className="admin-gallery-upload__intro">
          <span aria-hidden="true">{type === "photos" ? "▧" : "▷"}</span>
          <div>
            <h2>Add {type === "photos" ? "photos" : "a video"}</h2>
            <p>
              {type === "photos"
                ? "JPEG, PNG or WebP · up to 10 MB per photo · maximum seven per upload"
                : "MP4 or WebM · up to 30 MB"}
            </p>
          </div>
        </div>
        <div className="admin-gallery-upload__fields">
          <label className="admin-gallery-upload__field">
            <span>{type === "photos" ? "Show photos on" : "Collection"}</span>
            <select
              value={category}
              onChange={(event) => {
                const value = event.target.value;
                if (value === "events" || value === "classes" || value === "album") {
                  setCategory(value);
                }
              }}
            >
              {Object.entries(categoryLabels)
                .filter(([value]) => value === "classes")
                .map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
                ))}
            </select>
          </label>
          <label className="admin-gallery-upload__field admin-gallery-upload__file">
            <span>{type === "photos" ? "Choose photos" : "Choose a video"}</span>
            <input
              type="file"
              accept={type === "photos" ? "image/jpeg,image/png,image/webp" : "video/mp4,video/webm"}
              multiple={type === "photos"}
              onChange={handleFileChange}
            />
          </label>
          <button type="submit" className="button" disabled={isSaving || files.length === 0 || files.length > maxFiles}>
            {isSaving ? "Uploading..." : "Upload"}
          </button>
        </div>
        {files.length ? (
          <p className="admin-gallery-upload__selection" aria-live="polite">
            {files.length} file(s) selected: {files.map((file) => file.name).join(", ")}
          </p>
        ) : null}
        {error ? <p className="admin-error" role="alert">{error}</p> : null}
        {message ? <p className="admin-success" role="status">{message}</p> : null}
      </form>

      {isLoading ? <p className="admin-gallery__empty">Loading gallery…</p> : null}
      {!isLoading && !error && media.length === 0 ? (
        <p className="admin-gallery__empty">No {type} uploaded yet. Add the first one above.</p>
      ) : null}
      <div className="admin-gallery-grid">
        {media.map((item) => (
          <article className="admin-gallery-card" key={item.id}>
            <div className="admin-gallery-card__preview">
              {type === "photos" ? (
                <img src={item.url} alt={item.name} loading="lazy" />
              ) : (
                <video src={item.url} controls preload="metadata">
                  Your browser does not support video playback.
                </video>
              )}
            </div>
            <div className="admin-gallery-card__details">
              <div>
                <h2 title={item.name}>{item.name}</h2>
                <p>{categoryLabels[item.category]} · {new Date(item.createdAt).toLocaleDateString()}</p>
              </div>
              <button
                type="button"
                className="admin-gallery-card__delete"
                onClick={() => void handleDelete(item)}
                aria-label={`Delete ${item.name}`}
              >
                Delete
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
