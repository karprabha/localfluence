import useAuth from "@/hooks/useAuth";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";

interface FormValues {
  email: string;
  password: string;
}

const LoginForm = () => {
  const { login, isLoading, error } = useAuth();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = async (
    values: FormValues,
    helpers: FormikHelpers<FormValues>
  ) => {
    await login(values.email, values.password);
    helpers.setSubmitting(false);
  };

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email address
            </label>
            <Field
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            />
            <ErrorMessage
              name="email"
              component="div"
              className="text-red-500 text-sm"
              aria-live="polite"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <Field
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            />
            <ErrorMessage
              name="password"
              component="div"
              className="text-red-500 text-sm"
              aria-live="polite"
            />
          </div>

          {error && <div className="text-red-500 text-sm">{error}</div>}

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              disabled={isSubmitting || isLoading}
            >
              {isSubmitting || isLoading ? "Signing in..." : "Sign in"}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
