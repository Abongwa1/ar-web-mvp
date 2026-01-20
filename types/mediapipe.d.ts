declare module "@mediapipe/pose/pose.js" {
  export class Pose {
    constructor(options: any);
    setOptions(options: any): void;
    onResults(callback: (results: any) => void): void;
    close?(): void;
    send?(image: any): Promise<void>;
  }
}

declare module '@mediapipe/camera_utils/camera_utils.js' {
  export class Camera {
    constructor(videoElement: HTMLVideoElement, options: {
      onFrame: () => Promise<void>;
      width?: number;
      height?: number;
    });
    start(): Promise<void>;
    stop(): void;
  }
}
