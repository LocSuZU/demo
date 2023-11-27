import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onChangeFile?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputFile = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, onChangeFile, ...props }, ref) => {
    return (
      <input
        type={"file"} // Set type to "file" for file input
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
        onChange={(event) => {
          if (type === "file" && onChangeFile) {
            onChangeFile(event); // Handle file selection
          }
        }}
      />
    );
  }
);

InputFile.displayName = "File";

export { InputFile };