import Details from "@/components/sections/details/Details";

const SeriePage = async ({ params }: { params: Promise<{ serie: string }> }) => {
    const id = (await params).serie;
    return (
        <> 
            <Details  id={id} type="tv"/>
        </>
    )
    
};

export default SeriePage
