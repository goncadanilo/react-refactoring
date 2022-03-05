export type FoodData = {
  id: number;
  name: string;
  description: string;
  price: string;
  available: boolean;
  image: string;
};

export type FoodInput = Omit<FoodData, "id">;
