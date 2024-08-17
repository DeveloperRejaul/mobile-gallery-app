import { IAlbumProps, IParamsType } from "@/src/features/gallery/types";

export const formatAlbum = (data: IParamsType[]): IAlbumProps[] => {
  let albumId = 1;
  const albums: IAlbumProps[] = [];
  for (let i = 0; i < data.length; i++) {
    if (albumId === data[i].albumId) {
      albums.push({
        albumId: data[i].albumId,
        thumbnail: data[i].thumbnailUrl,
        total: 1,
      });
      albumId = albumId + 1;
    } else {
      albums[albumId - 2].total = albums[albumId - 2].total + 1;
    }
  }

  return albums;
};

