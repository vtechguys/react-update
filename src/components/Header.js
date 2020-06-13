import React from "react";
import "./Header.css";
import { fetchResultsForTypingInSearchApi } from "../utils/services";
import { useDebounce } from "../utils/hooks";
import { searchTypingReducer } from "../utils/reducer";
import { dispatchSearchReducerWhileTyping } from "../utils/dispatch";
import { UserContext } from "../utils/context";
import { responseType } from "../config/constant";
import { Link } from "react-router-dom";

export function Header(props) {
  const [searchBoxValue, setSearchBoxValue] = React.useState("");
  const [searchResults, searchResultsDispatch] = React.useReducer(
    searchTypingReducer,
    []
  );
  const setSearchResults = dispatchSearchReducerWhileTyping(
    searchResultsDispatch
  );

  const search = useDebounce(searchBoxValue, 1000);
  function searchInputChangeHandler(event) {
    const value = event.target.value;
    if (value !== 13) {
      return setSearchBoxValue(value);
    }
    // confirmed search action time to navigate...
  }
  React.useEffect(() => {
    if (!search) {
      setSearchResults([]);
    } else {
      fetchResultsForTypingInSearchApi(searchBoxValue)
        .then(({ data, code, message }) => {
          if (code !== responseType.SUCCESS) {
            return alert(message);
          }
          setSearchResults(data.searchResults);
        })
        .catch();
    }
  }, [search]);

  let searchResultsJsx = null;
  if (searchBoxValue && searchResults) {
    searchResultsJsx = (
      <div className="autocomplete-items">
        {searchResults.length === 0 ? (
          <span className="autocomplete-item">
            <span role="img">❓</span>
            &nbsp; No Results
          </span>
        ) : (
          searchResults.map(({ label, type = "user", slug }, index) => {
            var linkTo = "";
            if (type == "user") {
              linkTo = `/users/${slug}`;
            } else if (type == "post") {
              linkTo = `/posts/${slug}`;
            } else if (type == "page") {
              linkTo = `/pages/${slug}`;
            }
            return (
              <Link to={linkTo} className="autocomplete-item" key={linkTo}>
                {label}
              </Link>
            );
          })
        )}
      </div>
    );
  }

  // Nav options
  const { user, setUser } = React.useContext(UserContext);
  const isUser = user && user.isAuthenticated;

  let navTabsJsx = null;

  if (!isUser) {
    navTabsJsx = (
      <>
        <Link className="nav-item" to="/auth/login">
          Login
        </Link>
        <Link className="nav-item" to="/auth/signup">
          SignUp
        </Link>
      </>
    );
  } else {
    navTabsJsx = (
      <>
        <Link className="nav-item" to="/dashboard">
          Dashbard
        </Link>
        <Link className="nav-item" to="/posts">
          Posts
        </Link>
        <div className="nav-item" onClick={() => setUser()}>
          Logout
        </div>
      </>
    );
  }

  React.useEffect(() => {
    if (isUser) {
      // subscribe to notifications
    }
  });

  return (
    <header className="header headerHeight">
      <div className="brand-search">
        <Link to="/">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/150px-Unofficial_JavaScript_logo_2.svg.png"
            alt="JavaScript"
            className="logo"
          />
        </Link>
        {/* Depending on if user is authenticated  I might show options realted to user or simple stuff*/}
        {!isUser ? null : (
          <form className="search-form">
            <input
              type="search"
              className="search-input"
              onChange={searchInputChangeHandler}
              placeholder="Search..."
            />
            {searchResultsJsx}
          </form>
        )}
      </div>
      <nav className="nav">{navTabsJsx}</nav>
    </header>
  );
}
