import {
  ArrowPathIcon,
  CloudArrowUpIcon,
  CogIcon,
  LockClosedIcon,
  ServerIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";

const features = [
  {
    name: "Influencer Discovery",
    description:
      "Easily discover and connect with local influencers who align with your brand and campaign goals.",
    icon: ArrowPathIcon,
  },
  {
    name: "Campaign Management",
    description:
      "Efficiently manage your influencer marketing campaigns from start to finish with intuitive tools.",
    icon: CogIcon,
  },
  {
    name: "Monetization Options",
    description:
      "Empower influencers with effective monetization options to maximize their reach and earnings.",
    icon: ShieldCheckIcon,
  },
  {
    name: "Secure Connections",
    description:
      "Ensure secure connections and data privacy with built-in security measures and SSL certificates.",
    icon: LockClosedIcon,
  },
  {
    name: "Scalable Infrastructure",
    description:
      "Scale seamlessly with robust infrastructure, including reliable server setups and database backups.",
    icon: ServerIcon,
  },
  {
    name: "Push to Deploy",
    description:
      "Deploy updates and new features effortlessly with automated push-to-deploy capabilities.",
    icon: CloudArrowUpIcon,
  },
];

const Features = () => {
  return (
    <div className="relative bg-white py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-md px-4 text-center sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-lg font-semibold text-indigo-600">Features</h2>
        <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Everything you need to enhance your influencer campaigns
        </p>
        <p className="mx-auto mt-5 max-w-prose text-xl text-gray-500">
          Discover the powerful features of LocalFluence that streamline
          influencer marketing and campaign management.
        </p>
        <div className="mt-12">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="pt-6">
                <div className="flow-root rounded-lg bg-gray-50 px-6 pb-8">
                  <div className="-mt-6">
                    <div>
                      <span className="inline-flex items-center justify-center rounded-md bg-indigo-500 p-3 shadow-lg">
                        <feature.icon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </span>
                    </div>
                    <h3 className="mt-8 text-lg font-medium tracking-tight text-gray-900">
                      {feature.name}
                    </h3>
                    <p className="mt-5 text-base text-gray-500">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
