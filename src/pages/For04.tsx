import { useEffect } from "react";
function For04() {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  return (
    <div>
      <div className="bg-gradient-to-r from-[#9dc3ceb3] via-[#caeef7b3] to-[#657a7fb3] relative overflow-hidden h-screen">
        {/* <img
          src="https://external-preview.redd.it/4MddL-315mp40uH18BgGL2-5b6NIPHcDMBSWuN11ynM.jpg?width=960&crop=smart&auto=webp&s=b98d54a43b3dac555df398588a2c791e0f3076d9"
          className="absolute h-full w-full object-cover"
          alt="ajwaa"
        /> */}
        <div className="inset-0 bg-black opacity-25 absolute"> </div>
        <div className="container mx-auto px-6 md:px-12 relative z-10 flex items-center py-32 xl:py-40">
          <div className="w-full font-mono flex flex-col items-center relative z-10">
            <h1 className="font-extrabold text-5xl text-center text-white leading-tight mt-4">
              You are all alone here
            </h1>
            <p className="font-extrabold text-8xl my-44 text-white animate-bounce">
              404
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default For04;

/*
<div
      className={`dark:bg-black dark:text-[#fff] text-[#000] h-[100vh] w-[100%] flex justify-center items-center`}
    >
      <div>
        <Image
          className={`h-[400px] w-[100%]`}
          src={"/images/not-found.png"}
          width={100}
          height={100}
          alt="404"
        />
      </div>
      <div className={`flex flex-col gap-5`}>
        <div>
          <h1 className={`text-3xl`}>404 - الصفحة غير موجودة</h1>
          <p className={`text-2xl`}>.الصفحة التي تبحث عنها غير موجودة</p>
        </div>
        <Link
          className={`text-center w-fit mx-auto bg-primary rounded-xl hover:bg-[#296677] duration-150 text-lg p-2 px-10 text-white`}
          href={"/"}
        >
          رجوع
        </Link>
      </div>
    </div>






    ================================================================================
    <div>
      <div className="bg-indigo-900 relative overflow-hidden h-screen">
        <img
          src="https://external-preview.redd.it/4MddL-315mp40uH18BgGL2-5b6NIPHcDMBSWuN11ynM.jpg?width=960&crop=smart&auto=webp&s=b98d54a43b3dac555df398588a2c791e0f3076d9"
          className="absolute h-full w-full object-cover"
          alt="ajwaa"
        />
        <div className="inset-0 bg-black opacity-25 absolute"> </div>
        <div className="container mx-auto px-6 md:px-12 relative z-10 flex items-center py-32 xl:py-40">
          <div className="w-full font-mono flex flex-col items-center relative z-10">
            <h1 className="font-extrabold text-5xl text-center text-white leading-tight mt-4">
              You are all alone here
            </h1>
            <p className="font-extrabold text-8xl my-44 text-white animate-bounce">
              404
            </p>
          </div>
        </div>
      </div>
    </div>

*/
