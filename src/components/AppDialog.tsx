import * as Dialog from "@radix-ui/react-dialog";
import { XMarkIcon } from "@heroicons/react/20/solid";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  trigger: React.ReactNode;
  children: React.ReactNode;
}

const AppDialog = ({
  trigger,
  title,
  description,
  children,
  open,
  onOpenChange
}: Props) => {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      {trigger}
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-black/50 data-[state=open]:animate-overlayShow" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[90vw] max-w-2xl -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-4 shadow-lg focus:outline-none data-[state=open]:animate-contentShow">
          <Dialog.Close asChild>
            <button
              className="absolute right-5 top-4 inline-flex size-8 appearance-none items-center justify-center rounded-full text-primary hover:bg-light-theme focus:shadow-[0_0_0_2px] focus:shadow-medium-theme focus:outline-none"
              aria-label="Close"
            >
              <XMarkIcon className="size-5" />
            </button>
          </Dialog.Close>
          <Dialog.Title className="m-0 mr-10 text-lg font-medium text-dark">
            {title}
          </Dialog.Title>
          <Dialog.Description className="mb-5 mt-2.5 text-base leading-normal text-medium">
            {description}
          </Dialog.Description>
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default AppDialog;
