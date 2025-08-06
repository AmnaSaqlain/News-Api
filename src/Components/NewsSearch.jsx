import { useState, useEffect } from "react";
import Header from "./Header";
import Searchbar from "./Searchbar";
import Categories from "./Categories";
import NewsResult from "./NewsResult";

const NewsSearch = () => {
  const [query, setQuery] = useState("");           // Search term
  const [articles, setArticles] = useState([]);     // News data
  const [category, setCategory] = useState("general"); // Default category
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false); // Dark mode state

  const API_KEY = "f865338abfcc475db392dbf4c4244bd9"; // Replace with your real key

  // Fetch news (used for default load, search, and category changes)
  const fetchNews = async (searchQuery = "", categoryName = "general") => {
    setLoading(true);
    setError(null);

    try {
      let url = "";

      if (searchQuery) {
        // Search by keyword
        url = `https://newsapi.org/v2/everything?q=${searchQuery}&apiKey=${API_KEY}`;
      } else {
        // Top headlines by category
        url = `https://newsapi.org/v2/top-headlines?country=us&category=${categoryName}&apiKey=${API_KEY}`;
      }

      const response = await fetch(url);
      const data = await response.json();

      if (data.articles) {
        setArticles(data.articles);
      } else {
        setArticles([]);
        setError("No news found.");
      }
    } catch (err) {
      setError("Failed to load news.");
    } finally {
      setLoading(false);
    }
  };

  // Load default news on first render
  useEffect(() => {
    fetchNews("", category);
  }, [category]);

  
  const handleSearch = () => {
    if (query.trim() === "") {
      fetchNews("", category); 
    } else {
      fetchNews(query);
    }
  };

  
  const handleCategorySelect = (cat) => {
    setCategory(cat.toLowerCase());
  };

  const toggleDarkMode = () => {
  setIsDarkMode(!isDarkMode);
  document.body.className = !isDarkMode ? "dark-mode" : "light-mode";
};

  return (
    <>
     <Header   isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode}/>
    <div className={`news-container ${isDarkMode ? "dark" : "light"}`}>
     
      <Searchbar query={query} setQuery={setQuery} onSearch={handleSearch} />
      <Categories
        categories={["General", "Technology", "Sports", "Health", "Business", "Entertainment"]}
        onSelectCategory={handleCategorySelect}
      />

      {loading && <p>Loading news...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && <NewsResult articles={articles} />}
    </div>
    </>
  );
};

export default NewsSearch;
