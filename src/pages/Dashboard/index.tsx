import { useEffect, useState } from 'react';

import Header from '../../components/Header';
import { api } from '../../services/api';
import Food from '../../components/Food';
import ModalAddFood from '../../components/ModalAddFood';
import ModalEditFood from '../../components/ModalEditFood';
import { FoodsContainer } from './styles';

interface FoodData {
  id: number,
  name: string,
  description: string,
  price: string,
  available: boolean,
  image: string,
}

type FoodInput = Omit<FoodData, 'id'>;

export function Dashboard() {
  const [foods, setFoods] = useState<FoodData[]>([]);
  const [editingFood, setEditingFood] = useState<FoodData>({} as FoodData);
  const [isAddFoodModalOpen, setIsAddFoodModalOpen] = useState(false);
  const [isEditFoodModalOpen, setIsEditFoodModalOpen] = useState(false);

  useEffect(() => {
    async function loadFoods() {
      const response = await api.get('/foods');
      setFoods(response.data);
    };
    loadFoods();
  }, []);

  async function handleAddFood(foodInput: FoodInput) {
    try {
      const response = await api.post('/foods', {
        ...foodInput,
        available: true,
      });

      setFoods(state => [...state, response.data]);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleUpdateFood(foodInput: FoodInput) {
    try {
      const foodUpdated = await api.put(
        `/foods/${editingFood.id}`,
        { ...editingFood, ...foodInput },
      );

      const foodsUpdated = foods.map(food =>
        food.id !== foodUpdated.data.id ? food : foodUpdated.data,
      );

      setFoods(foodsUpdated);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleDeleteFood(id: number) {

    await api.delete(`/foods/${id}`);

    const foodsFiltered = foods.filter(food => food.id !== id);

    setFoods(foodsFiltered);
  }

  function toggleAddFoodModal() {
    setIsAddFoodModalOpen(state => !state);
  }

  function toggleEditFoodModal() {
    setIsEditFoodModalOpen(state => !state);
  }

  function handleEditFood(food: FoodData) {
    setEditingFood(food);
  }

  
  return (
    <>
      <Header openModal={toggleAddFoodModal} />
      <ModalAddFood
        isOpen={isAddFoodModalOpen}
        setIsOpen={toggleAddFoodModal}
        handleAddFood={handleAddFood}
      />
      <ModalEditFood
        isOpen={isEditFoodModalOpen}
        setIsOpen={toggleEditFoodModal}
        editingFood={editingFood}
        handleUpdateFood={handleUpdateFood}
      />

      <FoodsContainer data-testid="foods-list">
        {foods &&
          foods.map(food => (
            <Food
              key={food.id}
              food={food}
              handleDelete={handleDeleteFood}
              handleEditFood={handleEditFood}
            />
          ))}
      </FoodsContainer>
    </>
  );
};
