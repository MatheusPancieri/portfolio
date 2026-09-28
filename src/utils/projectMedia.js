// Auto-discovers files dropped into src/assets/imgs/projetos/<folder>/ —
// drop a new image or video in a project's folder and it shows up here
// with no code changes needed.
const modules = import.meta.glob("../assets/imgs/projetos/*/*", {
  eager: true,
  import: "default",
});

const VIDEO_EXT = new Set(["mp4", "webm", "mov"]);

const media = {};
for (const path in modules) {
  const match = path.match(/projetos\/([^/]+)\/([^/]+)$/);
  if (!match) continue;
  const [, folder, file] = match;
  const ext = file.split(".").pop().toLowerCase();
  (media[folder] ??= []).push({
    file,
    url: modules[path],
    type: VIDEO_EXT.has(ext) ? "video" : "image",
  });
}
Object.values(media).forEach((list) =>
  list.sort((a, b) => a.file.localeCompare(b.file))
);

export const getProjectMedia = (folder) => media[folder] ?? [];

// Works banners (editor profile): src/assets/imgs/banners/<project id>.webp,
// e.g. banners/mcdonalds.webp. Without one, the carousel falls back to the
// video's own thumbnail.
const bannerModules = import.meta.glob("../assets/imgs/banners/*", {
  eager: true,
  import: "default",
});

const banners = {};
for (const path in bannerModules) {
  const id = path.match(/banners\/([^/]+)\.[^./]+$/)?.[1];
  if (id) banners[id] = bannerModules[path];
}

export const getBanner = (id) => banners[id] ?? null;
