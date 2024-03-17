import { useUser } from "@clerk/nextjs";
import { Call, CallRecording } from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";

export default function useLoadRecordings(call: Call) {
  const { user } = useUser();
  const [recordings, setRecording] = useState<CallRecording[]>([]);
  const [recordingsLoading, setRecordingsLoading] = useState(true);

  useEffect(() => {
    async function loadRecordings() {
      setRecordingsLoading(true);
      if (!user?.id) return;
      const { recordings } = await call.queryRecordings();
      setRecording(recordings);
      setRecordingsLoading(false);
    }

    loadRecordings();
  }, [call, user?.id]);

  return { recordings, recordingsLoading };
}
