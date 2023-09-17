"use client";
import { CompleteTod } from "@/lib/db/schema/todo";
import { trpc } from "@/lib/trpc/client";
import TodModal from "./TodModal";


export default function TodList({ todo }: { todo: CompleteTod[] }) {
  const { data: t } = trpc.todo.getTodo.useQuery(undefined, {
    initialData: { todo },
    refetchOnMount: false,
  });

  if (t.todo.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {t.todo.map((tod) => (
        <Tod tod={tod} key={tod.tod.id} />
      ))}
    </ul>
  );
}

const Tod = ({ tod }: { tod: CompleteTod }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{tod.tod.name}</div>
      </div>
      <TodModal tod={tod.tod} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-gray-900">No todo</h3>
      <p className="mt-1 text-sm text-gray-500">
        Get started by creating a new tod.
      </p>
      <div className="mt-6">
        <TodModal emptyState={true} />
      </div>
    </div>
  );
};

