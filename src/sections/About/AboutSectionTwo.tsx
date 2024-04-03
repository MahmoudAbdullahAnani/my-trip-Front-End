const AboutSectionTwo = () => {
  return (
    <section className="py-16 md:py-20 lg:py-28">
      <div className="container">
        <div className="-mx-4 flex flex-wrap items-center">
          <div className="w-full px-4 lg:w-1/2">
            <div
              className="wow fadeInUp relative mx-auto mb-12 aspect-[25/24] max-w-[500px] text-center lg:m-0"
              data-wow-delay=".15s"
            >
              <img
                src="/images/about/car-2453604_640.jpg"
                alt="about image"
                className={`rounded-lg object-fit`}
              />
            </div>
          </div>
          <div className="w-full px-4 lg:w-1/2" dir="rtl">
            <div className="wow fadeInUp max-w-[470px]" data-wow-delay=".2s">
              <div className="mb-9">
                <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
                  تشكيلة واسعة من السيارات
                </h3>
                <p className="text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed">
                  نقدم مجموعة متنوعة من السيارات بمختلف الفئات والموديلات، مما
                  يتيح للعملاء اختيار السيارة التي تناسب احتياجاتهم بشكل دقيق.
                </p>
              </div>
              <div className="mb-9">
                <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
                  خدمة عملاء ممتازة
                </h3>
                <p className="text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed">
                  فريق خدمة العملاء لدينا متفانٍ في تقديم الدعم والمساعدة
                  للعملاء في جميع الأوقات، مما يضمن رضاهم التام وتجربة مريحة
                  خلال عملية التأجير.
                </p>
              </div>
              <div className="mb-1">
                <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
                  عروض وأسعار تنافسية
                </h3>
                <p className="text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed">
                  نحرص على تقديم عروض مغرية وأسعار تنافسية تتناسب مع ميزانيات
                  العملاء، مما يجعلنا الخيار الأمثل لتأجير السيارات بأفضل قيمة
                  ممكنة.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSectionTwo;
