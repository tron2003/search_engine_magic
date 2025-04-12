import { redirect } from "next/navigation"

interface PageProps { 

    searchParams: {

        [key:string]:string |string[]|undefined
    }
}

const Page = ({searchParams}:PageProps) => { 
    const query = searchParams.query
    if (Array.isArray(query) || !query) { 

        return redirect('/')
    }
    //querying logic
    

return <p>hello from after searching call</p>

}
export default Page