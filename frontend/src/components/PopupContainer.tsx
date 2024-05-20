import { X } from "lucide-react";

function PopupContainer({
  children,
  toggle,
  isOpen,
}: {
  children: React.ReactNode;
  toggle: () => void;
  isOpen: boolean;
}) {
  return (
    <>
      <div
        className={`absolute top-0 bottom-0 left-0 right-0 flex justify-center align-middle items-center z-30 ${
          isOpen ? "visible" : "hidden"
        }`}
      >
        <div className="border rounded-md p-4 bg-white mx-2 shadow-md max-w-[500px]">
          <div className="flex justify-end align-middle pb-6">
            <span className="icon" onClick={toggle}>
              <X />
            </span>
          </div>

          {children}
        </div>
      </div>
    </>
  );
}

export default PopupContainer;
