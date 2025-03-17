import React from "react";
import { Droppable } from "../ui/droppable";
import { Card, CardContent } from "../ui/card";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { CircleDollarSignIcon, TrashIcon } from "lucide-react";
import { Flex, Text } from "@radix-ui/themes";
import MoneyText from "../ui/moneyText";
import { adjustColor } from "@/app/utils/util";

export default function DropZone({ expenses, setExpenses, people }) {
  // Update the expense amounts when the amount is modified
  const updateExpenseAmount = (
    expenseId: string,
    personId: string,
    newAmount: string
  ) => {
    setExpenses((prev) =>
      prev.map((expense) => {
        if (expense.id !== expenseId) return expense;
        const totalAmount = expense.amount;
        const updatedPayments = expense.assignedPayments.map((p) =>
          p.id === personId ? { ...p, amount: parseFloat(newAmount) } : p
        );

        const remainingAmount =
          totalAmount -
          updatedPayments.reduce(
            (sum, p) => sum + (p.id === personId ? p.amount : 0),
            0
          );
        const otherParticipants = updatedPayments.filter(
          (p) => p.id !== personId
        );
        if (otherParticipants.length > 0) {
          const splitAmount = remainingAmount / otherParticipants.length;
          updatedPayments.forEach((p) => {
            if (p.id !== personId) p.amount = splitAmount;
          });
        }

        //handle NaN errors
        updatedPayments.forEach((p) => {
          if (isNaN(p.amount)) {
            p.amount = 0;
          }
        });

        return { ...expense, assignedPayments: updatedPayments };
      })
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

  // When a checkbox is changed, update the person's amount owed in the expense to 0
  function onChecked(expenseId: string, personId: string, checked: boolean) {
    setExpenses((prev) =>
      prev.map((expense) => {
        if (expense.id !== expenseId) return expense;
        const updatedPayments = expense.assignedPayments.map((p) =>
          p.id === personId
            ? { ...p, paid: checked, amount: checked ? 0 : p.amount } // If paid, set amount to 0
            : p
        );
        return { ...expense, assignedPayments: updatedPayments };
      })
    );
  }

  return (
    <Droppable id="drop-zone">
      {expenses.length > 0 ? (
        expenses.map((expense) => (
          <Card
            key={expense.id}
            style={{
              backgroundColor: expense.color,
              border: `1px solid ${adjustColor(expense.color.toString(), -40)}`, // Darker border
            }}
            className={`p-4 h-min z-20 hover:scale-[1.02] transition-all rounded-lg drop-shadow-lg bg-opacity-30`}
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

              {expense.assignedPayments.map((p) => (
                <div
                  key={p.id}
                  className="flex items-center justify-between w-full gap-2 border-gray-800/40 border-b pb-2"
                >
                  <Checkbox
                    checked={p.paid}
                    onCheckedChange={(checked) =>
                      onChecked(expense.id, p.id, checked)
                    } // Handle checkbox change
                  />
                  <Text
                    style={{
                      color: adjustColor(expense.color.toString(), -100),
                    }}
                    className="text-sm truncate font-semibold"
                  >
                    <span>{p.name}</span>
                    <span>:</span>
                  </Text>

                  <input
                    value={p.amount?.toFixed(2)}
                    className="border ml-auto text-sm font-inconsolata border-gray-300 rounded-lg text-center p-1 w-[3.5rem] focus:ring-2 focus:ring-blue-500"
                    onChange={(e) =>
                      updateExpenseAmount(expense.id, p.id, e.target.value)
                    }
                  />
                  <Button
                    onClick={() => removePersonFromExpense(expense.id, p.id)}
                    className="bg-red-500 text-white p-2 rounded-lg shadow hover:bg-red-600 transition"
                  >
                    <TrashIcon size={16} />
                  </Button>
                </div>
              ))}

              {addPerson(expense)}

              <Button
                onClick={() =>
                  setExpenses((prev) => prev.filter((e) => e.id !== expense.id))
                }
                style={{
                  backgroundColor: adjustColor(expense.color.toString(), -90),
                }}
                className=" text-white text-sm px-4 py-2 rounded-lg shadow hover:scale-[1.02] transition w-full"
              >
                Remove Expense
              </Button>
            </CardContent>
          </Card>
        ))
      ) : (
        <div className="text-center font-semibold col-span-3 text-gray-500 text-lg mx-auto my-auto">
          Drop Expenses Here
        </div>
      )}
    </Droppable>
  );
}
