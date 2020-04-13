import {SocialUser} from 'angularx-social-login';

export interface ISettings {
  isMale: boolean;
  weight: number;
  height: number;
  minKcal: number;
  maxKcal: number;
  fats: number;
  proteins: number;
  carbs: number;
  user: SocialUser;
  isLoggedIn: boolean;
}
