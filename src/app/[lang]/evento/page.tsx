import { getDictionary } from "@/i18n/utils"
import { EventView } from "@/components/event/event-view"

export default async function EventPage({
  params,
}: {
  params: Promise<{ lang: "en" | "es" }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-accent/30">
      <EventView dict={dict} />
    </div>
  )
}
