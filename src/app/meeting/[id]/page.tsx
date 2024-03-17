import { Metadata } from "next";
import React from "react";
import MeetingPage from "./MeetingPage";
import { currentUser } from "@clerk/nextjs";
import MeetingLoginPage from "./MeetingLoginPage";

interface PageProps {
  params: {
    id: string;
  };
  searchParams: { guest: string };
}

export function generateMetadata({ params: { id } }: PageProps): Metadata {
  return {
    title: `Meeting ${id}`,
  };
}

async function page({ params: { id }, searchParams: { guest } }: PageProps) {
  const user = await currentUser();

  const guestUser = guest === "true";

  if (!user && !guestUser) {
    return <MeetingLoginPage />;
  }

  return <MeetingPage id={id} />;
}

export default page;
