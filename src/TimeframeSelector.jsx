import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function TimeRangeSelect({
  selectedOption,
  onOptionChange,
}) {
  return (
    <Select id="buybox-time-selector" value={selectedOption} onValueChange={(value) => onOptionChange(value)} >
      <SelectTrigger
        style={{
          width: "100px",
          borderRadius: "0.5rem",
          marginLeft: "auto",
          fontFamily: "Poppins",
          padding: "5px",
          fontSize: "10px",
          height: "30px",
        }}
        aria-label="Select a value"
      >
        <SelectValue placeholder="Last Year" />
      </SelectTrigger>
      <SelectContent
        style={{
          borderRadius: "0.75rem",
          fontFamily: "Poppins",
          width: "120px",
        }}
      >
        <SelectItem
          value="30-d"
          style={{ borderRadius: "0.5rem", fontSize: "10px" }}
        >
          30 Days
        </SelectItem>
        <SelectItem
          value="60-d"
          style={{ borderRadius: "0.5rem", fontSize: "10px" }}
        >
          60 Days
        </SelectItem>
        <SelectItem
          value="90-d"
          style={{ borderRadius: "0.5rem", fontSize: "10px" }}
        >
          90 Days
        </SelectItem>
        <SelectItem
          value="180-d"
          style={{ borderRadius: "0.5rem", fontSize: "10px" }}
        >
          180 Days
        </SelectItem>
        <SelectItem
          value="1-y"
          style={{ borderRadius: "0.5rem", fontSize: "10px" }}
        >
          1 Year
        </SelectItem>
        <SelectItem
          value="all"
          style={{ borderRadius: "0.5rem", fontSize: "10px" }}
        >
          {`All`}
        </SelectItem>
      </SelectContent>
    </Select>
  );
}
