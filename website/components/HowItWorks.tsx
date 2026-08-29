export default function HowItWorks() {
  return (
    <section id="how-it-works" className="w-full bg-[#f5f8fc] py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        
        <div className="reveal max-w-xl">
          <p className="text-sm font-bold uppercase tracking-[.16em] text-[#155eef]">PROCESS</p>
          <h2 className="display mt-3 text-4xl font-semibold sm:text-5xl text-[#10233d]">How it Works</h2>
          <p className="mt-4 text-lg leading-8 text-[#52647c]">
            Follow these four simple steps to get your task done efficiently and reliably with the best professionals in your area.
          </p>
        </div>
        
        <div className="relative mt-14 grid gap-5 md:grid-cols-4">
          <div className="step-line absolute left-[12.5%] right-[12.5%] top-8 hidden h-px md:block"></div>
          
          <article className="reveal relative">
            <span className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-[#155eef] text-lg font-bold text-white shadow-lg shadow-blue-200">01</span>
            <h3 className="mt-6 text-xl font-bold text-[#10233d]">Choose</h3>
            <p className="mt-2 leading-7 text-[#52647c]">Select the service category you need from our comprehensive list.</p>
          </article>
          
          <article className="reveal relative">
            <span className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-[#e0f4ef] text-lg font-bold text-[#087c6e]">02</span>
            <h3 className="mt-6 text-xl font-bold text-[#10233d]">Discover</h3>
            <p className="mt-2 leading-7 text-[#52647c]">Browse top-rated professionals nearby with detailed profiles.</p>
          </article>
          
          <article className="reveal relative">
            <span className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-[#e8effd] text-lg font-bold text-[#155eef]">03</span>
            <h3 className="mt-6 text-xl font-bold text-[#10233d]">Connect</h3>
            <p className="mt-2 leading-7 text-[#52647c]">Message securely and request services directly through the app.</p>
          </article>
          
          <article className="reveal relative">
            <span className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-[#fff0d8] text-lg font-bold text-[#b8660a]">04</span>
            <h3 className="mt-6 text-xl font-bold text-[#10233d]">Get It Done</h3>
            <p className="mt-2 leading-7 text-[#52647c]">Enjoy reliable service and leave a review to help others.</p>
          </article>
          
        </div>
      </div>
    </section>
  );
}
