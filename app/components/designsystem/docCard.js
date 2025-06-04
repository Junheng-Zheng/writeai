import React, { useState, useEffect } from "react";
import Button from "./button";
import Search from "../ui/Search";
export default function DocCard({ id, title, contributors, created, updated, opened }) {
  const [getSettings, setSettings] = useState(false);
  const [addContributor, setAddContributor] = useState(false);
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [summarizeHover, setSummarizeHover] = useState(false);
  const [contributorInput, setContributorInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [selectedContributorId, setSelectedContributorId] = useState(null);


  useEffect(() => {
    const timeout = setTimeout(() => {
      if (addContributor && contributorInput.trim()) {
        fetchContributors(contributorInput);
      } else {
        setSearchResults([]);
      }
    }, 300); // 300ms debounce delay

    return () => clearTimeout(timeout); // Clear the timeout if input changes quickly
  }, [contributorInput, addContributor]);

  async function fetchContributors(query) {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setSearchLoading(true);
    try {
      const res = await fetch(`/api/aws/search?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      if (res.ok && Array.isArray(data.users)) {
        setSearchResults(data.users);
      } else {
        console.error("Invalid response", data);
        setSearchResults([]);
      }
    } catch (err) {
      console.error("Error searching users", err);
      setSearchResults([]);
    } finally {
      setSearchLoading(false);
    }
  }

  async function handleAddContributor() {
    if (!contributorInput.trim()) return;

    try {
      console.log("Sending PATCH to /api/aws/update with body:", {
          id,
          updates: {
            contributors: [...(contributors || []), selectedContributorId],
          },
        });
      const res = await fetch("/api/aws/update", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          updates: {
            contributors: [...(contributors || []), selectedContributorId],
          },
        }),
      });

      if (!res.ok) throw new Error("Failed to update contributors");
      setContributorInput("");
      setAddContributor(false);

      // Optionally: trigger a refresh or lift state up to parent to reflect the update
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="relative aspect-[8/11.5] text-black/75 cursor-pointer border flex flex-col group border-black/10">
      <div
        className={`absolute w-full bottom-0 flex flex-col right-0 z-10 transition-all overflow-hidden duration-300 bg-white  ${
          isSummarizing
            ? "h-full justify-between"
            : "h-[0px] rounded-tl-[8px] delay-100"
        }`}
      >
        <div
          className={`absolute w-full bottom-0 left-0 p-[16px] transition-all duration-300 ${
            isSummarizing ? "opacity-100 delay-100" : "opacity-0"
          }`}
        >
          <Button variant={"primary"} className="w-full" size={"medium"}>
            Go to Document
          </Button>
        </div>
        <div
          className={`text-[16px] relative flex justify-between items-center p-[16px] transition-all duration-300 ${
            isSummarizing ? "opacity-100 delay-100" : "opacity-0"
          }`}
        >
          Document Summary
          <button
            onClick={() => setIsSummarizing(false)}
            className="w-[24px] h-[24px] hover:bg-black/5 rounded-full flex items-center justify-center"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
        <div
          className={`flex-1 p-[16px] pt-[0px] transition-all duration-300 ${
            isSummarizing ? "opacity-100 delay-100" : "opacity-0"
          }`}
        >
          <div className="w-full p-[16px] text-[14px] h-full border border-black/10 rounded-lg">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
              quos. Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing
              elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Quisquam, quos.
            </p>
          </div>
        </div>
      </div>
      <div className="flex-1 flex flex-col justify-end items-end relative group-hover:bg-black/5 transition-all duration-300">
        <button
          onMouseEnter={() => setSummarizeHover(true)}
          onClick={() => setIsSummarizing(true)}
          onMouseLeave={() => setSummarizeHover(false)}
          className={`absolute bottom-0 right-0 overflow-hidden h-[36px] px-[12px] flex items-center gap-[8px]  bg-black/10 group-hover:bg-[rgb(157,255,0)] group-hover:border border-black/10   transition-all duration-300 ${
            summarizeHover
              ? "w-full justify-between"
              : "w-[36px] rounded-tl-[8px]"
          }`}
        >
          <span
            className={`text-[14px] transition-all duration-300 ${
              summarizeHover ? "block" : "hidden"
            }`}
          >
            Summarize
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 14 14"
            fill="black"
          >
            <path
              fill="black"
              fillRule="evenodd"
              d="M7.935.655c-.318-.873-1.552-.873-1.87 0L4.622 4.622L.655 6.065c-.873.318-.873 1.552 0 1.87l3.967 1.443l1.443 3.967c.318.873 1.552.873 1.87 0l1.443-3.967l3.967-1.443c.873-.318.873-1.552 0-1.87L9.378 4.622z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
      </div>
      <div className="p-[24px] border-t flex justify-between items-center border-black/10">
        <div className="flex flex-col gap-[12px] ">
          <div className="flex items-center gap-[8px]">
            <div className="w-[24px] border border-black/10 h-[24px] rainbow-radial rounded-full"></div>
            <p className="truncate w-[120px] text-[16px] text-nowrap">
              {title}
            </p>
          </div>
          <p className="text-[12px]">{opened}</p>
        </div>
        <i
          onClick={() => setSettings(!getSettings)}
          className="fa-solid fa-ellipsis-vertical p-2 hover:bg-black/5 rounded-full"
        ></i>
      </div>
      <div
        className={` overflow-hidden absolute bottom-0 bg-white z-20 justify-between flex flex-col left-0  h-full ${
          getSettings ? "w-full " : "w-0 delay-100"
        } transition-all duration-200`}
      >
        <div
          className={`flex flex-col flex-1 ${
            getSettings ? "opacity-100 delay-200" : "opacity-0"
          } transition-all duration-100`}
        >
          <div className="px-[16px] py-[16px] border-b border-black/10 flex justify-between items-center">
            <div className="flex items-center gap-[8px]">
              <p className="truncate w-[120px] text-[16px] text-nowrap">
                {title}
              </p>
              <i className="text-[12px] fa-solid fa-pencil"></i>
            </div>
            <button
              onClick={() => setSettings(false)}
              className="w-[24px] h-[24px] hover:bg-black/5 rounded-full flex items-center justify-center"
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
          <div
            className={`px-[16px] h-full py-[16px]  border-black/10 overflow-scroll flex flex-col gap-[16px] ${
              !addContributor ? "border-b" : "border-b-0"
            } transition-all duration-300`}
          >
            <p>Contributors</p>
            <div className="flex ">
              {contributors != null &&
                contributors.map((contributor, index) => (
                  <div
                    key={`contributor-${contributor.id || index}`}
                    className="text-[12px] shadow-md h-full bg-white aspect-square flex items-center justify-center border border-black/10 rounded-full"
                    style={{ transform: `translateX(-${index * 8}px)` }}
                    title={contributor.name || contributor.id || ""}
                  >
                    {(contributor.name || contributor.id || "")
                      .split(" ")
                      .map(word => word[0])
                      .join("")
                      .toUpperCase()}
                  </div>
                ))
              }
              <button
                onClick={() => setAddContributor(!addContributor)}
                className={`hover:bg-purple-500 hover:text-white aspect-square transition-all duration-300 shadow-md  bg-white translate-x-[-8px]  flex items-center justify-center border border-black/10 rounded-full ${
                  addContributor ? "h-[32px] w-[32px]" : "h-[44px] w-[44px]"
                }`}
                style={contributors != null ? {
                  transform: `translateX(-${contributors.length * 8}px)`,
                } : undefined}
              >
                <span
                  className={`text-[16px] ${
                    addContributor && "rotate-45"
                  } transition-all duration-300`}
                >
                  +
                </span>
              </button>
            </div>
            <div
              className={`${
                addContributor ? "h-fit" : "h-0 hidden "
              } transition-all duration-300 overflow-hidden`}
            >
              <Search
                placeholder="Add Contributor"
                symbol="Add"
                value={contributorInput}
                onChange={(e) => setContributorInput(e.target.value)}
                className="w-full text-[14px] px-[12px]"
                onClick={handleAddContributor}
              />
              {addContributor && searchResults.length > 0 && (
                <div className="mt-2 flex flex-col gap-2 text-sm">
                  {searchResults.map((user) => (
                    <button
                      key={user.id}
                      className="text-left p-2 hover:bg-black/5 border border-black/10 rounded"
                      onClick={() => {
                        setContributorInput(user.name || user.email || "");
                        setSelectedContributorId(user.id);
                        setSearchResults([]);
                      }}
                    >
                      <p className="font-medium">{user.name}</p>
                      <p className="text-xs text-black/60">{user.email}</p>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div
            className={`px-[16px]  items-center py-[16px]  gap-[16px] ${
              !addContributor ? "block" : "hidden"
            } transition-all duration-100`}
          >
            <p className="text-[14px]">
              Time Period: {created} - {updated}
            </p>
          </div>
        </div>
        <div
          className={`px-[16px] border-t bg-white  border-black/10 py-[16px] flex flex-col gap-[12px] ${
            getSettings ? "opacity-100 delay-100" : "opacity-0"
          } transition-all duration-200`}
        >
          <Button
            variant={"primary"}
            size={"medium"}
            onClick={() => {
              setIsSummarizing(true);
              setSettings(false);
            }}
            arrow={false}
            className="w-full gap-[12px] flex items-center"
          >
            Summarize
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 14 14"
              fill="black"
            >
              <path
                fill="black"
                fillRule="evenodd"
                d="M7.935.655c-.318-.873-1.552-.873-1.87 0L4.622 4.622L.655 6.065c-.873.318-.873 1.552 0 1.87l3.967 1.443l1.443 3.967c.318.873 1.552.873 1.87 0l1.443-3.967l3.967-1.443c.873-.318.873-1.552 0-1.87L9.378 4.622z"
                clipRule="evenodd"
              ></path>
            </svg>
          </Button>
          <Button
            variant={"tertiary"}
            size={"medium"}
            arrow={false}
            className="w-full text-red-500"
          >
            Delete
            <i className="fa-solid fa-trash"></i>
          </Button>
        </div>
      </div>
    </div>
  );
}
