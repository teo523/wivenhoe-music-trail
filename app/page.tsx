"use client";

import { useEffect, useRef, useState } from "react";
import { venues, type EventItem } from "./data";

const ROW_HEIGHT = 29;
const EVENT_HEIGHT = 26;
const TIME_HEADER_HEIGHT = 20;

const TIME_SCALE = 2;
const SIDEBAR_WIDTH = 150;

const repoName = "wivenhoe-music-trail";
const basePath =
  process.env.NODE_ENV === "production" ? `/${repoName}` : "";

function formatTime(minutes: number) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;

  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

export default function Page() {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const [now, setNow] = useState<Date | null>(null);
  const [followNow, setFollowNow] = useState(false);

  const [selected, setSelected] = useState<
    (EventItem & { venue: string }) | null
  >(null);

  // =========================================================
  // CLOCK + INITIAL POSITION
  // =========================================================

  useEffect(() => {
    const firstNow = new Date();

    setNow(firstNow);

    const initialMinutes =
      firstNow.getHours() * 60 +
      firstNow.getMinutes() +
      firstNow.getSeconds() / 60;

    const frame = requestAnimationFrame(() => {
      const scroller = scrollRef.current;

      if (!scroller) return;

      scroller.scrollLeft = Math.max(
        0,
        initialMinutes * TIME_SCALE - scroller.clientWidth / 2
      );
    });

    const interval = window.setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => {
      cancelAnimationFrame(frame);
      window.clearInterval(interval);
    };
  }, []);

  const nowMinutes = now
    ? now.getHours() * 60 +
      now.getMinutes() +
      now.getSeconds() / 60
    : 0;

  // =========================================================
  // FOLLOW NOW
  // =========================================================

  useEffect(() => {
    if (!followNow || !now || !scrollRef.current) return;

    const scroller = scrollRef.current;

    scroller.scrollTo({
      left: Math.max(
        0,
        nowMinutes * TIME_SCALE - scroller.clientWidth / 2
      ),
      behavior: "smooth",
    });
  }, [followNow, nowMinutes, now]);

  return (
    <div className="h-screen w-screen bg-zinc-950 text-white flex flex-col overflow-hidden">

      {/* =====================================================
          HEADER
      ====================================================== */}

      <header className="shrink-0 px-2.5 py-1.5 border-b border-zinc-800 flex items-center justify-between gap-2 bg-zinc-950">

        <div className="flex items-center gap-2 min-w-0">

          {/* GOOSE LOGO */}
          <img
            src={`${basePath}/logo.png`}
            alt="Wivenhoe Music Trail goose logo"
            className="h-12 w-12 rounded-full object-cover shrink-0 border border-white/10"
          />

          <div className="min-w-0">

            <div className="flex items-center gap-2">

              <h1 className="font-bold text-sm sm:text-base leading-tight truncate">
                Wivenhoe Music Trail
              </h1>

              {/* LIVE DOT */}
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
              </span>

            </div>

            <p className="text-[10px] sm:text-xs text-zinc-400 truncate">
              Tap any event for details
            </p>

          </div>
        </div>

        {/* FOLLOW NOW */}

        <button
          onClick={() => setFollowNow((value) => !value)}
          className={`shrink-0 text-[10px] sm:text-xs px-2.5 py-1.5 rounded-lg transition ${
            followNow
              ? "bg-red-500"
              : "bg-zinc-800 hover:bg-zinc-700"
          }`}
        >
          {followNow ? "Following NOW" : "Free Scroll"}
        </button>

      </header>

      {/* =====================================================
          TIMELINE SCROLLER
      ====================================================== */}

      <main
        ref={scrollRef}
        className="timeline-scroll flex-1 overflow-auto"
        style={{
          WebkitOverflowScrolling: "touch",
        }}
      >

        <div
          className="flex"
          style={{
            width: SIDEBAR_WIDTH + 24 * 60 * TIME_SCALE,
            minHeight:
              TIME_HEADER_HEIGHT +
              venues.length * ROW_HEIGHT,
          }}
        >

          {/* =================================================
              LEFT SIDEBAR
          ================================================== */}

          <aside
            className="sticky left-0 z-40 shrink-0 bg-zinc-900 border-r border-zinc-800 shadow-xl"
            style={{
              width: SIDEBAR_WIDTH,
            }}
          >

            {/* EMPTY CORNER ABOVE VENUES */}

            <div
              className="border-b border-zinc-700 bg-zinc-950"
              style={{
                height: TIME_HEADER_HEIGHT,
              }}
            >
              <div className="h-full flex items-center px-2 text-[9px] uppercase tracking-wider text-zinc-500">
                Venues
              </div>
            </div>

            {/* VENUES */}

            {venues.map((venue) => (
              <div
                key={venue.name}
                className="flex items-center px-2 border-b border-zinc-800"
                style={{
                  height: ROW_HEIGHT,
                }}
              >
                <div className="w-full min-w-0">

                  <div className="text-[11px] sm:text-xxs leading-tight truncate">
                    {venue.name}
                  </div>

                  <div
                    className={`h-1 mt-1 rounded-full ${venue.color}`}
                  />

                </div>
              </div>
            ))}

          </aside>

          {/* =================================================
              TIMELINE
          ================================================== */}

          <section
            className="relative shrink-0"
            style={{
              width: 24 * 60 * TIME_SCALE,
              height:
                TIME_HEADER_HEIGHT +
                venues.length * ROW_HEIGHT,
            }}
          >

            {/* =================================================
                TIME RULER
            ================================================== */}

            <div
              className="absolute top-0 left-0 right-0 bg-zinc-950 border-b border-zinc-700 z-20"
              style={{
                height: TIME_HEADER_HEIGHT,
              }}
            >

              {Array.from({ length: 24 }).map((_, hour) => (
                <div
                  key={`time-${hour}`}
                  className="absolute top-0 bottom-0 border-l border-zinc-700"
                  style={{
                    left: hour * 60 * TIME_SCALE,
                  }}
                >

                  <span className="absolute top-1 left-1 text-[9px] text-zinc-400 whitespace-nowrap">
                    {String(hour).padStart(2, "0")}:00
                  </span>

                </div>
              ))}

            </div>

            {/* =================================================
                VERTICAL HOUR GRID
            ================================================== */}

            {Array.from({ length: 24 }).map((_, hour) => (
              <div
                key={`grid-${hour}`}
                className="absolute bottom-0 border-l border-zinc-800/80 pointer-events-none"
                style={{
                  top: TIME_HEADER_HEIGHT,
                  left: hour * 60 * TIME_SCALE,
                }}
              />
            ))}

            {/* =================================================
                VENUE ROWS + EVENTS
            ================================================== */}

            {venues.map((venue, rowIndex) => (

              <div
                key={venue.name}
                className="absolute left-0 right-0 border-b border-zinc-800/80"
                style={{
                  top:
                    TIME_HEADER_HEIGHT +
                    rowIndex * ROW_HEIGHT,
                  height: ROW_HEIGHT,
                }}
              >

                {venue.events.map((event) => {

                  const isLive =
                    !!now &&
                    nowMinutes >= event.start &&
                    nowMinutes <=
                      event.start + event.duration;

                  return (

                    <button
                      key={event.slug}
                      type="button"
                      aria-label={`More information about ${event.title}`}
                      onClick={() =>
                        setSelected({
                          ...event,
                          venue: venue.name,
                        })
                      }
                      className={`
                        group
                        absolute
                        top-1/2
                        -translate-y-1/2
                        rounded-lg
                        px-2
                        text-left
                        border
                        border-white/10
                        shadow-md
                        transition-all
                        cursor-pointer
                        focus:outline-none
                        focus:ring-2
                        focus:ring-white/70
                        hover:brightness-110
                        ${venue.color}
                        ${
                          isLive
                            ? "opacity-100 ring-2 ring-white/20 shadow-lg"
                            : "opacity-60 hover:opacity-95"
                        }
                      `}
                      style={{
                        left:
                          event.start *
                          TIME_SCALE,

                        width: Math.max(
                          event.duration *
                            TIME_SCALE,
                          78
                        ),

                        height: EVENT_HEIGHT,
                      }}
                    >

                      <div className="h-full flex items-center justify-between gap-1.5">

                        {/* EVENT TITLE */}

                        <div className="min-w-0 flex-1">

                          <div
                            className="
                              font-semibold
                              text-[10px]
                              sm:text-[11px]
                              leading-[1.15]
                              line-clamp-2
                              whitespace-normal
                            "
                          >
                            {event.title}
                          </div>

                        </div>

                        {/* INFO CUE */}

                        <span
                          aria-hidden="true"
                          className="
                            shrink-0
                            flex
                            items-center
                            justify-center
                            h-4
                            w-4
                            rounded-full
                            bg-black/25
                            border
                            border-white/25
                            text-[9px]
                            font-bold
                            leading-none
                            transition-transform
                            group-hover:scale-110
                          "
                        >
                          i
                        </span>

                      </div>

                    </button>

                  );

                })}

              </div>

            ))}

            {/* =================================================
                NOW LINE
            ================================================== */}

            {now && (

              <div
                className="absolute bottom-0 w-[2px] bg-red-500 z-30 pointer-events-none"
                style={{
                  top: 0,
                  left: nowMinutes * TIME_SCALE,
                }}
              >

                {/* NOW LABEL IN TIME RULER */}

                <div className="absolute top-[2px] -translate-x-1/2 bg-red-500 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full shadow-lg">
                  NOW
                </div>

              </div>

            )}

          </section>

        </div>

      </main>

      {/* =====================================================
          FOOTER
      ====================================================== */}

      <footer className="shrink-0 px-3 py-1.5 text-[10px] border-t border-zinc-800 flex justify-between text-zinc-400 bg-zinc-950">

        <span>
          {now
            ? now.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })
            : "--:--"}
        </span>

        <span>
          {followNow
            ? "Auto-follow ON"
            : "Swipe / scroll · tap events"}
        </span>

      </footer>

      {/* =====================================================
          EVENT DETAILS
      ====================================================== */}

      {selected && (
  <div
    className="
      fixed inset-0 z-[100]
      bg-black/60 backdrop-blur-sm
      flex items-end sm:items-center justify-center
      p-0 sm:p-4
    "
    onClick={() => setSelected(null)}
  >
    <div
      className="
        w-full sm:max-w-md
        max-h-[88vh]
        bg-zinc-900
        border border-zinc-700
        rounded-t-2xl sm:rounded-2xl
        overflow-y-auto
        shadow-2xl
      "
      onClick={(event) => event.stopPropagation()}
    >
      {/* SMALLER IMAGE */}

      <img
        src={`${basePath}${selected.image}`}
        alt={selected.artist}
        className="
          w-full
          h-28 sm:h-36
          object-cover
          bg-zinc-800
        "
      />

      {/* CONTENT */}

      <div className="p-4">

        {/* VENUE */}

        <div className="text-[10px] uppercase tracking-wider text-zinc-400">
          {selected.venue}
        </div>

        {/* TITLE */}

        <h2 className="text-lg sm:text-xl font-bold mt-0.5 leading-tight">
          {selected.title}
        </h2>

        {/* ARTIST */}

        <div className="text-sm text-zinc-300 mt-0.5">
          {selected.artist}
        </div>

        {/* TIME */}

        <div className="text-xs text-zinc-400 mt-1">
          {formatTime(selected.start)}
          {" – "}
          {formatTime(selected.start + selected.duration)}
        </div>

        {/* LOCATION */}

        <div className="mt-3">
          <div className="text-[10px] uppercase tracking-wider text-zinc-500 mb-0.5">
            Location
          </div>

          <a
            href={selected.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="
              flex
              items-start
              gap-1.5
              text-xs
              text-zinc-200
              hover:text-white
              transition
            "
          >
            <span aria-hidden="true">
              📍
            </span>

            <span className="underline underline-offset-2 decoration-zinc-600">
              {selected.address}
            </span>
          </a>
        </div>

        {/* DESCRIPTION */}

        <p className="mt-3 text-xs sm:text-sm leading-5 text-zinc-300">
          {selected.shortDescription}
        </p>

        {/* BUTTONS */}

        <div className="mt-4 flex gap-2">

          <a
            href={`${basePath}/events/${selected.slug}/`}
            className="
              flex-1
              text-center
              bg-white
              text-zinc-950
              font-semibold
              text-sm
              rounded-lg
              px-3
              py-2
            "
          >
            More info
          </a>

          <button
            onClick={() => setSelected(null)}
            className="
              px-3
              py-2
              rounded-lg
              bg-zinc-800
              hover:bg-zinc-700
              text-sm
            "
          >
            Close
          </button>

        </div>

      </div>
    </div>
  </div>
)}

    </div>
  );
}