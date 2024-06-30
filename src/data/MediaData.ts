export interface MediaObject {
  title: string;
  thumbnail: ThumbnailUrls;
  year: number;
  category: string;
  rating: string;
  isTrending: boolean;
}

interface ThumbnailUrls {
  regular: RegularThumbnailUrls;
  trending: TrendingThumbnailUrls;
}

interface RegularThumbnailUrls {
  small: string;
  medium: string;
  large: string;
}

interface TrendingThumbnailUrls {
  small: string;
  large: string;
}
