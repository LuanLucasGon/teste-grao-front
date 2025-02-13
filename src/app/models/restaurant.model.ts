export interface RestaurantModel {
  id: string,
  name: string,
  category: string,
  address: string,
  phone: string,
  rating: string
  description: string,
  iconUrl: string,
  coverUrl: string,
  dishes: DishesModel[],
}

export interface DishesModel {
  id: string,
  name: string,
  description: string,
  price: string,
  imageUrl: string,
}
