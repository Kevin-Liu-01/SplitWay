import {
  EditIcon,
  InfoIcon,
  LockIcon,
  SaveIcon,
  TrashIcon,
  UserCircle2Icon,
  UserRoundPlusIcon,
  XIcon,
} from "lucide-react";
import React, { useState, ChangeEvent, KeyboardEvent } from "react";
import MoneyText from "../ui/moneyText";
import { Flex, Tooltip, Dialog } from "@radix-ui/themes";
import { Button } from "../ui/button";
import Modal from "./modal";

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
    <div className="w-full sm:w-1/2 h-[calc(100%-7.4rem)]">
      <h2 className="flex items-center text-lg font-semibold text-gray-800 mb-4">
        <UserRoundPlusIcon className="size-6 mr-2" />
        People in Group
      </h2>
      <div className="flex text-sm mb-4 p-2 bg-gray-100 rounded-lg border border-gray-200">
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
          className="bg-blue-500 font-semibold text-white px-4 py-2 rounded-md shadow-sm focus:outline-none hover:bg-blue-600"
        >
          Add
        </button>
      </div>
      <Flex className="h-full flex-col">
        <ul className="space-y-2 h-full mb-4 p-3 overflow-y-scroll bg-gray-100 rounded-lg border border-gray-200">
          {people.map((p) => (
            <Tooltip content={p.name + " owes $" + p.balance.toFixed(2)}>
              <li
                key={p.id}
                className="flex hover:scale-[1.02] transition-all items-center p-2 border shadow-sm bg-white rounded-lg border-gray-200"
              >
                <Flex
                  align="center"
                  className="text-sm mr-2 font-semibold text-gray-800"
                >
                  <UserCircle2Icon className="w-6 h-6 mr-2" />
                  {p.name}
                </Flex>
                <span className="ml-auto truncate text-gray-600">
                  <MoneyText
                    className="text-sm"
                    amount={p.balance?.toFixed(2) || 0}
                  />
                </span>
                <Tooltip content={"Remove " + p.name + " from group"}>
                  <TrashIcon
                    onClick={() => removePerson(p.id)}
                    className="ml-2 bg-red-500 text-white p-1 rounded-md hover:scale-[1.02] focus:outline-none hover:bg-red-600"
                  />
                </Tooltip>
              </li>
            </Tooltip>
          ))}
        </ul>
        <Modal />
      </Flex>
    </div>
  );
};

export default PeopleList;
