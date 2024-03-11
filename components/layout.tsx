import MenubarLeft from "./MenubarLeft";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <MenubarLeft />
      <div className="h-[100%] min-h-[100vh] w-full bg-[#dee2e6] pl-64">
        <div className="mx-4 flex min-h-[100vh] items-center justify-center bg-white px-4 py-16">
          <div className="flex justify-between w-3/4">
            <div className="flex max-w-full gap-4 w-full">
              <div className="flex flex-col gap-4 w-full">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
