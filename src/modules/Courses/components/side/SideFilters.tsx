import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

function SideFilters() {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-[32px] font-bold ">Filters</h2>
      <div className="border-r border-gray-300 pr-4 ">
        <Accordion
          type="multiple"
          defaultValue={["categories", "price", "level"]}
        >
          <AccordionItem value="categories">
            <AccordionTrigger className="text-[21px] font-bold">
              Categories
            </AccordionTrigger>
            <AccordionContent className="space-y-3">
              {[
                "Web Development",
                "Data Science",
                "Machine Learning",
                "Digital Marketing",
                "Graphic Design",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <Checkbox id={item} />
                  <label htmlFor={item} className="text-sm">
                    {item}
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
              {["Free", "Paid", "Premium"].map((price) => (
                <div key={price} className="flex items-center gap-2">
                  <Checkbox id={price} />
                  <label htmlFor={price} className="text-sm">
                    {price}
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
              {["Beginner", "Intermediate", "Advanced"].map((level) => (
                <div key={level} className="flex items-center gap-2">
                  <Checkbox id={level} />
                  <label htmlFor={level} className="text-sm">
                    {level}
                  </label>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Button
          variant="ghost"
          className="mt-3 w-full text-md text-muted-foreground shadow bg-[#ffff] "
        >
          Clear Filters
        </Button>
      </div>
    </div>
  );
}

export default SideFilters;
