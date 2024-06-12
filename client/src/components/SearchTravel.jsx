import axios from "axios";
import { useState, useEffect } from "react";

function SearchTravel() {
  const [tripList, setTripList] = useState([]);
  const [keyword, setKeyword] = useState("");

  const searchTrip = async (key) => {
    try {
      const response = await axios.get(
        `http://localhost:4001/trips?keywords=${key}`
      );
      setTripList(response.data.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    searchTrip(keyword);
  }, [keyword]);

  return (
    <section className="flex flex-col justify-center items-center gap-9">
      <div className="w-full text-center text-5xl text-sky-600 p-6">
        <h1>เที่ยวไหนดี</h1>
      </div>
      <div className="w-screen border-b-2 border-state-500 md:w-[520px]">
        <label>
          <p>ค้นหาที่เที่ยว</p>
          <input
            type="text"
            placeholder="หาที่เที่ยวแล้วไปกัน ..."
            className="text-center w-full"
            value={keyword}
            onChange={(event) => {
              setKeyword(event.target.value);
            }}
          />
        </label>
      </div>
      {tripList.map((trip) => (
        <div className="w-screen flex flex-row justify-center items-center">
          <div
            key={trip.eid}
            className="flex flex-wrap justify-center gap-5 md:w-[1040px]"
          >
            <div className="flex flex-none p-2">
              {trip.photos.map((photo, index) =>
                index === 0 ? (
                  <img
                    key={index}
                    src={photo}
                    alt="image"
                    className="rounded-xl w-[300px] h-[200px]"
                  />
                ) : null
              )}
            </div>
            <div className="flex-1">
              <h1 className="font-bold">
                <a href={trip.url} target="_blank">
                  {trip.title}
                </a>
              </h1>
              <p className="text-slate-500">
                {trip.description.slice(0, 100)} ...{" "}
              </p>
              <a
                href={trip.url}
                target="_blank"
                className="text-sky-600 underline underline-offset-1"
              >
                อ่านต่อ
              </a>
              <div className="text-slate-500 flex gap-2 pt-2">
                หมวดหมู่
                {trip.tags.map((tag, index) => (
                  <div key={index}>
                    <button
                      className="underline underline-offset-1"
                      onClick={(event) => {
                        setKeyword(event.target.value);
                      }}
                    >
                      {tag}
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-5 pt-4">
                {trip.photos.map((photo, index) =>
                  index !== 0 ? (
                    <img
                      key={index}
                      src={photo}
                      alt="image"
                      className="rounded-xl w-[80px] h-[80px]"
                    />
                  ) : null
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}

export default SearchTravel;
