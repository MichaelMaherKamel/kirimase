import SitList from "@/components/site/SitList";
import NewSitModal from "@/components/site/SitModal";
import { getSite } from "@/lib/api/site/queries";

export default async function Site() {
  const { site } = await getSite();  

  return (
    <main className="max-w-3xl mx-auto p-5 md:p-0 sm:pt-4">
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Site</h1>
        <NewSitModal />
      </div>
      <SitList site={site} />
    </main>
  );
}
