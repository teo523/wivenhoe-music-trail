"use client";

import { useEffect, useMemo, useRef, useState } from "react";

export default function Page() {
  // ✅ Properly typed ref (fixes scrollTo + TS issues)
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const ROW_HEIGHT = 96;
  const TIME_SCALE = 2;

  // freeze NOW for initial centering (prevents hydration + jitter)
  const [initialNowMinutes] = useState<number>(() => {
    const d = new Date();
    return d.getHours() * 60 + d.getMinutes() + d.getSeconds() / 60;
  });

  const [now, setNow] = useState<Date>(() => new Date());
  const [followNow, setFollowNow] = useState<boolean>(false);

  // live clock
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const nowMinutes =
    now.getHours() * 60 +
    now.getMinutes() +
    now.getSeconds() / 60;

  const venues = useMemo(
    () => [
      {
        name: "Old Grocery",
        color: "bg-orange-500",
        events: [
          { title: "Morning Acoustic", start: 10 * 60, duration: 60 },
          { title: "Jazz Trio", start: 14 * 60, duration: 90 },
          { title: "Late Jam", start: 20 * 60, duration: 120 },
        ],
      },
      {
        name: "Rose & Crown",
        color: "bg-pink-500",
        events: [{ title: "Indie Set", start: 17 * 60, duration: 120 }],
      },
      {
        name: "St Mary's Hall",
        color: "bg-blue-500",
        events: [
          { title: "Choir", start: 12 * 60, duration: 60 },
          { title: "Folk Duo", start: 21 * 60, duration: 90 },
        ],
      },
      {
        name: "Black Buoy",
        color: "bg-green-500",
        events: [{ title: "Poetry Jam", start: 15 * 60, duration: 90 }],
      },
      {
        name: "Quayside Stage",
        color: "bg-purple-500",
        events: [{ title: "DJ Set", start: 22 * 60, duration: 150 }],
      },
    ],
    []
  );

  // follow NOW mode (smooth auto scroll)
  useEffect(() => {
    if (!followNow || !scrollRef.current) return;

    scrollRef.current.scrollTo({
      left: nowMinutes * TIME_SCALE,
      behavior: "smooth",
    });
  }, [nowMinutes, followNow]);

  // center on NOW when page loads (SAFE VERSION)
  useEffect(() => {
    requestAnimationFrame(() => {
      scrollRef.current?.scrollTo({
        left: initialNowMinutes * TIME_SCALE - window.innerWidth / 2,
        top: 0,
        behavior: "auto",
      });
    });
  }, [initialNowMinutes]);

  return (
    <div className="h-screen w-screen bg-zinc-950 text-white flex flex-col">

      {/* ================= HEADER ================= */}
      <div className="p-3 border-b border-zinc-800 flex justify-between items-center">

        <div className="flex items-center gap-3">

          {/* LOGO */}
          <img
            src="/logo.png"
            alt="Wivenhoe Music Trail"
            className="w-10 h-10 object-contain rounded-md drop-shadow-md"
          />

          <div>
            <h1 className="font-bold">Wivenhoe Music Trail</h1>
            <p className="text-xs text-zinc-400">
              Live festival timeline dashboard
            </p>
          </div>
        </div>

        <button
          onClick={() => setFollowNow(v => !v)}
          className={`text-xs px-3 py-1 rounded ${
            followNow ? "bg-red-500" : "bg-zinc-800"
          }`}
        >
          {followNow ? "Following NOW" : "Free Scroll"}
        </button>
      </div>

      {/* ================= BODY ================= */}
      <div ref={scrollRef} className="flex-1 overflow-auto">

        <div className="flex min-w-[2000px]">

          {/* LEFT PANEL */}
          <div className="sticky left-0 z-50 bg-zinc-900 border-r border-zinc-800 w-48">
            {venues.map((v) => (
              <div
                key={v.name}
                className="flex items-center px-3 border-b border-zinc-800"
                style={{ height: ROW_HEIGHT }}
              >
                <div>
                  <div className="text-sm font-bold">{v.name}</div>
                  <div className={`h-1.5 mt-1 rounded ${v.color}`} />
                </div>
              </div>
            ))}
          </div>

          {/* TIMELINE */}
          <div className="relative flex-1">
            <div
              className="relative"
              style={{
                width: 24 * 60 * TIME_SCALE,
                height: venues.length * ROW_HEIGHT,
              }}
            >

              {/* NOW LINE */}
              <div
                className="absolute top-0 bottom-0 w-[2px] bg-red-500 z-50"
                style={{ left: nowMinutes * TIME_SCALE }}
              >
                <div className="absolute top-2 -translate-x-1/2 bg-red-500 text-xs px-2 py-1 rounded">
                  NOW
                </div>
              </div>

              {/* GRID */}
              {Array.from({ length: 24 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute top-0 bottom-0 border-l border-zinc-800 text-xs text-zinc-600"
                  style={{ left: i * 60 * TIME_SCALE }}
                >
                  <span className="absolute top-2 left-1">
                    {String(i).padStart(2, "0")}:00
                  </span>
                </div>
              ))}

              {/* EVENTS */}
              {venues.map((venue, rowIndex) => {
                const top = rowIndex * ROW_HEIGHT;

                return (
                  <div
                    key={venue.name}
                    className="absolute left-0 right-0"
                    style={{ top, height: ROW_HEIGHT }}
                  >
                    {venue.events.map((event, i) => {
                      const left = event.start * TIME_SCALE;
                      const width = event.duration * TIME_SCALE;

                      const isLive =
                        nowMinutes >= event.start &&
                        nowMinutes <= event.start + event.duration;

                      return (
                        <div
                          key={i}
                          className={`absolute top-1/2 -translate-y-1/2 px-2 py-1 rounded text-xs ${
                            venue.color
                          } ${
                            isLive
                              ? "opacity-100 scale-110 shadow-lg"
                              : "opacity-60"
                          }`}
                          style={{ left, width }}
                        >
                          {event.title}
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ================= FOOTER ================= */}
      <div className="p-2 text-xs border-t border-zinc-800 flex justify-between text-zinc-400">
        <span>{now.toLocaleTimeString()}</span>
        <span>{followNow ? "Auto-follow ON" : "Manual control"}</span>
      </div>
    </div>
  );
}