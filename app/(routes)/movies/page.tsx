import ListPage from "@/components/sections/listpage/ListPage";

type Props = {
  searchParams?: { page?: string };
};

export default async function MoviesPage({ searchParams }: Props) {
  const params = await searchParams; 
  const page = Number(params?.page || 1);
  return <ListPage title="Movies" type="movie" page={page} />;
}