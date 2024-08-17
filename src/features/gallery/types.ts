export interface IParamsType { 
    albumId:number,
    id: number,
    title: string,
    url: string,
    thumbnailUrl: string,
}

export interface IAppPhotosRenterProps {
    item: IParamsType
}

export interface IAlbumRenterProps {
    item: IAlbumProps;
}

export interface IAllPhotosProps extends IParamsType { 
    onLongPress?: () => void;
    isActive?: boolean;
    onPress: (value:number, isChecked:boolean) => void
}
export interface IAlbumProps { 
    albumId: number;
    thumbnail: string;
    total: number
}

export interface IAlbumItemProps extends IAlbumProps { 
    onLongPress?: () => void;
    isActive?: boolean;
    onPress: (value:number, isChecked:boolean) => void
}

export  type LayoutAlbum = ArrayLike<IAlbumProps> | null | undefined;
export  type LayoutGallery = ArrayLike<IParamsType> | null | undefined;