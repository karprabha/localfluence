"use client";

import { useQuery } from "@apollo/client";
import { GET_CAMPAIGNS } from "@/graphql/queries";
import {
  CalendarIcon,
  CurrencyDollarIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { format } from "date-fns";

const CampaignList = () => {
  const { loading, error, data } = useQuery(GET_CAMPAIGNS);

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error)
    return <p className="text-center text-red-500">Error: {error?.message}</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-semibold text-gray-900 mb-4">Campaigns</h1>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {data.campaigns.map((campaign: any) => (
          <div
            key={campaign.id}
            className="bg-white shadow overflow-hidden sm:rounded-lg"
          >
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                {campaign.name}
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                {campaign.description}
              </p>
            </div>
            <div className="border-t border-gray-200">
              <dl>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    <UserIcon
                      className="h-5 w-5 text-gray-400 inline-block mr-2"
                      aria-hidden="true"
                    />
                    Manager
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {campaign.user.name}
                  </dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    <CurrencyDollarIcon
                      className="h-5 w-5 text-gray-400 inline-block mr-2"
                      aria-hidden="true"
                    />
                    Budget
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    ${campaign.budget}
                  </dd>
                </div>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    <CalendarIcon
                      className="h-5 w-5 text-gray-400 inline-block mr-2"
                      aria-hidden="true"
                    />
                    Start Date
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {format(new Date(campaign.startDate), "MMMM dd, yyyy")}
                  </dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    <CalendarIcon
                      className="h-5 w-5 text-gray-400 inline-block mr-2"
                      aria-hidden="true"
                    />
                    End Date
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {format(new Date(campaign.endDate), "MMMM dd, yyyy")}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default CampaignList;
