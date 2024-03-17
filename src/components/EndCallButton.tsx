import useStreamCall from "@/hooks/useStreamCall";
import { useCallStateHooks } from "@stream-io/video-react-sdk";
import React from "react";

function EndCallButton() {
  const call = useStreamCall();
  const { useLocalParticipant } = useCallStateHooks();

  const localParticipant = useLocalParticipant();
  const participantisChannelOwner =
    localParticipant &&
    call.state.createdBy &&
    localParticipant.userId === call.state.createdBy.id;

  if (!participantisChannelOwner) return null;

  return (
    <button
      onClick={call.endCall}
      className="mx-auto font-medium text-red-500 hover:underline"
    >
      End call for everyone
    </button>
  );
}

export default EndCallButton;
