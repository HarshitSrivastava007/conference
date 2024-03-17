import useLoadRecordings from "@/hooks/useLoadRecordings";
import useStreamCall from "@/hooks/useStreamCall";
import { useUser } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import React from "react";

function RecordingsList() {
  const call = useStreamCall();
  const { recordings, recordingsLoading } = useLoadRecordings(call);

  const { user, isLoaded: userLoaded } = useUser();

  if (userLoaded && !user) {
    return <p>Ypu must be logged in to view recordings. </p>;
  }

  if (recordingsLoading) {
    return <Loader2 className="mx-auto animate-spin" />;
  }

  return (
    <div className="space-y-3 text-center">
      {recordings.length === 0 && <p>No recordings found for this meeting.</p>}
      <ul className="list-inside list-disc">
        {recordings
          .sort((a, b) => b.end_time.localeCompare(a.end_time))
          .map((recording) => (
            <li key={recording.url}>
              <Link
                href={recording.url}
                target="_blank"
                className="hover:underline"
              >
                {new Date(recording.end_time).toLocaleString()}
              </Link>
            </li>
          ))}
      </ul>
      <p className="text-sm text-gray-500">
        Note: It can take up to a minute for the recording show up.
        <br />
        you can refresh the page to see if the recording is available.
      </p>
    </div>
  );
}

export default RecordingsList;
