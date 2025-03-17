import React, { useState, useEffect, ChangeEvent } from "react";
import { v4 as uuidv4 } from "uuid";
import { Draggable } from "../ui/draggable";
import { Button } from "../ui/button";
import MoneyText from "../ui/moneyText";
import { Flex } from "@radix-ui/themes";
import { HexColorPicker } from "react-colorful"; // Import react-colorful
import { adjustColor } from "@/app/utils/util";

interface Expense {
  id: string;
  name: string;
  amount: number;
  color: string; // Add color to the Expense interface
  remove: boolean;
  payer: string; // Add payer to the Expense interface
}

interface People {
  id: string;
  name: string;
  balance: number;
}

interface ExpenseListProps {
  people: People[];
  sharedExpenses: Expense[];
  addExpense: (expense: Expense) => void;
}

const ExpenseList: React.FC<ExpenseListProps> = ({
  people,
  sharedExpenses,
  addExpense,
}) => {
  const [expenseName, setExpenseName] = useState<string>("");
  const [expenseAmount, setExpenseAmount] = useState<string>("");
  const [expenseRemove, setExpenseRemove] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("#ffffff"); // State to manage the selected color
  const [payer, setPayer] = useState<string>(
    people.length > 0 ? people[0].name : ""
  );

  //useeffect so that is people turns nonzero the first time, it sets payer to that person
  //and not to the default value of the first person in the list
  useEffect(() => {
    if (people.length > 0) {
      setPayer(people[0].name);
    }
  }, [people]);

  const addExpenseHandler = () => {
    if (!expenseName) {
      setError("Please enter an expense name.");
    } else if (!expenseAmount) {
      setError("Please enter an expense amount.");
    } else if (people.length === 0) {
      setError("Please add people to the list.");
    } else if (!payer) {
      setError("Please select who paid for the expense.");
    } else {
      const newExpense: Expense = {
        id: uuidv4(),
        name: expenseName,
        amount: parseFloat(expenseAmount),
        color: selectedColor,
        remove: true,
        payer: payer, // Include payer in the expense
      };
      addExpense(newExpense);
      setExpenseName("");
      setExpenseAmount("");
      setPayer(people[0].name); // Reset to the first person in the list
      setSelectedColor("#ffffff");
      setError("");
    }
  };

  return (
    <div className="w-1/2 h-3/4 z-50 space-y-4">
      <h2 className="text-xl font-semibold text-gray-800">Add an Expense</h2>

      {/* Expense list */}
      <div className="relative bg-gray-100 z-50 border-gray-200 border h-[calc(100%-13.75rem)] rounded-lg">
        <Flex className="h-full overflow-y-scroll flex-col space-y-2 p-3">
          {sharedExpenses.map((expense) => (
            <Draggable key={expense.id} id={expense.id}>
              <Flex
                align="center"
                className="flex py-2 px-3 rounded-lg hover:border-2 hover:border-blue-300 border-dashed hover:scale-105 transition-all justify-between"
                style={{
                  backgroundColor: expense.color,
                  border: `1px solid ${adjustColor(
                    expense.color.toString(),
                    -40
                  )}`, // Darker border
                }}
              >
                <span className="font-semibold border-r border-black/40 pr-2">
                  {expense.name}
                </span>
                <span className="ml-2 truncate text-sm text-black/40">
                  Paid by {expense.payer}
                </span>
                <MoneyText
                  className="ml-auto"
                  amount={expense.amount.toFixed(2)}
                />
              </Flex>
            </Draggable>
          ))}
        </Flex>
      </div>

      {/* Form to add new expense */}
      <Flex className="flex-col mt-6 bg-gray-100 border-gray-200 border p-4 rounded-lg">
        <Flex align="center" className="gap-2">
          <select
            value={payer}
            onChange={(e) => setPayer(e.target.value)}
            className="border font-semibold mb-2 p-2 w-1/2 rounded-md"
          >
            <option disabled>Choose who to pay back</option>
            <option value={"Everyone"}>Everyone</option>
            {people.map((person) => (
              <option key={person.id} value={person.name}>
                {person.name || ""}
              </option>
            ))}
          </select>{" "}
          <input
            type="text"
            placeholder="Name"
            className="border p-2 w-full sm:w-1/2 mb-2 rounded-md"
            value={expenseName}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setExpenseName(e.target.value)
            }
          />
          <input
            type="number"
            placeholder="Amount"
            className="border p-2 w-full sm:w-1/3 mb-2 rounded-md"
            value={expenseAmount}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              (parseInt(e.target.value) || e.target.value === "") &&
              setExpenseAmount(e.target.value)
            }
          />
        </Flex>

        {/* Remove after adding checkbox */}
        <div className="flex items-center space-x-2 justify-center">
          <label
            htmlFor="removeAfterAdd"
            className="text-sm flex items-center cursor-pointer"
          >
            Remove after adding:
          </label>
          <input
            type="checkbox"
            id="removeAfterAdd"
            className="ml-2"
            checked={expenseRemove}
            onChange={() => setExpenseRemove((prev) => !prev)}
          />
        </div>

        {/* Color Picker */}
        <div className="mt-4 text-center">
          <label className="block text-sm mb-2">
            Pick a color for this expense:
          </label>
          <HexColorPicker
            color={selectedColor}
            onChange={setSelectedColor}
            className="w-full h-full max-h-[120px] mx-auto"
            defaultValue={"e0e0e0"}
          />
        </div>

        {/* Error message */}
        {error && (
          <p className="text-center mt-2 text-red-500 text-sm">{error}</p>
        )}

        {/* Add expense button */}
        <Button
          onClick={addExpenseHandler}
          className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg w-full sm:w-auto hover:bg-blue-700 transition duration-200"
        >
          Add Expense
        </Button>
      </Flex>
    </div>
  );
};

export default ExpenseList;
