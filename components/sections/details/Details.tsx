import DetailHeader from './DetailHeader';
import DetailOverview from './DetailOverview';
import DetailActors from './DetailActors';

type Props = {
    id: string | number;
    type: "movie" | "tv"
}

const Details = async ({id, type}: Props) => {
    const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
    
    const res1 = await fetch(`https://api.themoviedb.org/3/${type}/${id}?api_key=${apiKey}&language=en-US`);
    const data1 = await res1.json();
    const detailData = data1;

    const detail_id = detailData.id

    const [res2, res3] = await Promise.all([
        fetch(`https://api.themoviedb.org/3/${type}/${detail_id}/credits?api_key=${apiKey}`),
        fetch(`https://api.themoviedb.org/3/${type}/${detail_id}/images?api_key=${apiKey}`)
    ])

    if(!res2.ok) throw new Error("res2 failed")
    if(!res3.ok) throw new Error("res3 failed")

    const [data2, data3] = await Promise.all([res2.json(), res3.json()]);

    const cast = data2.cast;
    const images = data3.backdrops.slice(0, 9);
    return (
        <div className="container">
            <DetailHeader 
                poster_path={detailData.poster_path}
                image = {images[0]}
                title={type === "movie" ? detailData.title : detailData.name }
                release_date={type === "movie" ? detailData.release_date : detailData.last_air_date}
                runtime={type === "movie" ? detailData.runtime : detailData.episode_run_time}
                vote_average={detailData.vote_average}
                genres={detailData.genres}
            />
            <DetailOverview overview={detailData.overview} images={images}/>
            <DetailActors cast={cast} />
        </div>
    )
    
};

export default Details