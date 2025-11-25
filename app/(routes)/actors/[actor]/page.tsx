import ActorPage from "@/components/sections/actor/ActorPage"

export async function generateMetadata({params}: { params: Promise<{ actor: string }> }) {
    const name = (await params).actor;
    const formattedName = name
        .replace(/%20/g, " ")
        .replace(/-/g, " ")
        .trim()
        .replace(/\s+/g, " ")
        .replace(/^./, c => c.toUpperCase())
    ;
    return {
        title: formattedName,
    };
}

const ActorsPage = async ({params}: { params: Promise<{ actor: string }> }) => {
    const name = (await params).actor
    return (
        <ActorPage name={name}/>
    )
}

export default ActorsPage