import { useState } from "react";
import { useTranslation } from "react-i18next";

const data = [
  {
    _id: Math.random(),
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100"
        height="100"
        viewBox="0 0 24 24"
      >
        <path d="M22 6h-4V2H6v4H2v12h4v4h12v-4h4V6zM8 4h8v2H8V4zm12 14h-4v-4H4V8h4V4h12v4h4v8h-4v4z" />
      </svg>
    ),
    title: "مجموعة واسعة من الخيارات",
    content: `نحن نوفر لك مجموعة متنوعة من الخيارات فيما يتعلق بالرحلات الجوية، الفنادق، وخدمات استئجار السيارات، مما يسمح لك باختيار ما يناسب احتياجاتك وميزانيتك بكل سهولة.`,
  },
  {
    _id: Math.random(),
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100"
        height="100"
        viewBox="0 0 24 24"
      >
        <path d="M12 16a5 5 0 0 1-5-5c0-2.67 2-5 5-5s5 2.33 5 5a5 5 0 0 1-5 5zm0-10a3 3 0 0 0-3 3c0 1.34 1 3 3 3s3-1.66 3-3a3 3 0 0 0-3-3z" />
        <path d="M0 0h24v24H0z" fill="none" />
      </svg>
    ),
    title: "أفضل الأسعار والعروض الترويجية",
    content: `نحن نسعى دائمًا لتقديم أفضل الأسعار لعملائنا، بالإضافة إلى تقديم عروض ترويجية مميزة وتخفيضات حصرية لتجربة سفر مميزة بأسعار مناسبة.`,
  },
  {
    _id: Math.random(),
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100"
        height="100"
        viewBox="0 0 24 24"
      >
        <path d="M21 19H3v-2h18v2zM21 3H3v2h18V3zM21 7H3v2h18V7z" />
      </svg>
    ),
    title: "حجوزات مرنة وسهلة",
    content: `يمكنك القيام بحجوزاتك بكل سهولة ويسر عبر موقعنا الإلكتروني أو تطبيق الهاتف المحمول، ويتيح لك نظامنا المرن تعديل أو إلغاء الحجوزات بسهولة ودون أية رسوم إضافية في بعض الحالات.`,
  },
  {
    _id: Math.random(),
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100"
        height="100"
        viewBox="0 0 24 24"
      >
        <path d="M0 0h24v24H0z" fill="none" />
        <path d="M22 2H2v20l4-4h16V6l-4-4zM6 20V4.04L18 12l-12 8.04z" />
      </svg>
    ),
    title: "تجربة سفر فريدة",
    content: `نحن نضمن لك تجربة سفر لا تُنسى، حيث نعمل جاهدين على توفير أعلى مستويات الراحة والجودة في كل خدماتنا، سواء كانت الرحلات الجوية أو إقامة الفنادق أو استئجار السيارات.`,
  },
  {
    _id: Math.random(),
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100"
        height="100"
        viewBox="0 0 24 24"
      >
        <path d="M12 21c-5.52 0-10-4.48-10-10V2h20v9c0 5.52-4.48 10-10 10zm0-18c-4.41 0-8 3.59-8 8v9h16v-9c0-4.41-3.59-8-8-8zm-2 9h4v2h-4v-2zm2-6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
        <path d="M0 0h24v24H0z" fill="none" />
      </svg>
    ),
    title: "أمان وأمان",
    content: `نحن نولي أهمية كبيرة لسلامة عملائنا، ونتخذ جميع التدابير اللازمة لضمان توفير بيئة آمنة وموثوقة خلال رحلاتهم وإقامتهم.`,
  },
  {
    _id: Math.random(),
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100"
        height="100"
        viewBox="0 0 24 24"
      >
        <path d="M3 3h18v2H3V3zM3 9h18v2H3V9zM3 15h18v2H3v-2z" />
      </svg>
    ),
    title: "تجربة مستخدم مبتكرة",
    content: `يتميز موقعنا الإلكتروني وتطبيقنا بواجهة مستخدم بسيطة ومبتكرة، مما يجعل عملية الحجز سهلة وممتعة بالنسبة لكل عميل.`,
  },
  {
    _id: Math.random(),
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100"
        height="100"
        viewBox="0 0 24 24"
      >
        <path d="M18 7v2h-4V7h4zM6 7v2H2V7h4zm5 4H2v2h9v-2zm5-4v2h-4V7h4zM18 5h-4v2h4V5zm-2 4v2H9V9h7zm2 0v2h-2V9h2z" />
      </svg>
    ),
    title: "مرونة في الدفع",
    content: `نقدم خيارات دفع متعددة تناسب جميع الاحتياجات، بما في ذلك الدفع الفوري، وبطاقات الائتمان، وتحويل البنكي، مما يجعل عملية الحجز أكثر ملاءمة لك.`,
  },
  {
    _id: Math.random(),
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100"
        height="100"
        viewBox="0 0 24 24"
      >
        <path d="M0 0h24v24H0z" fill="none" />
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17h2v-2h-2v2zm1-5a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm2-8h-4v2h4V6z" />
      </svg>
    ),
    title: "معلومات موثوقة ودقيقة",
    content: `نحرص على توفير معلومات دقيقة وشاملة حول الرحلات، الفنادق، والسيارات المتاحة، لتمكينك من اتخاذ قرارات مدروسة ومناسبة.`,
  },
];
export default function Advantages() {
  // Lang
  const { t } = useTranslation();
  const [toggle, setToggle] = useState(6);
  return (
    <section
      id="features"
      className="bg-[#F9F9F9] py-16 md:py-20 lg:py-28 px-[16px] lg:px-[96px]"
    >
      <div className="container flex flex-col items-center gap-3">
        <div
          className="wow fadeInUp max-w-[570px] mb-[100px] w-full mx-auto text-center"
          data-wow-delay=".1s"
        >
          <h2 className="mb-4 text-3xl font-bold !leading-tight text-black  sm:text-4xl md:text-[45px]">
            المميزات الرئيسية
          </h2>
          <p className="text-base !leading-relaxed text-body-color md:text-lg">
            هناك العديد من الاختلافات في مقاطع المتاحة ولكن الغالبية تعرض
            تعديلات في شكل ما.
          </p>
        </div>
        <div
          dir="rtl"
          className="grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3"
        >
          {data.slice(0, toggle).map((item) => (
            <div className="w-full" key={`${item._id}---${Math.random()}`}>
              <div className="wow fadeInUp" data-wow-delay=".15s">
                <div className="mb-10 flex h-[70px] w-[70px] items-center justify-center rounded-md bg- bg-opacity-10 text-primary">
                  {item.icon}
                </div>
                <h3 className="mb-5 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
                  {item.title}
                </h3>
                <p className="pr-[10px] text-base font-medium leading-relaxed text-body-color">
                  {item.content}
                </p>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={() => setToggle(toggle === 6 ? data.length : 6)}
          type="button"
          className={`w-[177px] h-[47px] mt-2  rounded-[13px] bg-[#117C99] hover:bg-[#216678] text-[#FFF] hover:text-[#cfcfcf] duration-150 text-[14px] font-[500] `}
        >
          {toggle === 6 ? t("عرض المزيد") : t("عرض اقل")}
        </button>
      </div>
    </section>
  );
}
