"use client";

import {
  Call,
  CallControls,
  SpeakerLayout,
  StreamCall,
  StreamTheme,
  useCall,
  useCallStateHooks,
  useStreamVideoClient,
} from "@stream-io/video-react-sdk";
import { Loader2 } from "lucide-react";
import React, { useState } from "react";
import useLoadcall from "../../../hooks/useLoadCall";
import { useUser } from "@clerk/clerk-react";
import useStreamCall from "@/hooks/useStreamCall";
import Link from "next/link";
import { buttonClassName } from "@/components/Button";

interface MeetingPageProps {
  id: string;
}

function MeetingPage({ id }: MeetingPageProps) {
  const { user, isLoaded: userLoaded } = useUser();
  const { call, callLoading } = useLoadcall(id);

  if (!userLoaded || callLoading) {
    return <Loader2 className="mx-auto animate-spin" />;
  }

  if (!call) {
    return <p className="text-center font-bold">Call not found</p>;
  }

  const notAllowedtoJoin =
    call.type === "private-meeting" &&
    (!user || !call.state.members.find((m) => m.user.id === user.id));

  if (!notAllowedtoJoin) {
    return (
      <p className="text-center font-bold">
        You are not allowed to join this meeting
      </p>
    );
  }

  return (
    <StreamCall call={call}>
      <StreamTheme className="space-y-3">
        <MeetingScreen />
        {/* <SpeakerLayout />
        <CallControls /> */}
      </StreamTheme>
    </StreamCall>
  );
}

export default MeetingPage;

function MeetingScreen() {
  const { useCallEndedAt, useCallStartsAt } = useCallStateHooks();

  const callEndedAt = useCallEndedAt();
  const callStartsAt = useCallStartsAt();

  const callIsInFuture = callStartsAt && new Date(callStartsAt) > new Date();
  const callHasEnded = !!callEndedAt;

  if (callHasEnded) {
    return <MeetingEndedScreen />;
  }

  if (callIsInFuture) {
    return <UpcomingMeetingScreen />;
  }

  return <div>Call Ui</div>;
}

function MeetingEndedScreen() {
  return (
    <div className="flex flex-col items-center gap-6">
      <p className="font-bold">This meeting has ended</p>
      <Link href="/">
        <a className={buttonClassName}>Go home</a>
      </Link>
    </div>
  );
}

function UpcomingMeetingScreen() {
  const call = useStreamCall();

  return (
    <div className="flex flex-col items-center gap-3">
      <p>
        This meeting is not started yet. It will be started at{" "}
        <span className="font-bold">
          {call.state.startsAt.toLocaleString()}
        </span>
      </p>
      <p>
        Description:{" "}
        <span className="font-bold">{call?.state.custom.description}</span>
      </p>
      <Link href={"/"} className={buttonClassName}>
        Go home
      </Link>
    </div>
  );
}
