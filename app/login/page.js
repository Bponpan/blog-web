"use client";

import { useFormState } from "react-dom";
import { login } from "./action";

export default function Page() {
  const initstate = {
    message: null,
  };

  const [state, formAction] = useFormState(login, initstate);
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        action={formAction}
        className="w-full max-w-md p-8 bg-white shadow-md rounded-lg"
      >
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Login
        </h2>

        <div className="flex flex-col space-y-4">
          <label className="text-gray-700 font-medium">
            Email
            <input
              className="mt-2 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              name="email"
              type="email"
              placeholder="Enter your email"
            />
          </label>

          <label className="text-gray-700 font-medium">
            Password
            <input
              className="mt-2 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              name="password"
              type="password"
              placeholder="Enter your password"
            />
          </label>

          <div className="text-red-500 text-sm">{state?.message}</div>
        </div>

        <button className="w-full py-2 mt-6 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-200">
          Login
        </button>
      </form>
    </div>
  );
}
