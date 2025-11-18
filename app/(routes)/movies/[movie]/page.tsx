import Details from "@/components/sections/details/Details";

const MoviePage = async ({ params }: { params: Promise<{ movie: string }> }) => {
    const id = (await params).movie;

    return (
        <>
            <Details id={id} type="movie"/>
        </>
    );
    
}

export default MoviePage
