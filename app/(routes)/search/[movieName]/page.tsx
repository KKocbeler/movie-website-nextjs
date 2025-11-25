import SearchPage from "@/components/sections/search/SearchPage";

export async function generateMetadata({params}: { params: Promise<{ movieName: string }> }) {
    const movieName = (await params).movieName;
    const formattedMovieName = movieName
        .replace(/%20/g, " ")
        .replace(/-/g, " ")
        .trim()
        .replace(/\s+/g, " ")
        .replace(/^./, c => c.toUpperCase())
    ;
    return {
        title: `Search ${formattedMovieName}`,
    };
}

const page = async ({ params }: { params: Promise<{ movieName: string }> }) => {
    const movieName = (await params).movieName
  return (
    <div className="container">
        <SearchPage query ={movieName}/>
    </div>
  )
}

export default page