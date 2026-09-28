// A video project points at either a YouTube video (`youtube`: the video ID)
// or a Google Drive file (`drive`: the file ID from the share link,
// drive.google.com/file/d/<ID>/view). The Drive file must be shared as
// "anyone with the link".

export const hasVideo = (p) => Boolean(p.youtube || p.drive);

export const videoEmbedUrl = (p, { autoplay = false } = {}) => {
  if (p.youtube) {
    return `https://www.youtube-nocookie.com/embed/${p.youtube}?rel=0${autoplay ? "&autoplay=1" : ""}`;
  }
  if (p.drive) return `https://drive.google.com/file/d/${p.drive}/preview`;
  return null;
};

export const videoThumbUrl = (p) => {
  if (p.youtube) return `https://i.ytimg.com/vi/${p.youtube}/hqdefault.jpg`;
  // lh3 is where drive.google.com/thumbnail redirects to; going there
  // directly skips the Drive endpoint, which rate-limits hotlinked
  // requests (429). Render these <img>s with referrerPolicy="no-referrer".
  if (p.drive) return `https://lh3.googleusercontent.com/d/${p.drive}=w640`;
  return null;
};
