export interface Tile {
    type: string;
    title: string;
}
  
export interface Section {
    buttonName: string;
    tiles: Tile[];
}

export interface LoadingTile {
    id: number;
    type: string;
    title: string;
}

export interface LoadingSection {
    buttonName: string;
    loadingTiles: LoadingTile[];
}