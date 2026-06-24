import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { type CoinSearchType } from "../../types/CoinSearchType";
import { searchPrices } from "../../services/SearchPrice";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";
function SearchBox() {
  const [suggestions, setSuggestions] = useState<CoinSearchType[]>([]);
  const [query, setQuery] = useState("");
  const [searchparams] = useSearchParams();
  const navigate = useNavigate();
  const urlquery = searchparams.get("query");
  const handleSuggestions = (query: string) => {
    setSuggestions([]);
    navigate(`/search?query=${query}`)
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
    <section className="sticky top-14 pb-5 bg-black px-5">
    <button onClick={() => navigate(-1)} className="cursor-pointer mt-[10px]"><ArrowLeft size={28} color="white"/></button>
    <div className="w-full px-10 md:px-45 pt-5">  
      <input type="text" placeholder="search coins..." className="px-3 py-2 w-full bg-black text-white outline-none focus-within:ring-2 focus-within:ring-green-400 border-1 border-gray-800 transition" value={query} onChange={(e) => setQuery(e.target.value)}/>
    </div>
    <div className="px-10 md:px-45 pt-5">
      {suggestions && (
        <div className="bg-black text-white space-y-5">
          {suggestions.map((suggestion) => <span key={suggestion.id} className="flex flex-row gap-5 hover:bg-gray-900 cursor-pointer transition py-2 px-3" onClick={() => handleSuggestions(suggestion.name)}><img src={suggestion.large} width={25} height={25}/>{" "}{suggestion.name}</span>)}
        </div>
      )}
    </div>
    </section>
  )
}
export default SearchBox;









