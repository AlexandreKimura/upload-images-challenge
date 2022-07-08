import { Button, Box } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';

import { Header } from '../components/Header';
import { CardList } from '../components/CardList';
import { api } from '../services/api';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';

type Images = {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
};

type FetchImagesResponse = {
  after: string | null;
  data: Images[];
};

export default function Home(): JSX.Element {
  async function fetchImages({
    pageParam = null,
  }): Promise<FetchImagesResponse> {
    const response = await api.get(`/api/images`, {
      params: {
        after: pageParam,
      },
    });
    return response.data;
  }

  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    'images',
    fetchImages,
    // TODO GET AND RETURN NEXT PAGE PARAM
    {
      getNextPageParam: lastPage => lastPage.after || null,
    }
  );

  const formattedData = useMemo(() => {
    // TODO FORMAT AND FLAT DATA ARRAY
    const dataArray = data?.pages.flatMap(image => {
      return image.data.flat();
    });
    if (dataArray) {
      return Object.assign(dataArray);
    }
    return dataArray;
  }, [data]);

  // console.log(formattedData);

  if (isLoading && !isError) {
    // TODO RENDER LOADING SCREEN
    return <Loading />;
  }
  if (isError) {
    // TODO RENDER ERROR SCREEN
    return <Error />;
  }

  return (
    <>
      <Header />

      <Box maxW={1120} px={20} mx="auto" my={20}>
        <CardList cards={formattedData} />
        {/* TODO RENDER LOAD MORE BUTTON IF DATA HAS NEXT PAGE */}
        {hasNextPage && (
          <Button onClick={() => fetchNextPage()}>
            {isFetchingNextPage ? 'Carregando...' : 'Carregar mais'}
          </Button>
        )}
      </Box>
    </>
  );
}
