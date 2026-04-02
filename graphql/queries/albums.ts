import { gql } from "@apollo/client";

/** Paginated albums with title search (`search.q`) and optional owner scoping via `user.albums`. */
export const GET_ALBUMS = gql`
  query GetAlbums($options: PageQueryOptions) {
    albums(options: $options) {
      data {
        id
        title
        user {
          id
          name
        }
        photos(options: { paginate: { page: 1, limit: 1 } }) {
          meta {
            totalCount
          }
          data {
            thumbnailUrl
            url
          }
        }
      }
      meta {
        totalCount
      }
    }
  }
`;

export const GET_USER_ALBUMS = gql`
  query GetUserAlbums($userId: ID!, $options: PageQueryOptions) {
    user(id: $userId) {
      id
      name
      albums(options: $options) {
        data {
          id
          title
          user {
            id
            name
          }
          photos(options: { paginate: { page: 1, limit: 1 } }) {
            meta {
              totalCount
            }
            data {
              thumbnailUrl
              url
            }
          }
        }
        meta {
          totalCount
        }
      }
    }
  }
`;

/** Metric cards, gallery strip, and list totals (one round trip). */
export const GET_ALBUMS_OVERVIEW_STATS = gql`
  query GetAlbumsOverviewStats {
    albums: albums(options: { paginate: { page: 1, limit: 1 } }) {
      meta {
        totalCount
      }
    }
    photos: photos(options: { paginate: { page: 1, limit: 1 } }) {
      meta {
        totalCount
      }
    }
    users: users(options: { paginate: { page: 1, limit: 1 } }) {
      meta {
        totalCount
      }
    }
    galleryPhotos: photos(options: { paginate: { page: 1, limit: 4 } }) {
      data {
        id
        title
        url
        thumbnailUrl
        album {
          title
          user {
            name
          }
        }
      }
    }
  }
`;

export type AlbumRecord = {
  id: string;
  title: string;
  user: { id: string; name: string } | null;
  photos: {
    meta: { totalCount: number } | null;
    data: Array<{ thumbnailUrl: string; url: string }>;
  } | null;
};

export type AlbumsPage = {
  data: AlbumRecord[];
  meta: { totalCount: number } | null;
};

export type AlbumsQueryResult = {
  albums: AlbumsPage;
};

export type UserAlbumsQueryResult = {
  user: {
    id: string;
    name: string;
    albums: AlbumsPage;
  } | null;
};

export type GalleryPhotoRecord = {
  id: string;
  title: string;
  url: string;
  thumbnailUrl: string;
  album: {
    title: string;
    user: { name: string } | null;
  } | null;
};

export type AlbumsOverviewStatsQueryResult = {
  albums: { meta: { totalCount: number } | null } | null;
  photos: { meta: { totalCount: number } | null } | null;
  users: { meta: { totalCount: number } | null } | null;
  galleryPhotos: { data: GalleryPhotoRecord[] } | null;
};

export type AlbumPageQueryOptions = {
  paginate: { page: number; limit: number };
  search?: { q: string };
};

export function buildAlbumQueryOptions(
  titleSearch: string,
  page: number,
  pageSize: number,
): AlbumPageQueryOptions {
  const options: AlbumPageQueryOptions = {
    paginate: { page, limit: pageSize },
  };
  const q = titleSearch.trim();
  if (q.length > 0) {
    options.search = { q };
  }
  return options;
}
