"use client";

export default function SnapshotButton() {
  const takeSnapshot = () => {
    const canvas = document.querySelector("canvas");
    if (!canvas) return;

    const url = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = "ar_snapshot.png";
    a.click();
  };

  return (
    <button
      onClick={takeSnapshot}
      className="absolute bottom-20 right-4 z-40 bg-white text-black px-4 py-2 rounded-lg"
    >
      Snapshot
    </button>
  );
}
