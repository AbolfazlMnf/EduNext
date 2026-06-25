"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { ChangeEvent, useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { Input } from "../ui/input";

const TopFilters = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [sort, setSort] = useState<string>(searchParams.get("sort") ?? "");
  const [limit, setLimit] = useState<string>(searchParams.get("limit") ?? "");
  const [query, setQuery] = useState(searchParams.get("search") ?? "");
  const [search] = useDebounce(query, 800);

  const updateParams = (key: string, value: string) => {
    const param = new URLSearchParams(searchParams.toString());
    if (value) {
      param.set(key, value);
    } else {
      param.delete(key);
    }
    param.set("page", "1");

    router.replace(`${pathname}?${param.toString()}`);
  };

  const sortOptions = [
    { id: "oldest", name: "oldest" },
    { id: "newest", name: "newest" },
  ];

  useEffect(() => {
    updateParams("search", search);

    return;
  }, [search]);

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 items-stretch">
      <div className="w-full flex items-center gap-4">
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                {sort ? `sorted by ${sort} ` : "sort"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {sortOptions.map((items, i) => (
                <DropdownMenuItem
                  onClick={() => {
                    setSort(items.id);
                    updateParams("sort", items.id);
                  }}
                  key={i}
                >
                  {items.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                {limit ? `${limit} per page` : "per page"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {["9", "12", "15", "18"].map((items, i) => (
                <DropdownMenuItem
                  onClick={() => {
                    setLimit(items);
                    updateParams("limit", items);
                  }}
                  key={i}
                >
                  {items}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="w-full">
        <Input
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setQuery(e.target.value)
          }
          placeholder="search here ..."
          value={query}
          type="text"
        />
      </div>
    </div>
  );
};

export default TopFilters;
