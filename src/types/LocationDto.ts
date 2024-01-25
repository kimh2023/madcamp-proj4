export interface LocationDto {
  position: { x: number; y: number; z: number };
  direction: { x: number; y: number; z: number };
  place: string;
  isWalking: boolean;
  user: number;
}

export interface MultipleLocationsDto {
  [id: number]: LocationDto;
}
