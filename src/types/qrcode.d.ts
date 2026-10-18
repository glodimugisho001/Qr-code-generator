// biome-ignore lint/suspicious/noShadowRestrictedNames: External library interface definition
declare module "qrcode" {
  export interface QRCodeOptions {
    version?: number;
    errorCorrectionLevel?:
      | "low"
      | "medium"
      | "quartile"
      | "high"
      | "L"
      | "M"
      | "Q"
      | "H";
    maskPattern?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
    margin?: number;
    scale?: number;
    width?: number;
    color?: {
      dark?: string;
      light?: string;
    };
  }

  export interface QRCodeToStringOptions extends QRCodeOptions {
    type?: "svg" | "utf8";
  }

  export function toDataURL(
    text: string | QRCodeSegment[],
    options?: QRCodeOptions,
  ): Promise<string>;
  export function toDataURL(
    text: string | QRCodeSegment[],
    callback: (error: Error | null | undefined, url: string) => void,
  ): void;
  export function toDataURL(
    text: string | QRCodeSegment[],
    options: QRCodeOptions,
    callback: (error: Error | null | undefined, url: string) => void,
  ): void;

  export function toString(
    text: string | QRCodeSegment[],
    options?: QRCodeToStringOptions,
  ): Promise<string>;
  export function toString(
    text: string | QRCodeSegment[],
    callback: (error: Error | null | undefined, string: string) => void,
  ): void;
  export function toString(
    text: string | QRCodeSegment[],
    options: QRCodeToStringOptions,
    callback: (error: Error | null | undefined, string: string) => void,
  ): void;

  export function toCanvas(
    canvasElement: HTMLCanvasElement,
    text: string | QRCodeSegment[],
    options?: QRCodeOptions,
  ): Promise<void>;
  export function toCanvas(
    canvasElement: HTMLCanvasElement,
    text: string | QRCodeSegment[],
    callback: (error: Error | null | undefined) => void,
  ): void;
  export function toCanvas(
    canvasElement: HTMLCanvasElement,
    text: string | QRCodeSegment[],
    options: QRCodeOptions,
    callback: (error: Error | null | undefined) => void,
  ): void;

  export type QRCodeSegment = {
    data: string;
    mode?: string;
  };
}
