import { Metadata } from "next";
import React from "react";
import MeetingPage from "./MeetingPage";

interface PageProps {
  params: {
    id: string;
  };
}

export function generateMetadata({ params: { id } }: PageProps): Metadata {
  return {
    title: `Meeting ${id}`,
  };
}

function page({ params: { id } }: PageProps) {
  return <MeetingPage id={id} />;
}

export default page;
