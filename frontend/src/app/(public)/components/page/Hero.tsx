import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-white">
      <div className="container mx-auto">
        <div className="relative z-10 bg-white pb-8 sm:pb-16 md:pb-20 lg:w-full lg:max-w-2xl lg:pb-44 xl:pb-44">
          <svg
            className="absolute inset-y-0 right-0 hidden h-full w-44 translate-x-1/2 2xl:translate-x-full transform text-white lg:block"
            fill="currentColor"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <polygon points="50,0 100,0 50,100 0,100" />
          </svg>

          <div className="relative px-4 lg:pt-6 sm:px-6 lg:px-8"></div>

          <div className="container mx-auto mt-10 px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28 2xl:ml-5">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block xl:inline">Connecting Businesses</span>{" "}
                <span className="block text-indigo-600 xl:inline">
                  with Influencers
                </span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mx-auto sm:mt-5 sm:max-w-xl sm:text-lg md:mt-5 md:text-xl lg:mx-0">
                LocalFluence facilitates seamless connections and campaign
                management, empowering influencers and businesses alike.
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <Link
                    href="/dashboard"
                    className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 md:py-4 md:px-10 md:text-lg"
                  >
                    Get started
                  </Link>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <Link
                    href="https://github.com/karprabha/localfluence"
                    className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-100 px-8 py-3 text-base font-medium text-indigo-700 hover:bg-indigo-200 md:py-4 md:px-10 md:text-lg"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <Image
          className="h-56 w-full object-cover sm:h-72 md:h-96 lg:h-full lg:w-full"
          src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80"
          alt="hero-img"
          width={1920}
          height={1280}
        />
      </div>
    </div>
  );
};

export default Hero;
