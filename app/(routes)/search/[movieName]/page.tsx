import SearchPage from "@/components/sections/search/SearchPage";

const page = async ({ params }: { params: Promise<{ movieName: string }> }) => {
    const movieName = (await params).movieName
  return (
    <div className="container">
        <SearchPage query ={movieName}/>
    </div>
  )
}

export default page