import { StatCounter } from "./StatCounter";

export function StatsBar() {
  return (
    <section className="bg-navy-mid border-y border-steel py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          <StatCounter value={10} suffix="+" label="Years Experience" />
          <StatCounter value={500} suffix="+" label="Clients Served" />
          <StatCounter value={2} prefix="" suffix=" Countries" label="US & Canada Coverage" />
          <StatCounter value={24} suffix="h" label="Response Time" />
        </div>
      </div>
    </section>
  );
}
