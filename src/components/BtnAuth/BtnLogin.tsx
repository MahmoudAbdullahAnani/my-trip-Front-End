function BtnLogin({ title, icon }: { title: string; icon: JSX.Element }) {
  return (
    <div
      style={{
        boxShadow: " rgb(0 90 108 / 30%)  0 4px 4px",
      }}
      className={`flex gap-[10px] justify-center items-center text-[16px] text-[#117C99] hover:bg-[#e4e1e171] font-medium rounded-[16px] w-[167px] h-[64px]`}
    >
      <span>{icon}</span>
      <span>{title}</span>
    </div>
  );
}

export default BtnLogin;
