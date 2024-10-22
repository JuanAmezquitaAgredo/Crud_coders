"use client";

import { ICoder } from "@/models/coders/coder.model";
import { CoderService } from "@/services/coders.service";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface IProps {
  data: ICoder[];
}

function CodersTable({ data }: IProps) {
  const [isEditing, setIsEditing] = useState<string | null>(null); // Guarda el ID del coder que se está editando
  const [editValues, setEditValues] = useState<{ id: string; name: string; avatar: string }>({
    id: "",
    name: "",
    avatar: "",
  });

  const coderService = new CoderService();
  const router = useRouter();

  const handleDelete = async (id: string) => {
    await coderService.destroy(id);
    router.refresh();
  };

  const handleCreateCoder = () => {
    router.push("/CreateCoder");
  };

  const handleEditCoder = async (coder: ICoder) => {
    await coderService.update(coder.id, {
      ...coder,
      id: editValues.id,
      name: editValues.name,
      avatar: editValues.avatar,
    });
    setIsEditing(null); 
    router.refresh();
  };

  const startEditing = (coder: ICoder) => {
    setIsEditing(coder.id);
    setEditValues({
      id: coder.id,
      name: coder.name,
      avatar: coder.avatar,
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    setEditValues((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, coder: ICoder) => {
    if (e.key === "Enter") {
      handleEditCoder(coder);
    }
  };

  return (
    <div>
      <button onClick={handleCreateCoder}>Crear nuevo Coder</button>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Avatar</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map((coder) => (
            <tr key={coder.id}>
              <td>
                {coder.id}
              </td>
              <td onDoubleClick={() => startEditing(coder)}>
                {isEditing === coder.id ? (
                  <input
                    type="text"
                    value={editValues.name}
                    onChange={(e) => handleInputChange(e, "name")}
                    onKeyDown={(e) => handleKeyDown(e, coder)}
                  />
                ) : (
                  coder.name
                )}
              </td>
              <td onDoubleClick={() => startEditing(coder)}>
                {isEditing === coder.id ? (
                  <input
                    type="text"
                    value={editValues.avatar}
                    onChange={(e) => handleInputChange(e, "avatar")}
                    onKeyDown={(e) => handleKeyDown(e, coder)}
                  />
                ) : (
                  coder.avatar
                )}
              </td>
              <td>
                <button onClick={() => handleDelete(coder.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CodersTable;
