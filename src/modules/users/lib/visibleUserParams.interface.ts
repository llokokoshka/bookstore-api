type NormalizeRate = Record<number, number>;

export interface IVisibleUserParams {
  fullName: string;
  email: string;
  avatar: string;
  rating: NormalizeRate;
}
