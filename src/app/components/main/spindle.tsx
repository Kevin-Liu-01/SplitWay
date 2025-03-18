import { Tooltip } from "@radix-ui/themes";
import { SplitIcon } from "lucide-react";
import MoneyText from "../ui/moneyText";
import { adjustColor } from "@/app/utils/util";

interface ExpenseItem {
  id: string;
  name: string;
  amount: number;
  color: string;
  payer: string;
  remove: boolean;
}

interface LifetimeExpenses {
  [x: string]: any;
  lifetimeExpenses: ExpenseItem[];
}

export default function Spindle(lifetimeExpenses: LifetimeExpenses) {
  return (
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
          {lifetimeExpenses.lifetimeExpenses
            .slice(-10)
            .map((expense, index) => (
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
                    transform: `rotate(${index % 2 === 0 ? "-5deg" : "5deg"})`,
                    zIndex: 5 - index,
                    border: `1px solid ${adjustColor(
                      expense.color.toString(),
                      -20
                    )}`,
                  }}
                >
                  {expense.name} <br />{" "}
                  <MoneyText
                    className="absolute mt-[-0.3rem]"
                    amount={expense.amount.toFixed(2)}
                  />
                </div>
              </Tooltip>
            ))}
        </div>{" "}
        <SplitIcon className="absolute right-[-2rem] z-5 ml-auto rotate-90 size-8 mr-2" />
      </div>
    </Tooltip>
  );
}
