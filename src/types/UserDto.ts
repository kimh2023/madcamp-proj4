export interface UserDto {
  id: number;
  email: string;
  name: string;
  carrots: number;
}

export interface FriendShipDto {
  user2: UserDto;
}
