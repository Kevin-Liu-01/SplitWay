import { Dialog, Flex } from "@radix-ui/themes";
import { InfoIcon, LockIcon, SaveIcon, TrashIcon, XIcon } from "lucide-react";

export default function Modal() {
  return (
    <Flex
      align="center"
      className="bg-white text-gray-600 sm:bg-gray-100 border shadow-lg sm:shadow-none fixed bottom-4 sm:bottom-0 right-2 sm:right-0 z-[60] sm:relative border-gray-200 p-2 sm:p-3 font-anek rounded-lg mt-auto"
    >
      <Flex align="center" className="relative sm:w-full mt-1">
        {/* <Flex
          align="center"
          className="flex pt-1 mr-auto bg-orange-100 text-orange-600 font-semibold rounded-lg px-2"
        >
          Beta
        </Flex> */}
        <span className="text-nowrap truncate hidden sm:flex">
          Learn more about{" "}
          <span className="ml-1 mr-2 font-semibold"> Splitway</span>
        </span>
        <span className="sm:ml-auto">v1.0.1</span>
      </Flex>
      <Dialog.Root>
        <Dialog.Trigger>
          <button className="ml-2 p-2 rounded-md bg-white text-black hover:bg-gray-50">
            <InfoIcon className="w-5 h-5" />
          </button>
        </Dialog.Trigger>

        <Dialog.Content className="font-anek">
          <Dialog.Title>
            <div className="font-anek">Welcome to Splitway!</div>
          </Dialog.Title>
          <Dialog.Close className="cursor-pointer">
            <XIcon className="absolute top-0 right-0 m-4 cursor-pointer text-gray-600" />
          </Dialog.Close>
          <Dialog.Description className="space-y-4 text-gray-700">
            <p className="bg-gray-100 border border-gray-200 rounded-lg p-2">
              Splitway is a user-friendly app designed to help you split
              expenses among friends easily. Simply add people, log expenses,
              and see who owes what in real time.
            </p>
            <p>
              To get started, add people to your group by typing their names in
              the input field above and pressing enter. You can also remove
              people by clicking the{" "}
              <TrashIcon className="inline w-5 h-5 text-red-500" /> icon next to
              their name.
            </p>
            <p>
              Once you've added people, start logging expenses by clicking the
              "Add Expense" button. Enter the details, including the name,
              amount, and who paid. Splitway will calculate balances for you.
            </p>
            <p>
              Need adjustments? Click{" "}
              <SaveIcon className="inline w-5 h-5 text-green-500" /> to edit
              expenses, or use the{" "}
              <LockIcon className="inline w-5 h-5 text-blue-500" /> lock feature
              to fix someone's share. Remove participants by clicking the delete
              button.
            </p>
            <p>
              That's it! Splitway tracks expenses and balances, so you can focus
              on enjoying time with your friends without worrying about debts.
            </p>
          </Dialog.Description>
        </Dialog.Content>
      </Dialog.Root>
    </Flex>
  );
}
