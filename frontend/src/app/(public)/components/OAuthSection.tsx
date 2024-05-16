import {
  generateOAuthUrl,
  githubOAuthOptions,
  googleOAuthOptions,
} from "@/utils/oauthConfig";

const OAuthSection = () => {
  const githubLoginUrl = generateOAuthUrl("github", githubOAuthOptions);
  const googleLoginUrl = generateOAuthUrl("google", googleOAuthOptions);

  return (
    <div className="mt-6 flex flex-col sm:flex-row sm:space-x-3">
      <div className="flex-1">
        <a
          href={googleLoginUrl}
          className="w-full justify-center items-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50 flex flex-col sm:flex-row"
        >
          <span className="sr-only">Sign up with Google</span>
          <svg
            className="w-5 h-5 mb-1 sm:mb-0 sm:mr-2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 326667 333333"
            fill="#4285f4"
          >
            <path
              d="M326667 170370c0-13704-1112-23704-3518-34074H166667v61851h91851c-1851 15371-11851 38519-34074 54074l-311 2071 49476 38329 3428 342c31481-29074 49630-71852 49630-122593m0 0z"
              fill="#4285f4"
            ></path>
            <path
              d="M166667 333333c44999 0 82776-14815 110370-40370l-52593-40742c-14074 9815-32963 16667-57777 16667-44074 0-81481-29073-94816-69258l-1954 166-51447 39815-673 1870c27407 54444 83704 91852 148890 91852z"
              fill="#34a853"
            ></path>
            <path
              d="M71851 199630c-3518-10370-5555-21482-5555-32963 0-11482 2036-22593 5370-32963l-93-2209-52091-40455-1704 811C6482 114444 1 139814 1 166666s6482 52221 17777 74814l54074-41851m0 0z"
              fill="#fbbc04"
            ></path>
            <path
              d="M166667 64444c31296 0 52406 13519 64444 24816l47037-45926C249260 16482 211666 1 166667 1 101481 1 45185 37408 17777 91852l53889 41853c13520-40185 50927-69260 95001-69260m0 0z"
              fill="#ea4335"
            ></path>
          </svg>
          <span className="hidden sm:inline-block">Google</span>
        </a>
      </div>
      <div className="flex-1 mt-3 sm:mt-0">
        <a
          href={githubLoginUrl}
          className="w-full justify-center items-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50 flex flex-col sm:flex-row"
        >
          <span className="sr-only">Sign up with Github</span>
          <svg
            className="h-5 w-5 mb-1 sm:mb-0 sm:mr-2"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
              clipRule="evenodd"
            />
          </svg>
          <span className="hidden sm:inline-block">Github</span>
        </a>
      </div>
    </div>
  );
};

export default OAuthSection;
