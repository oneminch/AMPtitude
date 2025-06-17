import { cn } from "@/lib/utils";
import { AlertCircle } from "lucide-react";

interface FormErrorMessageProps {
  errorMessage: string | undefined;
}

const FormErrorMessage: React.FC<FormErrorMessageProps> = ({
  errorMessage
}) => {
  return (
    <div className="flex items-center overflow-hidden h-4 my-1">
      <p
        aria-live="polite"
        role="status"
        className={cn(
          "flex items-center gap-x-1 text-rose-500 text-xs transform duration-100",
          errorMessage && errorMessage.length > 0
            ? "translate-y-0 opacity-100"
            : "translate-y-1 opacity-0"
        )}>
        <AlertCircle className="inline mr-1 size-3" />
        <span>{errorMessage}</span>
      </p>
    </div>
  );
};

export default FormErrorMessage;
