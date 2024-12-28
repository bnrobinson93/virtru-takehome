import { useEffect, useMemo, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import Footer from "./Footer";
import Header from "./Header";
import ServiceMonitor from "./ServiceMonitor";
import useFetch from "@/hooks/useFetch";

const REFRESH_INTERVAL = 5000;

function HealthDashboard() {
  const { data, error, loading, pause, resume, paused, lastUpdated } = useFetch(
    "http://localhost:8080/health",
    REFRESH_INTERVAL,
  );

  const [dataToDisplay, setDataToDisplay] = useState(data);
  const [timestamp, setTimestamp] = useState(lastUpdated);

  // Prevent rerender loop since this runs before other hooks
  const searchParams = useMemo(
    () => new URLSearchParams(window.location.search),
    [],
  );

  if (searchParams.size > 0 && !paused) pause();

  useEffect(() => {
    if (searchParams.size === 0) return;

    const status = searchParams.get("status") as Status;

    const timestamp = searchParams.get("timestamp");
    if (timestamp) setTimestamp(timestamp);

    const componentsStr = searchParams.get("components");
    const componentsArr = JSON.parse(componentsStr || "{}") as Components[];
    const components = Object.assign({}, ...componentsArr);

    setDataToDisplay({ status, components });
  }, [searchParams]);

  useEffect(() => {
    if (paused) return;
    console.log("Updating", lastUpdated, data);
    setTimestamp(lastUpdated);
    setDataToDisplay(data);
  }, [paused, lastUpdated, data]);

  return (
    <div
      className={cn(
        "grid min-h-dvh grid-rows-[auto,auto,1fr,auto] bg-white font-sans antialiased dark:bg-gray-950 dark:text-white",
      )}
    >
      <Toaster />
      <Header pause={pause} resume={resume} paused={paused} />
      <main className="mx-auto w-full max-w-4xl space-y-8">
        <ServiceMonitor
          timestamp={timestamp}
          data={dataToDisplay}
          error={error}
          loading={loading}
          paused={paused}
        />
      </main>
      <Footer />
    </div>
  );
}

export default HealthDashboard;
