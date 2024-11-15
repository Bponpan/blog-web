"use server";

import { cookies } from "next/headers";
import { isRedirectError } from "next/dist/client/components/redirect";
import { redirect } from "next/navigation";

import axios from "axios";

export async function login(prevState, formData) {
  try {
    const email = formData.get("email");
    const password = formData.get("password");

    console.log("email", email);
    console.log("password", password);

    const response = await axios.post(`${process.env.STRAIP_BASE_URL}/api/auth/local`, {
      identifier: email,
      password,
    });

    if (response.data.jwt) {
      cookies().set("token", response.data.jwt);
    }
  } catch (error) {
    return { message: error.message || "Failed to create" };
  }

  redirect("/special-blog");
}