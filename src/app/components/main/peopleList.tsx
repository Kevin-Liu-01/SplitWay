import { TrashIcon, UserCircle2Icon, UserRoundPlusIcon } from "lucide-react";
import React, { useState, ChangeEvent, KeyboardEvent } from "react";
import MoneyText from "../ui/moneyText";
import { Flex } from "@radix-ui/themes";

interface Person {
  id: number;
  name: string;
  balance: number;
}

interface PeopleListProps {
  people: Person[];
  addPerson: (name: string) => void;
  removePerson: (id: number) => void;
}

const PeopleList: React.FC<PeopleListProps> = ({
  people,
  addPerson,
  removePerson,
}) => {
  const [personName, setPersonName] = useState<string>("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPersonName(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && personName.trim()) {
      addPerson(personName.trim());
      setPersonName("");
    }
  };

  const handleAddClick = () => {
    if (personName.trim()) {
      addPerson(personName.trim());
      setPersonName("");
    }
  };

  return (
    <div className="w-full sm:w-1/2 h-[calc(100%-6.25rem)]">
      <h2 className="flex items-center text-xl font-semibold text-gray-800 mb-4">
        <UserRoundPlusIcon className="size-6 mr-2" />
        People in Group
      </h2>

      <div className="flex mb-4">
        <input
          type="text"
          placeholder="Add Person"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mr-2"
          value={personName}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        <button
          onClick={handleAddClick}
          className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md focus:outline-none hover:bg-blue-600"
        >
          Add
        </button>
      </div>
      <ul className="space-y-2 h-full overflow-y-scroll">
        {people.map((p) => (
          <li
            key={p.id}
            className="flex justify-between items-center p-2 border-b border-gray-200"
          >
            <Flex
              align="center"
              className="text-lg font-semibold text-gray-800"
            >
              <UserCircle2Icon className="w-6 h-6 mr-2" />
              {p.name}
            </Flex>
            <span className="text-gray-600">
              Balance Owed:{" "}
              <MoneyText
                className="text-lg"
                amount={p.balance?.toFixed(2) || 0}
              />
            </span>
            <TrashIcon
              onClick={() => removePerson(p.id)}
              className=" bg-red-500 text-white p-1 rounded-md hover:scale-[1.02] focus:outline-none hover:bg-red-600"
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PeopleList;
