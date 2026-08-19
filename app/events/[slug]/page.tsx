import { allEvents } from "../../data";

const repoName = "wivenhoe-music-trail";
const basePath = process.env.NODE_ENV === "production" ? `/${repoName}` : "";

function formatTime(minutes: number) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

export function generateStaticParams() {
  return allEvents.map((event) => ({ slug: event.slug }));
}

export default async function EventPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = allEvents.find((item) => item.slug === slug);

  if (!event) {
    return <main className="min-h-screen bg-zinc-950 text-white p-8">Event not found.</main>;
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="max-w-3xl mx-auto p-5 sm:p-8">
        <a href={`${basePath}/`} className="text-sm text-zinc-400 hover:text-white">← Back to timetable</a>
        <img
          src={`${basePath}${event.image}`}
          alt={event.artist}
          className="w-full h-64 sm:h-80 object-cover rounded-3xl mt-5 bg-zinc-800"
        />
        <div className="mt-6 text-sm uppercase tracking-wider text-zinc-400">{event.venue}</div>
        <h1 className="text-4xl font-bold mt-2">{event.title}</h1>
        <div className="text-xl text-zinc-300 mt-2">{event.artist}</div>
        <div className="mt-3 text-zinc-400">
          {formatTime(event.start)}–{formatTime(event.start + event.duration)}
        </div>
        <p className="mt-7 text-lg leading-8 text-zinc-300">{event.description}</p>
      </div>
    </main>
  );
}
