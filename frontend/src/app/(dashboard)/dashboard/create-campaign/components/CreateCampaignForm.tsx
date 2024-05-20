"use client";
import { useState } from "react";
import * as Yup from "yup";
import { useMutation } from "@apollo/client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { CREATE_CAMPAIGN } from "@/graphql/mutations";
import { useRouter } from "next/navigation";
import { GET_CAMPAIGNS } from "@/graphql/queries";
import { XCircleIcon } from "@heroicons/react/20/solid";

interface CreateCampaignValues {
  name: string;
  description: string;
  budget: number;
  startDate: string;
  endDate: string;
}

const CreateCampaignForm: React.FC = () => {
  const router = useRouter();
  const [formErrors, setFormErrors] = useState<string[]>([]);

  const [createCampaign] = useMutation(CREATE_CAMPAIGN, {
    refetchQueries: [{ query: GET_CAMPAIGNS }],
    onCompleted: (data) => {
      console.log("Campaign created successfully:", data);
      router.push("/dashboard");
    },
    onError: (error) => {
      console.error("Error creating campaign:", error);
      if (error.graphQLErrors) {
        const validationErrors = error.graphQLErrors[0]?.extensions?.details;
        if (Array.isArray(validationErrors)) {
          setFormErrors(validationErrors);
        } else {
          setFormErrors([error.message]);
        }
      } else {
        setFormErrors([error.message]);
      }
    },
  });

  const handleSubmit = async (values: CreateCampaignValues) => {
    setFormErrors([]);
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
        <Form className="space-y-12">
          {formErrors.length > 0 && (
            <div className="rounded-md bg-red-50 p-4 mb-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <XCircleIcon
                    className="h-5 w-5 text-red-400"
                    aria-hidden="true"
                  />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">
                    There were errors with your submission
                  </h3>
                  <div className="mt-2 text-sm text-red-700">
                    <ul className="list-disc pl-5 space-y-1">
                      {formErrors.map((error, index) => (
                        <li key={index}>{error}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Campaign Information
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              This information will be displayed publicly so be careful what you
              share.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Name
                </label>
                <div className="mt-2">
                  <Field
                    type="text"
                    name="name"
                    id="name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Description
                </label>
                <div className="mt-2">
                  <Field
                    as="textarea"
                    id="description"
                    name="description"
                    rows={3}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  <ErrorMessage
                    name="description"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <p className="mt-3 text-sm leading-6 text-gray-600">
                  Write a few sentences about the campaign.
                </p>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="budget"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Budget
                </label>
                <div className="mt-2">
                  <Field
                    type="number"
                    name="budget"
                    id="budget"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  <ErrorMessage
                    name="budget"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="startDate"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Start Date
                </label>
                <div className="mt-2">
                  <Field
                    type="date"
                    name="startDate"
                    id="startDate"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  <ErrorMessage
                    name="startDate"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="endDate"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  End Date
                </label>
                <div className="mt-2">
                  <Field
                    type="date"
                    name="endDate"
                    id="endDate"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  <ErrorMessage
                    name="endDate"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="reset"
              onClick={() => router.push("/dashboard")}
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Create
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default CreateCampaignForm;
