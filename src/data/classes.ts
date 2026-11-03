export type AcademyClass = {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  displayOrder: number;
  isActive: boolean;
};

export const defaultClasses: AcademyClass[] = [
  {
    id: "classical-music",
    title: "Classical Music",
    description:
      "Build a strong foundation in sur, taal, rhythm and musical expression.",
    displayOrder: 1,
    isActive: true,
  },
  {
    id: "light-music",
    title: "Light Music & Singing",
    description:
      "Develop your voice, confidence and feeling through songs you love.",
    displayOrder: 2,
    isActive: true,
  },
  {
    id: "harmonium",
    title: "Harmonium",
    description:
      "Learn accompaniment, chords and melody while supporting every performance.",
    displayOrder: 3,
    isActive: true,
  },
  {
    id: "guitar",
    title: "Guitar",
    description:
      "Start with chords and rhythm, then grow into expressive song-based playing.",
    displayOrder: 4,
    isActive: true,
  },
];
