"use client";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/navigation";
import { PencilIcon } from "@heroicons/react/20/solid";
import { GET_USER_PROFILE } from "@/graphql/queries";
import Image from "next/image";

const ProfilePage = () => {
  const { loading, error, data } = useQuery(GET_USER_PROFILE);
  const router = useRouter();

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error)
    return <p className="text-center text-red-500">Error: {error.message}</p>;

  const { userProfile } = data;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="relative bg-white shadow sm:rounded-lg">
        <div
          className="absolute inset-x-0 top-0 h-32 bg-cover bg-center"
          style={{ backgroundImage: `url(${userProfile.coverPhotoUrl})` }}
        ></div>
        <div className="relative flex justify-center mt-5">
          <Image
            src={userProfile.avatarUrl}
            alt="Avatar"
            className="h-32 w-32 rounded-full ring-4 ring-white"
            width={128}
            height={128}
          />
        </div>
        <div className="px-4 py-5 sm:px-6">
          <div className="text-center">
            <h3 className="text-3xl font-bold text-gray-900">
              {userProfile.name}
            </h3>
            <p className="mt-1 text-sm text-gray-500">{userProfile.email}</p>
          </div>
        </div>
        <div className="border-t border-gray-200">
          <dl>
            <div className="px-4 py-5 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Bio</dt>
              <dd className="mt-1 text-sm text-gray-900">{userProfile.bio}</dd>
            </div>
            {userProfile.userType === "influencer" && (
              <>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Followers Count
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {userProfile.influencerData.followersCount}
                  </dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Platform
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {userProfile.influencerData.platform}
                  </dd>
                </div>
              </>
            )}
            {userProfile.userType === "campaign_manager" && (
              <>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Company Name
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {userProfile.campaignManagerData.companyName}
                  </dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Campaign Budget
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    ${userProfile.campaignManagerData.campaignBudget}
                  </dd>
                </div>
              </>
            )}
            <div className="px-4 py-5 sm:px-6">
              <button
                type="button"
                onClick={() => router.push("/profile/edit")}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <PencilIcon className="h-5 w-5 mr-2" aria-hidden="true" />
                Edit Profile
              </button>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
