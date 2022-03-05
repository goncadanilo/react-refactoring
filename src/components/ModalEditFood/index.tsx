import { useRef } from "react";
import { FiCheckSquare } from "react-icons/fi";
import Input from "src/components/Input";
import { Modal } from "src/components/Modal";
import { FoodData, FoodInput } from "../Food/types";
import { Form } from "./styles";

interface ModalEditFoodProps {
  isOpen: boolean;
  setIsOpen: () => void;
  editingFood: FoodData;
  handleUpdateFood: (data: FoodInput) => Promise<void>;
}

export function ModalEditFood({
  isOpen,
  setIsOpen,
  editingFood,
  handleUpdateFood,
}: ModalEditFoodProps) {
  const formRef = useRef(null);

  async function handleSubmit(data: FoodInput) {
    handleUpdateFood(data);
    setIsOpen();
  }

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit} initialData={editingFood}>
        <h1>Editar Prato</h1>
        <Input name="image" placeholder="Cole o link aqui" />

        <Input name="name" placeholder="Ex: Moda Italiana" />
        <Input name="price" placeholder="Ex: 19.90" />

        <Input name="description" placeholder="Descrição" />

        <button type="submit" data-testid="edit-food-button">
          <div className="text">Editar Prato</div>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
}
