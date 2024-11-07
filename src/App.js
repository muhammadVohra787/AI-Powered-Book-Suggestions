import React, { useEffect, useState } from "react";
import SearchAppBar from "./components/SearchAppBar";
import YoutubeSearchedForIcon from "@mui/icons-material/YoutubeSearchedFor";
import InterestsIcon from "@mui/icons-material/Interests";
import InterestShow from "./components/InterestShow";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import UserInfoForm from "./components/UserInfoForm";
import SearchHistoryShow from "./components/SearchHistoryShow";
import { IconsProps } from "./components/IconsProps";
import { GoogleGenerativeAI } from "@google/generative-ai";
import CloseIcon from "@mui/icons-material/Close";
import DeviceInfo from "./components/DeviceInformation";
import DevicesIcon from "@mui/icons-material/Devices";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import ErrorIcon from '@mui/icons-material/Error';
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Paper,
  Stack,
  Typography,
  Container,
  styled,
  FormControlLabel,
} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import { CompletedBooks } from "./components/CompletedBooks";
function App() {
  const GEMINI_API_KEY = process.env.REACT_APP_GEMINI_API_KEY;

  const [fetchedItems, setFetchedItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchList, setSearchList] = useState([]);
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [searchTermInterest, setSearchTermInterest] = useState("");
  const [allReadItems, setAllReadItems] = useState([]);
  const [currentContent, setCurrentContent] = useState("U");
  const [stillLoading, setLoading] = useState(false);
  const [geoLocation, setGeoLocation] = useState(null);
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    country: "",
    address: "",
    age: "",
  });
  const [deviceInfo, setDeviceInfo] = useState({
    os: "",
    browser: "",
    screenSize: "",
    isMobile: false,
  });
  const [notificationMsg, setNotification] = useState("")
  const fetchBookData = async (urlList) => {
    try {
      const noDupUrls = [...new Set(urlList)];
      const results = await Promise.all(
        noDupUrls.map(async (url) => {
          url = url + "&maxResults=1";
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error(
              `Failed to fetch from ${url}: ${response.statusText}`
            );
          }
          return response.json();
        })
      );

      setFetchedItems(results);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const fetchStory = async () => {
    try {
      const { firstName, lastName, country, address, age } = userInfo;
      const interests = selectedInterests.join(", ");
      setLoading(true);
      const searchHistory = Object.values(searchList)
        .map((item) => item.term)
        .join(", ");

      const readBooks = Object.values(allReadItems)
        .filter((item) => item.isRead) // Filter only read items
        .map((item) => item.title) // Map to extract each title
        .join(", ");

      const prompt = `The user's name is ${firstName} ${lastName}, aged ${age}, from ${country}. Their interests include ${interests}. Their search history includes ${searchHistory}. Their already watched books are ${readBooks}, this means user like these kind of books and we dont need to show them those books again. They are on ${deviceInfo.os} device.
        Please provide 10 book recommendations for this user that match their profile. Include constructed URLs to fetch details for each book 
        from the Google Books API, formatted like: https://www.googleapis.com/books/v1/volumes?q=<exact book name you would recommend>. Please makesure you only return urls, no text nothign else. if user information is empty just return few random links from google api`;
      
        const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
      const model = await genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
      });

      const resultObj = await model.generateContent(prompt);
      const result = extractUrls(resultObj.response.text());
      if (result.length === 0) {
        setNotification(`Fetch Failed: AI needs more information about user`);
  
        // Set a timeout to clear the notification after 5 seconds
        const timer = setTimeout(() => {
          setNotification("");
        }, 5000);
      }
      await fetchBookData(result);
      setLoading(false);
      setCurrentContent("X");
    } catch (error) {
      console.error("Error generating content:", error);
    }
  };
  function extractUrls(responseText) {
    const urlPattern =
      /https:\/\/www\.googleapis\.com\/books\/v1\/volumes\?q=[\w\+\-]+/g;
    const urls = responseText.match(urlPattern);
    return urls || [];
  }
  const handleMarkAsRead = (book) => {
    const bookTitle = book.volumeInfo.title;
    const bookAuthor = book.volumeInfo.authors;
    const bookImage = book.volumeInfo.imageLinks?.thumbnail;
    setAllReadItems((prev) => {
      const newState = { ...prev };

      if (newState[bookTitle]) {
        delete newState[bookTitle];
      } else {
        newState[bookTitle] = {
          title: bookTitle,
          isRead: true,
          author: bookAuthor,
          thumb: bookImage,
          allInfo: book,
        };
      }

      return newState;
    });
  };

  const isBookMarkedAsRead = (id) => {
    return allReadItems[id]?.isRead || false;
  };

  return (
    <>
      <div className="App">
        <SearchAppBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          searchList={searchList.length === 0 ? searchList : "No history now"}
          setSearchList={setSearchList}
        />
        <Container>
        <h1 style={{color:'red'}}>{notificationMsg}</h1>
          <IconsProps
            RenderIcon={YoutubeSearchedForIcon}
            tip={"Search History"}
            controller={setCurrentContent}
            renderContext={"S"}
          />

          <IconsProps
            RenderIcon={InterestsIcon}
            tip={"Interests"}
            controller={setCurrentContent}
            renderContext={"I"}
          />
          <IconsProps
            RenderIcon={AccountCircleIcon}
            tip={"User Info"}
            controller={setCurrentContent}
            renderContext={"U"}
          />
          <IconsProps
            RenderIcon={DevicesIcon}
            tip="Device Information"
            controller={setCurrentContent}
            renderContext={"D"}
          />
          <IconsProps
            RenderIcon={DoneAllIcon}
            tip={"Completed Books"}
            controller={setCurrentContent}
            renderContext={"R"}
          />
          <IconsProps
            RenderIcon={CloseIcon}
            tip={"Hide All"}
            controller={setCurrentContent}
            renderContext={"X"}
          />
          {!stillLoading ? (
            <>
              <Box sx={{ padding: 1 }}>
                {currentContent === "U" && (
                  <UserInfoForm userInfo={userInfo} setUserInfo={setUserInfo} />
                )}
                {currentContent === "S" && (
                  <SearchHistoryShow list={searchList} />
                )}

                {currentContent === "I" && (
                  <InterestShow
                    selectedInterests={selectedInterests}
                    setSelectedInterests={setSelectedInterests}
                    searchTerm={searchTermInterest}
                    setSearchTerm={setSearchTermInterest}
                  />
                )}
                {currentContent === "D" && (
                  <DeviceInfo
                    deviceInfo={deviceInfo}
                    setDeviceInfo={setDeviceInfo}
                    geoLocation={geoLocation}
                    setGeoLocation={setGeoLocation}
                  />
                )}
                {currentContent === "R" && (
                  <CompletedBooks
                    readItems={allReadItems}
                    handleMarkAsRead={handleMarkAsRead}
                  />
                )}
              </Box>
              <Button
                onClick={fetchStory}
                variant="contained"
                sx={{ backgroundColor: "#3f51b5" }}
              >
                Get Book Recommendations
              </Button>
              <h2>Book Recommendations:</h2>
              <Grid container spacing={0}>
                {Array.isArray(fetchedItems) &&
                  fetchedItems.map((item, index) =>
                    item?.items?.map((book, bookIndex) => (
                      <Grid
                        item
                        xs={12}
                        sm={8}
                        md={4}
                        key={bookIndex}
                        style={{
                          padding: "10px",
                          alignContent: "center",
                        }}
                      >
                        <Paper
                          elevation={3}
                          sx={{
                            p: "20px",
                            borderRadius: "10px",
                          }}
                        >
                          <Typography variant="p">
                            {book.volumeInfo.title.slice(0, 35)}
                            {book.volumeInfo.title.length > 35 ? "..." : ""}
                          </Typography>

                          <img
                            width={200}
                            height={280}
                            src={book.volumeInfo.imageLinks?.thumbnail}
                            alt="  Image not found for this book"
                            style={{
                              display: "block",
                              margin: "auto",
                              marginTop: "15px",
                              marginBottom: "15px",
                            }}
                          />

                          <Typography variant="body2">
                            Author: {book.volumeInfo.authors}
                          </Typography>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={isBookMarkedAsRead(
                                  book.volumeInfo.title
                                )}
                                name={`${book.volumeInfo.title} - ${book.volumeInfo.authors}`}
                                onChange={() => handleMarkAsRead(book)}
                              />
                            }
                            label="Mark as Read"
                          />
                        </Paper>
                      </Grid>
                    ))
                  )}
              </Grid>{" "}
            </>
          ) : (
            <Box
              sx={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backdropFilter: "blur(8px)",
                zIndex: 1000, 
                backgroundColor: "rgba(255, 255, 255, 0.3)",
              }}
            >
              <CircularProgress
                style={{
                  width: 100,
                  height: 100,
                  color: "#3f51b5",
                }}
              />
            </Box>
          )}
        </Container>
      </div>
    </>
  );
}

export default App;
