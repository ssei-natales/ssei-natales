const DASHBOARD_URL =
  "https://script.google.com/a/macros/dgac.gob.cl/s/AKfycbw4F5SP2-baxpG-sbQDd5-3YpkRdxdjQRiLpjW_pP60wUIRjZVWidYFAPZ1lIENmxQk/exec";

export default function DashboardPage() {
  return (
    <div className="relative left-1/2 w-screen -translate-x-1/2 px-4">
      <div className="glass glass-glow overflow-hidden rounded-3xl">
        <iframe src={DASHBOARD_URL} title="Dashboard SSEI" className="h-[85vh] w-full" />
      </div>
    </div>
  );
}
