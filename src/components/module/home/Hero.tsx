import { Button } from '@/components/ui/button';

export default function Hero() {
  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-background top-[-84px]">
      {/* background effects */}
      <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <div className="w-[40rem] h-[40rem] bg-gradient-to-tr from-mine to-transparent opacity-20 rounded-full blur-3xl" />
      </div>
      <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 pointer-events-none">
        <div className="w-[40rem] h-[40rem] bg-gradient-to-bl from-mine to-transparent opacity-20 rounded-full blur-3xl" />
      </div>

      <main>
        <section className="relative z-10 text-center py-32 sm:py-40 px-4">
          <div className="max-w-4xl mx-auto">
            <span className="inline-block px-4 py-1.5 text-xs font-semibold bg-mine rounded-full">
              Qupe Finance
            </span>
            <h1 className="mt-6 text-4xl sm:text-5xl lg:text-7xl font-bold">
              Build Your Vision  {" "}
              <span className="text-mine">With Me</span>
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-lg">
              Gain financial acumen using our expert tools and insights to efficiently
              manage your money and enhance personal wealth.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="w-full sm:w-auto">What I Made</Button>
              <Button variant="secondary" className="w-full sm:w-auto">
                Get Hire
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
