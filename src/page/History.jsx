import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import HistoryTitle from "../history/HistoryTitle";
import HistoryComment from "../history/HistoryComment";
import axios from "../config/axios";

export default function History() {
  const [allTitles, setAllTitle] = useState([]);
  const [allComments, setAllComment] = useState([]);
  const { userId } = useParams();

  useEffect(() => {
    axios
      .get(`/history/title/${userId}`)
      .then((res) => {
        setAllTitle(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get(`/history/comment/${userId}`)
      .then((res) => {
        setAllComment(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  // console.log(allTitles);
  // console.log(allComments);

  return (
    <>
      {" "}
      (
      <div className="grid grid-cols-2  h-[95vh] w-screen overflow-y-hidden bg-fixed">
        <HistoryTitle allTitles={allTitles} className="w-full h-full" />
        <HistoryComment allComments={allComments} className="w-full h-full" />
      </div>
      )
    </>
  );
}
