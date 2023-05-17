export interface Product {
  name: string;
  image: string;
  ingredients: string;
  brand: string[];
  description: string;
  weight: number;
  benefits: string[];
  ean: string;
  status: string;
  howToUse: string;
  sideEffects: string;
}

export interface UserLoginData {
  id: string;
  accessToken: string;
  email: string;
  name: string;
  favouriteProducts: Product[];
}

export interface UserState extends UserLoginData {
  isLogged: boolean;
}

export interface UserCredentials {
  email: string;
  password: string;
}

export interface JwtCustomPayload {
  id: string;
  email: string;
}
