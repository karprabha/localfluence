import * as Yup from "yup";
import { useMutation } from "@apollo/client";
import { Formik, Form, Field, ErrorMessage } from "formik";

import { CREATE_CAMPAIGN } from "@/graphql/mutations";

interface CreateCampaignValues {
  name: string;
  description: string;
  budget: number;
  startDate: string;
  endDate: string;
}

const CreateCampaignForm: React.FC = () => {
  const [createCampaign] = useMutation(CREATE_CAMPAIGN, {
    onCompleted: (data) => {
      console.log("Campaign created successfully:", data);
    },
    onError: (error) => {
      console.error("Error creating campaign:", error);
    },
  });

  const handleSubmit = async (values: CreateCampaignValues) => {
    await createCampaign({ variables: values });
  };

  const campaignSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    description: Yup.string(),
    budget: Yup.number().required("Budget is required"),
    startDate: Yup.date().required("Start date is required"),
    endDate: Yup.date().required("End date is required"),
  });

  return (
    <Formik
      initialValues={{
        name: "",
        description: "",
        budget: 0,
        startDate: "",
        endDate: "",
      }}
      validationSchema={campaignSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="space-y-6">
          <div>
            <label className="block text-gray-700">Name</label>
            <Field
              type="text"
              name="name"
              className="block w-full mt-1 p-2 border border-gray-300 rounded"
            />
            <ErrorMessage
              name="name"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          <div>
            <label className="block text-gray-700">Description</label>
            <Field
              type="text"
              name="description"
              className="block w-full mt-1 p-2 border border-gray-300 rounded"
            />
            <ErrorMessage
              name="description"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          <div>
            <label className="block text-gray-700">Budget</label>
            <Field
              type="number"
              name="budget"
              className="block w-full mt-1 p-2 border border-gray-300 rounded"
            />
            <ErrorMessage
              name="budget"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          <div>
            <label className="block text-gray-700">Start Date</label>
            <Field
              type="date"
              name="startDate"
              className="block w-full mt-1 p-2 border border-gray-300 rounded"
            />
            <ErrorMessage
              name="startDate"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          <div>
            <label className="block text-gray-700">End Date</label>
            <Field
              type="date"
              name="endDate"
              className="block w-full mt-1 p-2 border border-gray-300 rounded"
            />
            <ErrorMessage
              name="endDate"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

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
  );
};

export default CreateCampaignForm;
