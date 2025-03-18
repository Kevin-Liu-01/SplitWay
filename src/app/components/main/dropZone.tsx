import React, { useEffect } from "react";
import { Droppable } from "../ui/droppable";
import { Card, CardContent } from "../ui/card";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import {
  CircleDollarSignIcon,
  LockIcon,
  LockOpenIcon,
  SaveIcon,
  TrashIcon,
} from "lucide-react";
import { Flex, Text, Tooltip } from "@radix-ui/themes";
import MoneyText from "../ui/moneyText";
import { adjustColor } from "@/app/utils/util";

export default function DropZone({ expenses, setExpenses, people }) {
  const [localAmounts, setLocalAmounts] = React.useState({});

  const setLocalAmount = (expenseId, personId, amount) => {
    setLocalAmounts((prev) => ({
      ...prev,
      [`${expenseId}-${personId}`]: amount,
    }));
  };

  const updateExpenseAmount = (expenseId, personId, newAmount) => {
    setExpenses((prev) =>
      prev.map((expense) => {
        if (expense.id !== expenseId) return expense;

        let updatedPayments = expense.assignedPayments.map((p) =>
          p.id === personId
            ? { ...p, amount: parseFloat(newAmount), locked: true }
            : p
        );

        const lockedPayments = updatedPayments.filter((p) => p.locked);
        const unlockedPayments = updatedPayments.filter((p) => !p.locked);

        const lockedTotal = lockedPayments.reduce(
          (sum, p) => sum + p.amount,
          0
        );
        const remainingAmount = expense.amount - lockedTotal;

        if (unlockedPayments.length > 0) {
          const splitAmount = remainingAmount / unlockedPayments.length;
          updatedPayments = updatedPayments.map((p) =>
            p.locked ? p : { ...p, amount: parseFloat(splitAmount.toFixed(2)) }
          );
        }

        updatedPayments.forEach((p) =>
          setLocalAmount(expenseId, p.id, p.amount.toFixed(2))
        );

        return { ...expense, assignedPayments: updatedPayments };
      })
    );
  };

  const toggleLock = (expenseId, personId, setLocked?) => {
    setExpenses((prev) =>
      prev.map((expense) =>
        expense.id === expenseId
          ? {
              ...expense,
              assignedPayments: expense.assignedPayments.map((p) =>
                p.id === personId
                  ? { ...p, locked: setLocked === true ? true : !p.locked }
                  : p
              ),
            }
          : expense
      )
    );
  };

  // Remove a person from the expense
  const removePersonFromExpense = (expenseId: string, personId: string) => {
    setExpenses((prev) =>
      prev.map((expense) => {
        if (expense.id !== expenseId) return expense;
        let updatedPayments = expense.assignedPayments.filter(
          (p) => p.id !== personId
        );

        const remainingAmount = expense.amount;
        if (updatedPayments.length > 0) {
          const splitAmount = remainingAmount / updatedPayments.length;
          updatedPayments = updatedPayments.map((p) => ({
            ...p,
            amount: splitAmount || 0,
          }));
        }
        return { ...expense, assignedPayments: updatedPayments };
      })
    );
  };

  // Add a person to the expense
  function addPerson(expense) {
    const newPeople = people.filter(
      (person) => !expense.assignedPayments.some((p) => p.id === person.id)
    );

    return (
      <div className="">
        {newPeople.map((person) => (
          <div
            key={person.id}
            className="flex mt-3 h-min items-center gap-2 border-gray-800/40 border-b pb-2"
          >
            <span className="text-sm font-medium">{person.name}</span>
            <Button
              tooltip={"Add " + person.name + " as a payer"}
              onClick={() => {
                const updatedPayments = [
                  ...expense.assignedPayments,
                  {
                    id: person.id,
                    name: person.name,
                    amount: 0,
                  },
                ];
                setExpenses((prev) =>
                  prev.map((e) =>
                    e.id === expense.id
                      ? { ...e, assignedPayments: updatedPayments }
                      : e
                  )
                );
                updateExpenseAmount(expense.id, person.id, "0");
              }}
              className="bg-blue-500 ml-auto text-white px-3 py-[0.275rem] text-xs rounded-lg shadow hover:bg-blue-600 transition"
            >
              Add
            </Button>
          </div>
        ))}
      </div>
    );
  }

  // When a checkbox is changed, update the person's amount owed in the expense to 0 and lock it
  function onChecked(expenseId: string, personId: string, checked: boolean) {
    setExpenses((prev) =>
      prev.map((expense) => {
        if (expense.id !== expenseId) return expense;
        const updatedPayments = expense.assignedPayments.map((p) =>
          p.id === personId
            ? { ...p, paid: checked, amount: checked ? 0 : p.amount } // If paid, set amount to 0
            : p
        );

        //lock
        toggleLock(expenseId, personId, true);

        return { ...expense, assignedPayments: updatedPayments };
      })
    );
  }

  return (
    <Droppable id="drop-zone">
      {expenses.length > 0 &&
        expenses.map((expense) => (
          <Card
            key={expense.id}
            style={{
              backgroundColor: expense.color,
              border: `1px solid ${adjustColor(expense.color.toString(), -20)}`,
            }}
            className="p-4 h-min z-20 hover:scale-[1.02] transition-all drop-shadow-lg bg-opacity-30"
          >
            <CardContent className="space-y-2">
              <Flex align="center" className="flex-col">
                <Flex className="w-full">
                  <Text
                    style={{
                      color: adjustColor(expense.color.toString(), -150),
                    }}
                    className="text-lg font-bold truncate"
                  >
                    {expense.name}
                  </Text>
                  <MoneyText
                    amount={expense.amount}
                    style={{
                      color: adjustColor(expense.color.toString(), -130),
                    }}
                    className="text-xl ml-auto font-semibold text-nowrap"
                  />
                </Flex>
                <Flex
                  align="center"
                  style={{ color: adjustColor(expense.color.toString(), -80) }}
                  className="font-bold mr-auto text-sm "
                >
                  <CircleDollarSignIcon className="w-4 h-4 mr-1" />
                  Paid by {expense.payer}
                </Flex>
              </Flex>

              {expense.assignedPayments.map((p) => {
                const localAmount =
                  localAmounts[`${expense.id}-${p.id}`] || p.amount.toFixed(2);

                return (
                  <div
                    key={p.id}
                    className="flex items-center justify-between w-full gap-2 border-gray-800/40 border-b pb-2"
                  >
                    <Checkbox
                      checked={p.paid}
                      onCheckedChange={(checked) =>
                        onChecked(expense.id, p.id, checked)
                      }
                    />
                    <Text
                      style={{
                        color: adjustColor(expense.color.toString(), -100),
                      }}
                      className="text-sm truncate font-semibold"
                    >
                      {p.name}
                    </Text>
                    <Tooltip
                      content={`
                      
                      ${
                        expense.payer === "Everyone"
                          ? `${p.name} is splitting this expense`
                          : p.name === expense.payer
                          ? `${p.name} covered the expense`
                          : `${p.name} owes ${
                              expense.payer
                            } $${p.amount.toFixed(2)}`
                      }
                      
                      
                     `}
                    >
                      <input
                        value={localAmount}
                        className="border ml-auto text-sm font-inconsolata border-gray-300 rounded-lg text-center p-1 w-[3.5rem] focus:ring-2 focus:ring-blue-500 disabled:bg-gray-200"
                        disabled={p.locked}
                        onChange={(e) =>
                          setLocalAmount(expense.id, p.id, e.target.value)
                        }
                      />
                    </Tooltip>
                    <Flex align="center" className="">
                      <Button
                        tooltip={"Save Changes"}
                        onClick={() =>
                          updateExpenseAmount(
                            expense.id,
                            p.id,
                            parseFloat(localAmount)
                          )
                        }
                        className="bg-green-500 text-white p-1.5 rounded-l-lg rounded-r-none shadow hover:bg-green-600 transition"
                      >
                        <SaveIcon size={16} />
                      </Button>

                      <Button
                        tooltip={
                          p.locked ? "Editing Disabled" : "Editing Enabled"
                        }
                        onClick={() => toggleLock(expense.id, p.id)}
                        className={`p-1.5 rounded-none shadow transition ${
                          p.locked
                            ? "bg-gray-500 text-white"
                            : "bg-blue-500 hover:bg-blue-600 text-white"
                        }`}
                      >
                        {p.locked ? (
                          <LockIcon size={16} />
                        ) : (
                          <LockOpenIcon size={16} />
                        )}
                      </Button>
                      <Button
                        tooltip={"Remove Person"}
                        onClick={() =>
                          removePersonFromExpense(expense.id, p.id)
                        }
                        className="bg-red-500 text-white p-1.5 rounded-l-none rounded-r-lg shadow hover:bg-red-600 transition"
                      >
                        <TrashIcon size={16} />
                      </Button>
                    </Flex>
                  </div>
                );
              })}

              {addPerson(expense)}

              <Button
                tooltip={"Removes expense and resets payments"}
                onClick={() =>
                  setExpenses((prev) => prev.filter((e) => e.id !== expense.id))
                }
                style={{
                  backgroundColor: adjustColor(expense.color.toString(), -90),
                }}
                className=" text-white text-sm px-4 py-2 rounded-md shadow hover:scale-[1.02] transition w-full"
              >
                Remove Expense
              </Button>
            </CardContent>
          </Card>
        ))}
    </Droppable>
  );
}
