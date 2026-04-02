import { gql } from "@apollo/client";

export const GET_PHOTOS = gql`
  query GetPhotos($options: PageQueryOptions) {
    photos(options: $options) {
      data {
        id
        title
        url
        thumbnailUrl
        album {
          id
          title
        }
      }
      meta {
        totalCount
      }
    }
  }
`;

export const GET_ALBUM_PHOTOS = gql`
  query GetAlbumPhotos($albumId: ID!, $options: PageQueryOptions) {
    album(id: $albumId) {
      id
      title
      photos(options: $options) {
        data {
          id
          title
          url
          thumbnailUrl
          album {
            id
            title
          }
        }
        meta {
          totalCount
        }
      }
    }
  }
`;

export const GET_PHOTOS_OVERVIEW_STATS = gql`
  query GetPhotosOverviewStats {
    photos: photos(options: { paginate: { page: 1, limit: 1 } }) {
      meta {
        totalCount
      }
    }
    albums: albums(options: { paginate: { page: 1, limit: 1 } }) {
      meta {
        totalCount
      }
    }
  }
`;

export type PhotoRecord = {
  id: string;
  title: string;
  url: string;
  thumbnailUrl: string;
  album: { id: string; title: string } | null;
};

export type PhotosPage = {
  data: PhotoRecord[];
  meta: { totalCount: number } | null;
};

export type PhotosQueryResult = {
  photos: PhotosPage;
};

export type AlbumPhotosQueryResult = {
  album: {
    id: string;
    title: string;
    photos: PhotosPage;
  } | null;
};

export type PhotosOverviewStatsQueryResult = {
  photos: { meta: { totalCount: number } | null } | null;
  albums: { meta: { totalCount: number } | null } | null;
};

export type PhotoSortOrder = "ASC" | "DESC";

export type PhotoPageQueryOptions = {
  paginate: { page: number; limit: number };
  search?: { q: string };
  sort?: Array<{ field: string; order: PhotoSortOrder }>;
};

export function buildPhotoQueryOptions(
  titleSearch: string,
  page: number,
  pageSize: number,
  sortOrder: PhotoSortOrder,
): PhotoPageQueryOptions {
  const options: PhotoPageQueryOptions = {
    paginate: { page, limit: pageSize },
    sort: [{ field: "id", order: sortOrder }],
  };
  const q = titleSearch.trim();
  if (q.length > 0) {
    options.search = { q };
  }
  return options;
}
