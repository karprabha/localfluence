import { useState } from "react";
import { useMutation } from "@apollo/client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import UPDATE_USER_TYPE from "@/graphql/mutations/updateUserType";
import ME from "@/graphql/queries/me";

interface Me {
  id: string;
  email: string;
  name: string;
  avatarUrl: string;
  userType: string | null;
}

interface UserTypeFormProps {
  me: Me;
}

interface InfluencerValues {
  followersCount: number | "";
  platform: string;
}

interface CampaignManagerValues {
  companyName: string;
  campaignBudget: number | "";
}

const UserTypeForm = ({ me }: UserTypeFormProps) => {
  const [userType, setUserType] = useState<string>("");

  const [updateUserType] = useMutation(UPDATE_USER_TYPE, {
    onCompleted: (data) => {
      console.log("User updated successfully:", data);
    },
    onError: (error) => {
      console.error("Error updating user:", error);
    },
    update: (cache, { data: { updateUserType } }) => {
      const existingMe = cache.readQuery<{ me: Me }>({ query: ME });
      if (existingMe) {
        cache.writeQuery({
          query: ME,
          data: {
            me: {
              ...existingMe.me,
              userType: updateUserType.userType,
            },
          },
        });
      }
    },
  });

  const handleSubmit = async (
    values: InfluencerValues | CampaignManagerValues
  ) => {
    const variables = {
      userId: me.id,
      userType,
      influencerData: userType === "influencer" ? values : null,
      campaignManagerData: userType === "campaign_manager" ? values : null,
    };

    await updateUserType({ variables });
  };

  const influencerSchema = Yup.object().shape({
    followersCount: Yup.number().required("Followers count is required"),
    platform: Yup.string().required("Platform is required"),
  });

  const campaignManagerSchema = Yup.object().shape({
    companyName: Yup.string().required("Company name is required"),
    campaignBudget: Yup.number().required("Campaign budget is required"),
  });

  if (me.userType) {
    return null;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Complete Your Profile</h2>
        {!userType && (
          <>
            <label className="block text-gray-700">Select Your Role:</label>
            <select
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              className="block w-full mt-1 p-2 border border-gray-300 rounded"
            >
              <option value="">--Select Role--</option>
              <option value="influencer">Influencer</option>
              <option value="campaign_manager">Campaign Manager</option>
            </select>
          </>
        )}

        {userType === "influencer" && (
          <Formik<InfluencerValues>
            initialValues={{ followersCount: "", platform: "" }}
            validationSchema={influencerSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <label className="block text-gray-700 mt-4">
                  Followers Count:
                </label>
                <Field
                  type="number"
                  name="followersCount"
                  className="block w-full mt-1 p-2 border border-gray-300 rounded"
                />
                <ErrorMessage
                  name="followersCount"
                  component="div"
                  className="text-red-500 text-sm"
                />

                <label className="block text-gray-700 mt-4">Platform:</label>
                <Field
                  type="text"
                  name="platform"
                  className="block w-full mt-1 p-2 border border-gray-300 rounded"
                />
                <ErrorMessage
                  name="platform"
                  component="div"
                  className="text-red-500 text-sm"
                />

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="block w-full bg-blue-500 text-white py-2 mt-4 rounded"
                >
                  Submit
                </button>
              </Form>
            )}
          </Formik>
        )}

        {userType === "campaign_manager" && (
          <Formik<CampaignManagerValues>
            initialValues={{ companyName: "", campaignBudget: "" }}
            validationSchema={campaignManagerSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <label className="block text-gray-700 mt-4">
                  Company Name:
                </label>
                <Field
                  type="text"
                  name="companyName"
                  className="block w-full mt-1 p-2 border border-gray-300 rounded"
                />
                <ErrorMessage
                  name="companyName"
                  component="div"
                  className="text-red-500 text-sm"
                />

                <label className="block text-gray-700 mt-4">
                  Campaign Budget:
                </label>
                <Field
                  type="number"
                  name="campaignBudget"
                  className="block w-full mt-1 p-2 border border-gray-300 rounded"
                />
                <ErrorMessage
                  name="campaignBudget"
                  component="div"
                  className="text-red-500 text-sm"
                />

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="block w-full bg-blue-500 text-white py-2 mt-4 rounded"
                >
                  Submit
                </button>
              </Form>
            )}
          </Formik>
        )}
      </div>
    </div>
  );
};

export default UserTypeForm;
