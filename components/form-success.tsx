import { CheckCircledIcon } from "@radix-ui/react-icons";
interface FromMessageProps {
  message: string;
}

export const FormSuccess = ({ message }: FromMessageProps) => {
  if (!message) return null;
  return (
    <div className="bg-emerald/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-emerald-500">
      <CheckCircledIcon className="h-4 w-4" />
      <span>{message}</span>
    </div>
  );
};
