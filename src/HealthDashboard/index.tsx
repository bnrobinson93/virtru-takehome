import { cn } from "@/lib/utils";
import Footer from "./Footer";
import Header from "./Header";
import ServiceMonitor from "./ServiceMonitor";
import useFetch from "@/hooks/useFetch";

function HealthDashboard() {
  const { data, error, loading, pause, resume, paused } = useFetch(
    "http://localhost:8080/health",
    5000,
  );

  return (
    <div
      className={cn(
        "grid-rows-[auto 1fr auto] grid min-h-dvh bg-gray-50 font-sans antialiased dark:bg-gray-900 dark:text-white",
      )}
    >
      <Header pause={pause} resume={resume} paused={paused} />
      <main>
        <ServiceMonitor data={data} error={error} loading={loading} />
      </main>
      <Footer />
    </div>
  );
}

export default HealthDashboard;
