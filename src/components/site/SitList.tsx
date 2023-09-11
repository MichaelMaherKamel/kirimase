"use client";
import { CompleteSit } from "@/lib/db/schema/site";
import { trpc } from "@/lib/trpc/client";
import SitModal from "./SitModal";


export default function SitList({ site }: { site: CompleteSit[] }) {
  const { data: s } = trpc.site.getSite.useQuery(undefined, {
    initialData: { site },
    refetchOnMount: false,
  });

  if (s.site.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {s.site.map((sit) => (
        <Sit sit={sit} key={sit.id} />
      ))}
    </ul>
  );
}

const Sit = ({ sit }: { sit: CompleteSit }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{sit.sitename}</div>
      </div>
      <SitModal sit={sit} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-gray-900">No sit</h3>
      <p className="mt-1 text-sm text-gray-500">
        Get started by creating a new sit.
      </p>
      <div className="mt-6">
        <SitModal emptyState={true} />
      </div>
    </div>
  );
};

