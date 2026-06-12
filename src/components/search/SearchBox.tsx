import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { type CoinSearchType } from "../../types/CoinSearchType";
import { searchPrices } from "../../services/SearchPrice";
import { toast } from "sonner";
function SearchBox() {
  const [suggestions, setSuggestions] = useState<CoinSearchType[]>([]);
  const [query, setQuery] = useState("");
  const [searchparams] = useSearchParams();
  const navigate = useNavigate();
  const urlquery = searchparams.get("query");
  const handleSearch = (e: any) => {
    e.preventDefault();
    setSuggestions([]);
    navigate(`/search?query=${query}`)
  }
  const handleSuggestions = (id: string) => {
    navigate(`/coin/${id}`)
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
        setSuggestions(res.coins.slice(0,5));
      } catch (error: any) {
          toast.error(error.message)
      }
    }, 1000);
    return () => clearTimeout(timer)
  }, [query])
  return (
    <form className="w-full px-10 md:px-45 pt-5" onSubmit={handleSearch}>
      <input type="text" placeholder="search coins..." className="px-3 py-2 w-full bg-white text-gray-400 outline-none focus-within:ring-2 focus-within:ring-green-500 transition" value={query} onChange={(e) => setQuery(e.target.value)}/>
      {suggestions && (
        <div className="bg-gray-200 space-y-5">
          {suggestions.map((suggestion) => <span key={suggestion.id} className="flex flex-row gap-5 hover:bg-gray-400 cursor-pointer transition py-2 px-3" onClick={() => handleSuggestions(suggestion.id)}><img src={suggestion.large} width={25} height={25}/>{" "}{suggestion.name}</span>)}
        </div>
      )}

    
    </form>
  )
}
export default SearchBox;









