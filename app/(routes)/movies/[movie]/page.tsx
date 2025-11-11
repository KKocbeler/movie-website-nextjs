import MovieActors from "@/components/sections/movie/MovieActors";
import MovieHeader from "@/components/sections/movie/MovieHeader";
import MovieOverview from "@/components/sections/movie/MovieOverview";

const MoviePage = async ({ params }: { params: Promise<{ movie: string }> }) => {
    const movie_id = (await params).movie;
    const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
    
    const res1 = await fetch(`https://api.themoviedb.org/3/movie/${movie_id}?api_key=${apiKey}&language=en-US`);
    const data1 = await res1.json();
    const movie = data1

    const id = movie.id;

    const [res2, res3] = await Promise.all([
        fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}`),
        fetch(`https://api.themoviedb.org/3/movie/${id}/images?api_key=${apiKey}`)
    ])

    if(!res2.ok) throw new Error("res2 failed")
    if(!res3.ok) throw new Error("res3 failed")

    const [data2, data3] = await Promise.all([res2.json(), res3.json()]);

    const cast = data2.cast;
    const images = data3.backdrops;
    console.log(images)
    return (
        <div className="container">
            <MovieHeader 
                poster_path={movie.poster_path}
                image = {images[0]}
                title={movie.title}
                release_date={movie.release_date}
                runtime={movie.runtime}
                vote_average={movie.vote_average}
                genres={movie.genres}
            />
            <MovieOverview overview={movie.overview} images={images}/>
            <MovieActors  cast={cast} />
        </div>
    )
    
};

export default MoviePage
