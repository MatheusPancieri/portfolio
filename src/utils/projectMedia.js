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
