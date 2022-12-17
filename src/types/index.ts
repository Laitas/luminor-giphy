export interface Image {
  id: string;
  images: {
    downsized: {
      url: string;
    };
    downsized_medium: {
      url: string;
    };
  };
  import_datetime: string;
  locked?: boolean;
  idx?: number;
}
