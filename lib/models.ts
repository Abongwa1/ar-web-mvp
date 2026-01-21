export const models = [
  {
    name: "Sneaker",
    slug: "sandals",
    modelUrl: "https://arahvjrnnmkyajoyzsir.supabase.co/storage/v1/object/public/ar/Sandals.fbx",
    thumbnail: "https://arahvjrnnmkyajoyzsir.supabase.co/storage/v1/object/public/images/sneak.jpeg",
    arProfile: {
      type: "pose",
      anchor: "ankle",
      scale: 0.012,
      offset: { x: 0, y: -0.9, z: 0 },
    },
  },
  {
    name: "Watch",
    slug: "watch",
    modelUrl: "https://arahvjrnnmkyajoyzsir.supabase.co/storage/v1/object/public/ar/watch.fbx",
    thumbnail: "https://arahvjrnnmkyajoyzsir.supabase.co/storage/v1/object/public/images/watch.jpeg",
    arProfile: {
      type: "pose",
      anchor: "wrist",
      scale: 0.006,
      offset: { x: 0, y: -0.2, z: 0 },
    },
  },
  {
    name: "Glasses",
    slug: "glasses",
    modelUrl: "https://arahvjrnnmkyajoyzsir.supabase.co/storage/v1/object/public/ar/glasses.fbx",
    thumbnail: "https://arahvjrnnmkyajoyzsir.supabase.co/storage/v1/object/public/images/glases.jpeg",
    arProfile: {
      type: "face",
      anchor: "eyes",
      scale: 0.005,
      offset: { x: 0, y: 0, z: 0 },
    },
  },
  {
    name: "Chair",
    slug: "chair",
    modelUrl: "https://arahvjrnnmkyajoyzsir.supabase.co/storage/v1/object/public/ar/chair.fbx",
    thumbnail: "https://arahvjrnnmkyajoyzsir.supabase.co/storage/v1/object/public/images/chair.jpg",
    arProfile: {
      type: "world",
      scale: 0.08,
    },
  },
];
