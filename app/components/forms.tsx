import type { FormProps as RemixFormProps } from '@remix-run/react';
import { Form as RemixForm, useSubmit } from '@remix-run/react';
import { clsx } from 'clsx';
import type { InputHTMLAttributes, ReactNode } from 'react';
import { useEffect, useRef, useState } from 'react';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: ReactNode;
};

export function Input({ label, className, ...props }: InputProps) {
  return (
    <div className='p-2'>
      <label className="block text-sm font-medium leading-6 text-gray-900">{label}</label>
      <div className="mt-2">
        <input
          className={clsx(
            'block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6',
            className,
          )}
          {...props}
        />
        </div>
      </div>
    
  );
}

type TextareaProps = InputHTMLAttributes<HTMLTextAreaElement> & {
  label: ReactNode;
};

export function Textarea({ label, className, ...props }: TextareaProps) {
  return (
    <div>
    <label className="block text-sm font-medium leading-6 text-gray-900">{label}</label>
        <textarea
          className={clsx(
            'block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6',
            className,
          )}
          {...props}
        />
      
    </div>
  );
}

function useDebounce(delay: number, initialValue = ''): [string, React.Dispatch<React.SetStateAction<string>>] {
  const [value, setValue] = useState(initialValue);
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timeout);
    };
  }, [value, delay]);

  return [debouncedValue, setValue];
}

type SearchInputProps = InputProps & {
  defaultValue?: string;
};

export function SearchInput({ defaultValue, ...props }: SearchInputProps) {
  const [debouncedValue, setValue] = useDebounce(500, defaultValue);
  const submit = useSubmit();
  const formRef = useRef<HTMLFormElement | null>();
  const debouncedValueRef = useRef(debouncedValue);

  useEffect(() => {
    if (debouncedValueRef.current === debouncedValue) {
      return;
    }
    if (formRef.current) {
      debouncedValueRef.current = debouncedValue;
      submit(formRef.current);
    }
  }, [debouncedValue, formRef, submit]);

  return (
    <Input
      {...props}
      defaultValue={defaultValue}
      key={defaultValue}
      onChange={(e) => {
        formRef.current = e.target.form;
        setValue(e.target.value);
      }}
    />
  );
}

type FormProps = RemixFormProps;

export function Form({ className, children, ...props }: FormProps) {
  return (
    <RemixForm
      className={clsx('w-full m-auto lg:max-w-3xl flex flex-col items-center justify-center gap-5', className)}
      {...props}
    >
      {children}
    </RemixForm>
  );
}

interface AttachmentProps {
  label: ReactNode;
  attachmentUrl: string;
  disabled?: boolean;
}

export function Attachment({ label, attachmentUrl, disabled = false }: AttachmentProps) {
  return (
    <div className="w-full lg:max-w-md flex gap-2 items-center justify-center mt-1 text-text dark:text-darkText text-lg font-semibold bg-background dark:bg-darkBackground py-4 px-2 rounded-lg border border-secondaryAccent dark:border-darkSecondaryAccent">
      {disabled ? (
        <span className="font-bold">{label}</span>
      ) : (
        <a
          href={attachmentUrl}
          className="font-bold underline decoration-4 underline-offset-2 decoration-primary dark:decoration-darkPrimary hover:decoration-primaryAccent hover:dark:decoration-darkPrimaryAccent"
        >
          {label}
        </a>
      )}
      <input type="hidden" name="attachmentUrl" value={attachmentUrl} />
      <button aria-label="Remove attachment" type="submit" name="intent" value="remove-attachment" disabled={disabled}>
        X
      </button>
    </div>
  );
}
