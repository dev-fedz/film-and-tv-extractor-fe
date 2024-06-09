export default function Navbar({ title, setIsOpen, isOpen }) {
  return (
    <div className="flex items-center h-[100px] px-12 shrink-0 bg-primary">
      <div className="flex flex-col w-auto">
        <div className="flex flex-row">
          <i
            className="pi pi-bars text-xl text-white mr-3 cursor-pointer lg:hidden"
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          ></i>
          <label className="flex text-white font-bold items-center text-2xl">
            {title}
          </label>
        </div>
      </div>
    </div>
  );
}
