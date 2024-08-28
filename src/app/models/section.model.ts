export interface Tile {
    type: string;
    title: string;
    routerLink: string;
}
  
export interface Section {
    buttonName: string;
    tiles: Tile[];
}