import { ChangeEvent, useEffect, useState } from "react";
import {
  ActionIcon,
  Badge,
  Button,
  Card,
  Container,
  Group,
  SimpleGrid,
  Stack,
  Tabs,
  Text,
  Title,
} from "@mantine/core";
import {
  IconCalendarEvent,
  IconPhoto,
  IconSchool,
  IconTrash,
  IconUpload,
  IconVideo,
} from "@tabler/icons-react";
import {
  deleteGalleryMedia,
  GalleryCategory,
  GalleryMediaRecord,
  GalleryMediaType,
  getGalleryMedia,
  saveGalleryMedia,
} from "../../../Service/GalleryMediaService";
import {
  successNotification,
} from "../../../Utility/NotificationUtil";

interface AdminGalleryProps {
  mediaType: GalleryMediaType;
}

const categoryLabels: Record<GalleryCategory, string> = {
  events: "Events",
  classes: "Classes",
  album: "Album",
};

const AdminGallery = ({ mediaType }: AdminGalleryProps) => {
  const [category, setCategory] = useState<GalleryCategory>("events");
  const [media, setMedia] = useState<GalleryMediaRecord[]>([]);
  const [mediaUrls, setMediaUrls] = useState<{ id: string; url: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [removingId, setRemovingId] = useState<string | null>(null);

  const isPhotos = mediaType === "photos";
  const categories: GalleryCategory[] = isPhotos
    ? ["events", "classes"]
    : ["events", "classes", "album"];
  const activeCategory =
    isPhotos && category === "album" ? "events" : category;
  const visibleMedia = media.filter(
    (record) => record.type === mediaType && record.category === activeCategory,
  );
  const uploadAccept = isPhotos ? "image/*" : "video/*";
  const mediaLabel = isPhotos ? "photos" : "videos";
  const mediaIcon = isPhotos ? (
    <IconPhoto size={26} stroke={1.8} color="#9f1239" />
  ) : (
    <IconVideo size={26} stroke={1.8} color="#b7791f" />
  );

  useEffect(() => {
    if (isPhotos && category === "album") setCategory("events");
  }, [category, isPhotos]);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setMedia([]);

    getGalleryMedia(mediaType, activeCategory)
      .then((records) => {
        if (!cancelled) {
          setMedia(
            records.filter(
              (record) =>
                record.type === mediaType && record.category === activeCategory,
            ),
          );
        }
      })
      .catch((error: unknown) => {
        if (!cancelled) {
          setMedia([]);
          console.error("Could not load gallery uploads.", error);
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [activeCategory, mediaType]);

  useEffect(() => {
    const objectUrls: string[] = [];
    const urls = media.flatMap((record) => {
      if (record.videoUrl) return [{ id: record.id, url: record.videoUrl }];
      if (!record.file) return [];

      const url = URL.createObjectURL(record.file);
      objectUrls.push(url);
      return [{ id: record.id, url }];
    });
    setMediaUrls(urls);
    return () => objectUrls.forEach((url) => URL.revokeObjectURL(url));
  }, [media]);

  const handleUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.currentTarget.files ?? []);
    event.currentTarget.value = "";
    if (files.length === 0) return;

    const hasInvalidFile = files.some(
      (file) => !file.type.startsWith(isPhotos ? "image/" : "video/"),
    );
    if (hasInvalidFile) {
      return;
    }

    if (!isPhotos && files.some((file) => file.size > 30 * 1024 * 1024)) {
      return;
    }

    setSaving(true);
    try {
      const savedRecords = await saveGalleryMedia(files, mediaType, activeCategory);
      setMedia((current) =>
        [...savedRecords, ...current].sort(
          (first, second) => second.createdAt - first.createdAt,
        ),
      );
      successNotification(
        `${savedRecords.length} ${mediaLabel} uploaded successfully.`,
      );
    } catch (error: unknown) {
      console.error("Could not upload gallery files.", error);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (record: GalleryMediaRecord) => {
    setRemovingId(record.id);
    try {
      await deleteGalleryMedia(record.id, mediaType);
      setMedia((current) => current.filter((item) => item.id !== record.id));
      successNotification("Gallery file removed.");
    } catch (error: unknown) {
      console.error("Could not remove gallery file.", error);
    } finally {
      setRemovingId(null);
    }
  };

  return (
    <Container fluid className="admin-gallery-page">
      <Stack gap="lg">
        <Group justify="space-between" align="center" className="admin-gallery-heading">
          <Group gap="md">
            <div className="admin-gallery-heading__icon">{mediaIcon}</div>
            <div>
              <Text size="xs" fw={700} tt="uppercase" c="dimmed" lts={1}>
                Gallery management
              </Text>
              <Title order={2}>Manage {mediaLabel}</Title>
              <Text c="dimmed" size="sm">
                Upload files for the public {mediaLabel} gallery.
              </Text>
            </div>
          </Group>
          <Badge color="yellow" variant="light" size="lg">
            {isPhotos ? "Stored in this browser" : "Stored in cloud gallery"}
          </Badge>
        </Group>

        <Tabs
          value={category}
          onChange={(value) => {
            if (categories.includes(value as GalleryCategory)) {
              setCategory(value as GalleryCategory);
            }
          }}
          variant="pills"
          className="admin-gallery-tabs"
        >
          <Tabs.List>
            <Tabs.Tab value="events" leftSection={<IconCalendarEvent size={18} color="#b7791f" />}>
              Events
            </Tabs.Tab>
            <Tabs.Tab value="classes" leftSection={<IconSchool size={18} color="#9f1239" />}>
              Classes
            </Tabs.Tab>
            {!isPhotos && (
              <Tabs.Tab value="album" leftSection={<IconPhoto size={18} color="#d49a43" />}>
                Album
              </Tabs.Tab>
            )}
          </Tabs.List>
        </Tabs>

        <Card className="admin-gallery-upload" withBorder radius="lg" p="xl">
          <Stack gap="md" align="center" ta="center">
            <div className="admin-gallery-upload__icon">
              {isPhotos ? (
                <IconPhoto size={28} stroke={1.8} color="#9f1239" />
              ) : (
                <IconVideo size={28} stroke={1.8} color="#b7791f" />
              )}
            </div>
            <div>
              <Title order={3}>Add {categoryLabels[activeCategory].toLowerCase()} {mediaLabel}</Title>
              <Text c="dimmed" size="sm" mt={6}>
                Choose one or more {mediaLabel}.
                {isPhotos
                  ? " Uploads stay in this browser and appear in its public gallery."
                  : " Videos must be 30 MB or smaller and will appear in the public gallery."}
              </Text>
            </div>
            <Button
              component="label"
              leftSection={<IconUpload size={18} color="#f4c98d" />}
              loading={saving}
              className="admin-gallery-upload__button"
            >
              Choose {mediaLabel}
              <input
                type="file"
                accept={uploadAccept}
                multiple
                disabled={saving}
                onChange={handleUpload}
                aria-label={`Choose ${mediaLabel} for ${categoryLabels[activeCategory]}`}
                hidden
              />
            </Button>
          </Stack>
        </Card>

        <Group justify="space-between" align="center">
          <Title order={3}>{categoryLabels[activeCategory]} {mediaLabel}</Title>
          <Text size="sm" c="dimmed">
            {visibleMedia.length} {visibleMedia.length === 1 ? "file" : "files"}
          </Text>
        </Group>

        {loading ? (
          <Text c="dimmed">Loading uploaded files…</Text>
        ) : visibleMedia.length === 0 ? (
          <Card className="admin-gallery-empty" withBorder radius="lg" p="xl">
            {isPhotos ? (
              <IconPhoto size={28} color="#9f1239" />
            ) : (
              <IconVideo size={28} color="#b7791f" />
            )}
            <Text fw={600}>No {mediaLabel} uploaded for {categoryLabels[activeCategory].toLowerCase()} yet.</Text>
          </Card>
        ) : (
          <SimpleGrid cols={{ base: 1, xs: 2, md: 3 }} spacing="md">
            {visibleMedia.map((record) => {
              const url = mediaUrls.find((item) => item.id === record.id)?.url;
              return (
                <Card
                  key={record.id}
                  className="admin-gallery-media-card"
                  withBorder
                  radius="lg"
                  padding={0}
                >
                  {url && isPhotos ? (
                    <img src={url} alt={record.name} className="admin-gallery-media-card__preview" />
                  ) : url ? (
                    <video
                      src={url}
                      className="admin-gallery-media-card__preview"
                      controls
                      preload="metadata"
                    />
                  ) : null}
                  <Group justify="space-between" wrap="nowrap" p="sm">
                    <Text size="sm" fw={600} truncate title={record.name}>
                      {record.name}
                    </Text>
                    <ActionIcon
                      color="red"
                      variant="light"
                      aria-label={`Remove ${record.name}`}
                      loading={removingId === record.id}
                      onClick={() => handleDelete(record)}
                    >
                      <IconTrash size={17} />
                    </ActionIcon>
                  </Group>
                </Card>
              );
            })}
          </SimpleGrid>
        )}
      </Stack>
    </Container>
  );
};

export default AdminGallery;
