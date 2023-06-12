import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useEffect } from 'react';
import InfiniteScroll from "react-infinite-scroll-component";


import NewsElemet from './NewsElemet'
import Darticles from './SampleNews.json'
import Spinner from './Spinner';



export default function News(props) {

  let sixMonthsAgo = new Date();
   sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
   sixMonthsAgo = `${sixMonthsAgo.getFullYear()}-${sixMonthsAgo.getMonth()+1}-${sixMonthsAgo.getDay()+1}`;

  const [articles, setArticles] = useState(Darticles.articles);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(Darticles.articles.length);
  const [fetchUrl, setFetchUrl] = useState(
    `https://newsapi.org/v2/top-headlines?country=${props.country}&apiKey=${props.apiKey}&pagesize=${props.pageSize}`
  );

  // constructor(props) {
  //   super(props);
  //   state = {
  //     articles: articles.articles,
  //     loading: false,
  //     page: 1,
  //     totalResults: articles.totalResults,
  //     fetchUrl: `${fetchUrl}`,
  //   };
  // }

 

  const fetchFunction = async (Url, category) => {
    setArticles([]);
    setLoading(true);
    let data = await fetch(Url);
    let parsedData = await data.json();
    let finalNum = parsedData.articles.filter(
      (item) => !(item.urlToImage == null)
    );
    setArticles(finalNum);
    setTotalResults(totalResults - finalNum.length);
    setLoading(false);

    document.title = `IndianNews-${category}`;
  };


    // const RemovPrevious = () => {
    //   for (let i = 0; i < 8; i++) {
    //    setArticles(articles.shift());
    //   }
    // };

    // This useEffect function works like componentDidMount function
    // it works after loading of whole page
    // so we can change any ekement from any component in useEffect
  useEffect(()=>{
      //this function runs after loading all
    fetchFunction(fetchUrl, 'Home');

    document.getElementById("business").addEventListener("click", () => {
      fetchFunction( `https://newsapi.org/v2/top-headlines?country=${props.country}&apiKey=${props.apiKey}&pagesize=${props.pageSize}&category=business`, 'Business');
      setFetchUrl(`https://newsapi.org/v2/top-headlines?country=${props.country}&apiKey=${props.apiKey}&pagesize=${props.pageSize}&category=business`);
      setPage(1);
    });
    document.getElementById("entertainment").addEventListener("click", () => {
      fetchFunction( `https://newsapi.org/v2/top-headlines?country=${props.country}&apiKey=${props.apiKey}&pagesize=${props.pageSize}&category=entertainment`, 'Entertainment');
      setFetchUrl(`https://newsapi.org/v2/top-headlines?country=${props.country}&apiKey=${props.apiKey}&pagesize=${props.pageSize}&category=entertainment`);
      setPage(1);
    });
    document.getElementById("health").addEventListener("click", () => {
      fetchFunction( `https://newsapi.org/v2/top-headlines?country=${props.country}&apiKey=${props.apiKey}&pagesize=${props.pageSize}&category=health`, 'Health');
      setFetchUrl( `https://newsapi.org/v2/top-headlines?country=${props.country}&apiKey=${props.apiKey}&pagesize=${props.pageSize}&category=health`);
      setPage(1);
    });
    document.getElementById("science").addEventListener("click", () => {
       fetchFunction(`https://newsapi.org/v2/top-headlines?country=${props.country}&apiKey=${props.apiKey}&pagesize=${props.pageSize}&category=science`, 'Science');
       setFetchUrl(`https://newsapi.org/v2/top-headlines?country=${props.country}&apiKey=${props.apiKey}&pagesize=${props.pageSize}&category=science`);
      setPage(1);
    });
    document.getElementById("sports").addEventListener("click", () => {
       fetchFunction(`https://newsapi.org/v2/top-headlines?country=${props.country}&apiKey=${props.apiKey}&pagesize=${props.pageSize}&category=sports`, 'Sports');
       setFetchUrl(`https://newsapi.org/v2/top-headlines?country=${props.country}&apiKey=${props.apiKey}&pagesize=${props.pageSize}&category=sports`);
      setPage(1);
    });
    document.getElementById("technology").addEventListener("click", () => {
       fetchFunction(`https://newsapi.org/v2/top-headlines?country=${props.country}&apiKey=${props.apiKey}&pagesize=${props.pageSize}&category=technology`, 'Technology');
       setFetchUrl(`https://newsapi.org/v2/top-headlines?country=${props.country}&apiKey=${props.apiKey}&pagesize=${props.pageSize}&category=technology`);
      setPage(1);
    });
    let searchText = document.getElementById("SearchNewsInp");
    document.getElementById("searchIcon").addEventListener("click", ()=>{
      try {
        fetchFunction(`https://newsapi.org/v2/everything?q=${searchText.value}&sortBy=popularity&apiKey=${props.apiKey}`, searchText.value!=null?searchText.value:"");
        setFetchUrl(`https://newsapi.org/v2/everything?q=${searchText.value}&sortBy=popularity&apiKey=${props.apiKey}`);
        setPage(1);    
      } catch (error) {
        console.log(error);
      }
    })
  }, []);
  // https://newsapi.org/v2/everything?q=Apple&from=2022-07-23&sortBy=popularity




  const fetchMoreData = async ()=>{
      setPage(page+1);
      // console.log(page);
      let data = await fetch(`${fetchUrl}&page=${page}`);
      let parsedData = await data.json();
      // console.log(parsedData);
      let finalNum = parsedData.articles.filter(
        (item) => !(item.urlToImage == null)
      );

      setArticles(articles.concat(finalNum));
      setTotalResults(parsedData.totalResults);

  }

  // GotoPrePage = async () => {
  //   // if (page >= 2) {
  //     setState({
  //       loading: true,
  //       fetchUrl: `${fetchUrl}&page=${page - 1}&pagesize=${pageSize}`,
  //     });
  //       fetchFunction(fetchUrl, page-1);
  //   // } else {
  //   //   alert("This is First Page !");
  //   // }
  // };

  // GotoNexPage = async () => {
  //   if (totalResults >= 0) {
  //     setState({
  //       loading: true,
  //       fetchUrl: `${fetchUrl}&page=${page + 1}&pagesize=${pageSize}`
  //     });
     
  //     fetchFunction(fetchUrl, page+1);
      
  //   } else {
  //     alert("This is Last Page !");
  //   }
  // };

    return (
      <div>
          <InfiniteScroll
            dataLength={articles.length}
            next={fetchMoreData}
            hasMore={articles.length != totalResults}
            // loader={<Spinner />}
          >
              {loading && <Spinner />}
            <div className="mainNewsBox">
              {articles.map((element) => {
                return (
                  <div>
                    {
                      <NewsElemet
                        key={element.url}
                         title={element.title}
                        desc={element.description}
                        ImageUrl={element.urlToImage}
                        source={element.author}
                        updateTime={element.publishedAt}
                        url={element.url}
                      />
                    }
                  </div>
                );
              })}

              {/* <div className="pageChanger">
            <button className="prePage button-85" onClick={GotoPrePage}>
              &#10096;&#10096;
              </button>
              <button className="NexPage button-85" onClick={GotoNexPage}>
              &#10097;&#10097;
              </button>
            </div> */}
            </div>
          </InfiniteScroll>
      </div>
 );

 
}

  

  News.defaultProps = {
    country: "in",
    apiKey: "bcbfb4ec43124733b641b070bf181828",
    pageSize : '20'
  }

  News.propTypes = {
    country : PropTypes.string,
    apiKey : PropTypes.string,
    pageSize: PropTypes.number
  }

//  api from prathameshpawar28788 account
// https://newsapi.org/v2/top-headlines?country=in&apiKey=7c14e0735b9744a8b2bfe7ccd34e4b18&pagesize=20

//  api from cm.b26 account
// https://newsapi.org/v2/top-headlines?country=in&apiKey=bcbfb4ec43124733b641b070bf181828&pagesize=20