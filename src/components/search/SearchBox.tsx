import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { type CoinSearchType } from "../../types/CoinSearchType";
import { searchPrices } from "../../services/SearchPrice";
import { toast } from "sonner";
import { ArrowLeft, X } from "lucide-react";
function SearchBox() {
  const [suggestions, setSuggestions] = useState<CoinSearchType[]>([]);
  const [query, setQuery] = useState("");
  const [searchparams] = useSearchParams();
  const navigate = useNavigate();
  const urlquery = searchparams.get("query");
  const handleSuggestions = (query: string, e: any) => {
    e.preventDefault();
    navigate(`/search?query=${query}`);
    setSuggestions([]);
  }
  
  useEffect(() => {
    
    if (!urlquery) {
      return;
    }
      setQuery(urlquery);
  }, [searchparams])

  useEffect(() => {
    if (!query) {
      setSuggestions([]);
    }
  }, [query])

  useEffect(() => {
    if (!query || query === urlquery) {
      return;
    }
    const timer = setTimeout(async () => {
      try {
        const res = await searchPrices(query);
        setSuggestions(res.coins.slice(0,3));
      } catch (error: any) {
          toast.error(error.message)
      }
    }, 500);
    return () => clearTimeout(timer)
  }, [query])

  
    
  return (
    <section className="sticky top-15 pb-5 bg-cyan-900">
    <button onClick={() => navigate(-1)} className="cursor-pointer pt-5 pl-5"><ArrowLeft size={28} color="white"/></button>
    <article className="px-10 md:px-45 pt-5">
    <form className="flex flex-row place-content-center w-full border-2 border-cyan-200 transition rounded-full shadow-lg" onSubmit={(e) => handleSuggestions(query, e)}>  
      <input type="text" placeholder="search coins..." className="px-3 py-2 w-full text-white outline-none rounded-full" value={query} onChange={(e) => setQuery(e.target.value)}/>
      <span className="pt-2 pr-2">{query && (<span className="cursor-pointer" onClick={() => setQuery("")}><X color="white"/></span>)}</span>
    </form>
    <div className="pt-2">
      {suggestions.length > 0 && (
        <div className="bg-cyan-900 shadow-lg rounded-lg text-white space-y-5">
          {suggestions.map((suggestion) => <span key={suggestion.id} className="flex flex-row gap-5 hover:bg-cyan-700 active:bg-cyan-800 cursor-pointer transition py-2 px-3 rounded-lg" onClick={(e) => handleSuggestions(suggestion.name, e)}><img src={suggestion.large} width={25} height={25}/>{" "}{suggestion.name}</span>)}
        </div>
      )}
    </div>
    </article>
    </section>
  )
}
export default SearchBox;









