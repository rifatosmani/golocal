export interface Media {
  mediaId: number;         // Unique identifier for the media
  url: string;             // The URL of the media
  fileName: string;        // The file name of the media
  refId: number;           // Reference ID for the associated entity (e.g., product, category)
  refTable: string;        // The table or entity this media is associated with
  main: boolean;    // Indicates if this media is the main one (nullable)
  addDate?: string;         // The date when the media was added (ISO 8601 format)
  modDate?: string;         // The date when the media was last modified (ISO 8601 format)
  status: number;          // Status of the media (e.g., active, inactive)
}
