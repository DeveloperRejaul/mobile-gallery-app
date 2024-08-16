export type IParamsType = { 
    albumId:number,
    id: number,
    title: string,
    url: string,
    thumbnailUrl: string,
}
export interface IAlbumProps { 
    albumId: number;
    thumbnail: string;
    total: number
}

export interface IAlbumItemProps extends IAlbumProps { 
    onLongPress?: () => void;
    isActive?: boolean;
}

export  type LayoutAlbum = ArrayLike<IAlbumProps> | null | undefined;
export  type LayoutGallery = ArrayLike<IParamsType> | null | undefined;