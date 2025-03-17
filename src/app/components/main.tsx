"use client";
import React, { useState, useEffect } from "react";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import ExpenseList from "./main/expenseList";
import PeopleList from "./main/peopleList";
import DropZone from "./main/dropZone";
import { v4 as uuidv4 } from "uuid";
import { Flex, Text, Tooltip } from "@radix-ui/themes";
import useLocalStorage from "../utils/useLocalStorage";
import { SplitIcon } from "lucide-react";

// Type definitions for Person, Expense, and AssignedPayment
interface Person {
  id: string;
  name: string;
  balance: number;
}

interface ExpenseItem {
  id: string;
  name: string;
  amount: number;
  color: string;
  payer: string;
  remove: boolean;
  assignedPayments?: AssignedPayment[];
}

interface AssignedPayment {
  id: string;
  name: string;
  amount: number;
  paid: boolean;
}

export default function ExpenseTracker() {
  const [people, setPeople] = useLocalStorage("people", []);
  const [expenses, setExpenses] = useLocalStorage("expenses", []);
  const [lifetimeExpenses, setLifetimeExpenses] = useLocalStorage(
    "lifetimeExpenses",
    []
  );
  const [sharedExpenses, setSharedExpenses] = useState<ExpenseItem[]>([
    {
      id: uuidv4(),
      name: "🍽️   Dinner",
      amount: 50,
      remove: false,
      color: "#ff8a80",
      payer: "Everyone",
    },
    {
      id: uuidv4(),
      name: "🛒   Groceries",
      amount: 100,
      remove: false,

      color: "#b9f6ca",
      payer: "Everyone",
    },
    {
      id: uuidv4(),
      name: "🏠   Rent",
      amount: 500,
      remove: false,
      color: "#ffe57f",
      payer: "Everyone",
    },
    {
      id: uuidv4(),
      name: "🔌   Utilities",
      amount: 150,
      remove: false,
      color: "#80d8ff",
      payer: "Everyone",
    },
  ]);

  useEffect(() => {
    const updatedPeople = people.map((person) => {
      const totalOwed = expenses.reduce((sum, expense) => {
        const personExpense = expense.assignedPayments?.find(
          (p) => p.id === person.id
        );
        return sum + (personExpense ? personExpense.amount : 0);
      }, 0);
      return { ...person, balance: totalOwed };
    });
    setPeople(updatedPeople);
  }, [expenses]);

  const addPerson = (name: string): void => {
    setPeople([...people, { id: uuidv4(), name, balance: 0 }]);
  };

  const removePerson = (id: number) => {
    setPeople(people.filter((person) => person.id !== id));

    //remove it from the expenses as well
    setExpenses((prev) =>
      prev.map((expense) => ({
        ...expense,
        assignedPayments: expense.assignedPayments?.filter((p) => p.id !== id),
      }))
    );
  };

  const addExpense = ({
    name,
    amount,
    remove,
    color,
    payer,
  }: {
    name: string;
    amount: string;
    remove: boolean;
    color: string;
    payer: string;
  }): void => {
    setSharedExpenses([
      ...sharedExpenses,
      {
        id: uuidv4(),
        name,
        amount: parseFloat(amount),
        remove: remove,
        color: color,
        payer: payer,
      },
    ]);
  };

  function handleDragEnd({ over, active }: DragEndEvent): void {
    if (!over || !active) return;

    const expense = sharedExpenses.find((e) => e.id === active.id);
    if (!expense) return;

    // Generate a new ID for the dropped expense to prevent duplication
    const newExpenseId = uuidv4();

    const totalAmount = expense.amount;
    let assignedPayments = people.map((p) => ({
      id: p.id,
      name: p.name,
      amount: Math.round((totalAmount / people.length) * 100) / 100,
      paid: false,
    }));

    setExpenses([
      ...expenses,
      { ...expense, id: newExpenseId, assignedPayments },
    ]);
    setLifetimeExpenses([
      ...lifetimeExpenses,
      { ...expense, id: newExpenseId, assignedPayments },
    ]);

    if (expense.remove !== false) {
      setSharedExpenses(sharedExpenses.filter((e) => e.id !== active.id));
    }
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="h-screen w-full">
        <Flex className=" flex-col h-full gap-4">
          <Flex align="center" className="flex-col sm:flex-row p-6 pb-1">
            <h1 className="flex items-center text-4xl font-bold font-anek">
              <Text className=" font-extrabold">Split</Text>
              <Text>Way</Text>{" "}
              <SplitIcon className="mb-3 rotate-90 size-8 mr-2" />
            </h1>

            {/* Resume Spindle (Horizontal) */}
            <Tooltip content="These are all your past expenses!">
              <div className="relative sm:absolute sm:ml-auto ml-[4.5rem] right-12 flex font-anek items-center gap-2">
                {/* <button
                onClick={() => setLifetimeExpenses([])}
                className="bg-red-500 text-white px-4 py-2 rounded-md shadow-md focus:outline-none hover:bg-red-600"
              >
                Empty
              </button> */}
                <div className="h-3 w-3 bg-gray-700 z-5 rounded-full" />
                {/* Spindle Pin */}
                <div className="flex flex-row-reverse w-auto z-10 max-w-[15rem] sm:max-w-[18rem] lg:max-w-[36rem]">
                  {lifetimeExpenses.slice(-10).map((expense, index) => (
                    <Tooltip
                      content={`
                    ${expense.payer} paid $${expense.amount.toFixed(2)} for ${
                        expense.name
                      }
                    `}
                    >
                      <div
                        key={expense.id}
                        className="relative w-20 h-10 truncate p-2 text-xs font-semibold text-black rounded-md shadow-lg"
                        style={{
                          marginLeft: -10, // Overlapping effect
                          backgroundColor: expense.color,
                          transform: `rotate(${
                            index % 2 === 0 ? "-5deg" : "5deg"
                          })`,
                          zIndex: 5 - index,
                        }}
                      >
                        {expense.name} <br /> ${expense.amount.toFixed(2)}
                      </div>
                    </Tooltip>
                  ))}
                </div>{" "}
                <SplitIcon className="absolute right-[-2rem] z-5 ml-auto rotate-90 size-8 mr-2" />
              </div>
            </Tooltip>
          </Flex>

          <div className="flex h-[calc(100vh-6rem)] px-6 pb-6 gap-6 flex-col sm:flex-row">
            <PeopleList
              people={people}
              addPerson={addPerson}
              removePerson={removePerson}
            />
            <ExpenseList
              people={people}
              sharedExpenses={sharedExpenses}
              addExpense={addExpense}
            />

            <DropZone
              expenses={expenses}
              setExpenses={setExpenses}
              people={people}
            />
          </div>
        </Flex>
      </div>
    </DndContext>
  );
}
