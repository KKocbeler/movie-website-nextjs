import ActorPage from "@/components/sections/actor/ActorPage"

const ActorsPage = async ({params}: { params: Promise<{ actor: string }> }) => {
    const name = (await params).actor
    return (
        <ActorPage name={name}/>
    )
}

export default ActorsPage