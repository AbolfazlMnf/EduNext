"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";
import {
  GetAllCategories,
  ICategoriesResponse,
} from "@/core/services/api/get/getAllCategories";
import {
  GetAllLevels,
  ILevelsResponse,
} from "@/core/services/api/get/getAllLevels";

import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const PRICE_OPTIONS = [
  { label: "Free", value: "free" },
  { label: "Paid", value: "paid" },
];

function SideFilters() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const { data: categories, isPending: pendingCats } =
    useQuery<ICategoriesResponse>({
      queryKey: ["CATEGORIES"],
      queryFn: () => GetAllCategories(),
    });

  const { data: levels, isPending: pendingLevels } = useQuery<ILevelsResponse>({
    queryKey: ["LEVELS"],
    queryFn: () => GetAllLevels(),
  });

  const catData = categories?.data ?? [];
  const levelsData = levels?.data ?? [];

  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    () => searchParams.get("categories")?.split(",").filter(Boolean) || [],
  );
  const [selectedPrice, setSelectedPrice] = useState<string | null>(
    () => searchParams.get("price") || null,
  );
  const [selectedLevel, setSelectedLevel] = useState<string | null>(
    () => searchParams.get("courseLevel") || null,
  );

  const pushFiltersToUrl = (
    cats: string[],
    price: string | null,
    level: string | null,
  ) => {
    const params = new URLSearchParams(searchParams.toString());

    if (cats.length > 0) {
      params.set("categories", cats.join(","));
    } else {
      params.delete("categories");
    }

    if (price) {
      params.set("price", price);
    } else {
      params.delete("price");
    }

    if (level) {
      params.set("courseLevel", level);
    } else {
      params.delete("courseLevel");
    }

    params.set("page", "1");
    router.push(`?${params.toString()}`);
  };

  const handleChangeCategory = (id: string) => {
    const updated = selectedCategories.includes(id)
      ? selectedCategories.filter((v) => v !== id)
      : [...selectedCategories, id];
    setSelectedCategories(updated);
    pushFiltersToUrl(updated, selectedPrice, selectedLevel);
  };

  const handleChangePrice = (value: string) => {
    const updated = selectedPrice === value ? null : value;
    setSelectedPrice(updated);
    pushFiltersToUrl(selectedCategories, updated, selectedLevel);
  };

  const handleChangeLevel = (id: string) => {
    const updated = selectedLevel === id ? null : id;
    setSelectedLevel(updated);
    pushFiltersToUrl(selectedCategories, selectedPrice, updated);
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedPrice(null);
    setSelectedLevel(null);
    router.push("?");
  };

  const hasActiveFilters =
    selectedCategories.length > 0 ||
    selectedPrice !== null ||
    selectedLevel !== null;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-[32px] font-bold">Filters</h2>
        {hasActiveFilters && (
          <span className="text-xs text-primary font-medium">Active</span>
        )}
      </div>

      <div className="border-r border-gray-300 pr-4">
        <Accordion
          type="multiple"
          defaultValue={["categories", "price", "level"]}
        >
          <AccordionItem value="categories">
            <AccordionTrigger className="text-[21px] font-bold">
              Categories
              {selectedCategories.length > 0 && (
                <span className="ml-2 rounded-full bg-primary px-2 py-0.5 text-xs text-white">
                  {selectedCategories.length}
                </span>
              )}
            </AccordionTrigger>
            <AccordionContent className="space-y-3">
              {pendingCats
                ? Array.from({ length: 4 }, (_, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Skeleton className="h-4 w-4 rounded-sm" />
                      <Skeleton className="h-4 w-28" />
                    </div>
                  ))
                : catData.map((item) => (
                    <div key={item._id} className="flex items-center gap-2">
                      <Checkbox
                        id={`cat-${item._id}`}
                        checked={selectedCategories.includes(item._id)}
                        onCheckedChange={() => handleChangeCategory(item._id)}
                      />
                      <label
                        htmlFor={`cat-${item._id}`}
                        className="cursor-pointer text-sm"
                      >
                        {item.name}
                      </label>
                    </div>
                  ))}
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="price">
            <AccordionTrigger className="text-[21px] font-bold">
              Price
            </AccordionTrigger>
            <AccordionContent className="space-y-3">
              {PRICE_OPTIONS.map(({ label, value }) => (
                <div key={value} className="flex items-center gap-2">
                  <Checkbox
                    id={`price-${value}`}
                    checked={selectedPrice === value}
                    onCheckedChange={() => handleChangePrice(value)}
                  />
                  <label
                    htmlFor={`price-${value}`}
                    className="cursor-pointer text-sm"
                  >
                    {label}
                  </label>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="level">
            <AccordionTrigger className="text-[21px] font-bold">
              Level
            </AccordionTrigger>
            <AccordionContent className="space-y-3">
              {pendingLevels
                ? Array.from({ length: 3 }, (_, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Skeleton className="h-4 w-4 rounded-sm" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                  ))
                : levelsData.map((level) => (
                    <div key={level._id} className="flex items-center gap-2">
                      <Checkbox
                        id={`level-${level._id}`}
                        checked={selectedLevel === level._id}
                        onCheckedChange={() => handleChangeLevel(level._id)}
                      />
                      <label
                        htmlFor={`level-${level._id}`}
                        className="cursor-pointer text-sm"
                      >
                        {level.name}
                      </label>
                    </div>
                  ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Button
          variant="ghost"
          className="mt-3 w-full text-md text-muted-foreground shadow bg-white"
          onClick={clearFilters}
          disabled={!hasActiveFilters}
        >
          Clear Filters
        </Button>
      </div>
    </div>
  );
}

export default SideFilters;
