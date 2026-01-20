"use client";

interface SnapshotButtonProps {
  canvasRef: any;
}

export default function SnapshotButton({ canvasRef }: SnapshotButtonProps) {
  const takeSnapshot = () => {
    if (!canvasRef.current) return;
    const url = canvasRef.current.domElement.toDataURL("image/png");
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
